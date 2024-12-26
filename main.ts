import { bundle, join } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import * as bot from "./bot.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { RouteContext } from "./routeContext.ts";

type RouteResult = Promise<Response | void> | Response | void;

async function loadFiles(root: string, parse: (path: string) => Promise<string>): Promise<{ [key: string]: string; }> {
  const result: { [key: string]: string } = {};
  for await (const dirEntry of Deno.readDir(root)) {
    try {
      if (dirEntry.isFile) {
        result[dirEntry.name.substring(0, dirEntry.name.lastIndexOf("."))] = await parse(join(root, dirEntry.name));
      }
    } catch (e) {
      logger.error(e);
    }
  }
  return result;
}
/*
async function compileTypeScriptCode(code: string): Promise<string | undefined> {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.Latest,
    noEmit: true,
    allowImportingTsExtensions: true
  }

  const realHost = ts.createCompilerHost(options, true);

  const dummyFilePath = "/in-memory-file.ts";
  const characterSourceFile = ts.createSourceFile("/character.ts", await Deno.readTextFile("./character.ts"), ts.ScriptTarget.Latest);
  const dummySourceFile = ts.createSourceFile(dummyFilePath, code, ts.ScriptTarget.Latest);

  const host: ts.CompilerHost = {
      fileExists: filePath => {
        logger.info(filePath)
        return filePath === characterSourceFile.fileName || filePath === dummyFilePath || realHost.fileExists(filePath)
      },
      directoryExists: path => {
        return realHost.directoryExists!(path);
      },
      getCurrentDirectory: realHost.getCurrentDirectory.bind(realHost),
      getDirectories: realHost.getDirectories?.bind(realHost),
      getCanonicalFileName: fileName => realHost.getCanonicalFileName(fileName),
      getNewLine: realHost.getNewLine.bind(realHost),
      getDefaultLibFileName: realHost.getDefaultLibFileName.bind(realHost),
      getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => { 
        logger.info("File: %v %v",fileName, shouldCreateNewSourceFile);

        if (fileName === characterSourceFile.fileName) {
          return characterSourceFile;
        }

        return fileName === dummyFilePath 
          ? dummySourceFile 
          : realHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile) },
      getSourceFileByPath: realHost.getSourceFileByPath?.bind(realHost),    
      readFile: filePath => filePath === dummyFilePath 
          ? code 
          : realHost.readFile(filePath),
      useCaseSensitiveFileNames: () => realHost.useCaseSensitiveFileNames(),
      writeFile: realHost.writeFile.bind(realHost),
  };

  const program = ts.createProgram([dummyFilePath], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  program.emit();

  if (diagnostics.length > 0) {
    diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      const { line, character } = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start!) ?? {};
      logger.error(`file: ${diagnostic.file?.fileName}, line: ${line}, column: ${character} -> ${message}`);
    });
  }

  return ts.transpile(code, options);
}*/

const scripts = await loadFiles("./views/scripts", async path => {
  return (await bundle(path, {
    minify: true
  })).code;
});

const styles = await loadFiles("./views/styles", async path => {
  return await Deno.readTextFile(path);
});

const favicon = await Deno.readFile("./wodnet.ico");

logger.debug("Config %v", JSON.stringify(config));

function route(...params: ({ path: RegExp, go: (array: RegExpExecArray, context: RouteContext) => RouteResult } 
| { path: string[] | string, go: (context: RouteContext) => RouteResult })[]): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    let response = new Response(null, { status: 404 });

    logger.info(
      "Request %v %v",
      request.method,
      request.url
    );
  
    if (request.method == "GET") {
      const context = new RouteContext(request.url);

      for (const item of params) {
        if (item.path instanceof RegExp) {
          const regex = item.path.exec(context.url.pathname);
          if (regex) {
            const go = item.go as (array: RegExpExecArray, context: RouteContext) => RouteResult;
            const result = await go(regex, context);
            if (result instanceof Response) {
              response = result;
            }
            break;
          }      
        }
        else {
          const array = typeof item.path == "string" ? [item.path] : item.path;
          if (array.indexOf(context.url.pathname) > -1) {
            const go = item.go as (context: RouteContext) => RouteResult;
            const result = await go(context);
            if (result instanceof Response) {
              response = result;
            }
            break;
          }
        }
      }
    }
  
    return response;
  }
} 

Deno.serve({ port: config.port }, route({
  path: /\/scripts\/(\w*).js/,
  go: (array: RegExpExecArray): Response | void =>  {
    const path = array[1];
    if (scripts[path]) {
      return new Response(scripts[path], { headers:[["Content-Type", "application/javascript"]]});
    }
  }
},{
  path: /\/styles\/(\w*).css/,
  go: (array: RegExpExecArray): Response | void =>  {
    const path = array[1];
    if (styles[path]) {
      return new Response(styles[path], { headers:[["Content-Type", "application/css"]]});
    }
  }
},{
  path: "/favicon.ico",
  go: (): Response =>  {
    return new Response(favicon, { headers:[["Content-Type", "image/x-icon"]]});
  }
},{
  path: "/bot/destroy",
  go: async (): Promise<void | Response> =>  {
    await bot.destroy();
    return new Response(JSON.stringify({
      ok: true 
    }), { headers:[["Content-Type", "application/json"]]});
  }
},{
  path: "/bot",
  go: async (): Promise<void | Response> =>  {
    return new Response(JSON.stringify({
      upSince: await bot.connect()
    }), { headers:[["Content-Type", "application/json"], ["Refresh", "300"]]});
  }
},{
  path: "/check",
  go: async (context: RouteContext): Promise<void | Response> =>  {
    if (context.chronicle && context.decodeId) { 
      return new Response(JSON.stringify({
        update: await context.chronicle.checkCharacter(context.decodeId, context.versionstamp!),
      }), { headers:[["Content-Type", "application/json"]]});
    }
  }
},{
  path: ["/dark", "/"],
  go: async (context: RouteContext): Promise<void | Response> =>  {
    if (context.chronicle && context.id && context.chronicleId && context.decodeId) {
      return new Response(await characterRender(
        await context.chronicle.getCharacter(context.decodeId, true),
        context.chronicleId,
        context.id,
        context.url.pathname == "/dark",
        context.update
      ).render(), { headers:[["Content-Type", "text/html"]]});
    }
  }
}));