// deno-lint-ignore-file no-explicit-any
import { ActionResult, Character } from "./character.ts";
import {
  ButtonStyle,
  esbuild,
  MessagePayload,
  ModuleKind,
  Project,
  ScriptTarget,
  ts,
} from "./deps.ts";
import { logger } from "./logger.ts";

const characterCode = await Deno.readTextFile("./character.ts");

export type MacroButton = {
  label?: string;
  style?: ButtonStyle;
  emoji?: {
    id: string;
    name: string;
  } | string;
  value?: any;
};

export type Macro = {
  message: MessagePayload;
  buttons?: MacroButton[];
  code?: string;
  transpiled?: string;
};

export type MacroFunction = (
  character: Character,
  result: ActionResult,
  button: any,
) => void;

export function macroFunction(code: string): MacroFunction {
  return new Function(
    "character",
    "result",
    "button",
    code,
  ) as MacroFunction;
}

export async function macroTranspile(code: string): Promise<string> {
  return await transpile({
    "character.ts": characterCode,
    "macro.ts": [
      'import { ActionResult, Character, CharacterMode } from "./character.ts";',
      "declare const character: Character;declare const result: ActionResult;declare const button: any;",
      code,
    ].join(""),
  });
}

export async function transpile(
  files: { [file: string]: string },
): Promise<string> {
  const project = new Project({
    compilerOptions: {
      module: ModuleKind.Preserve,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ScriptTarget.ESNext,
    },
    useInMemoryFileSystem: true,
    resolutionHost: (moduleResolutionHost, getCompilerOptions) => {
      return {
        resolveModuleNames: (moduleNames, containingFile) => {
          const compilerOptions = getCompilerOptions();
          const resolvedModules: ts.ResolvedModule[] = [];

          for (
            const moduleName of moduleNames.map((moduleName) => {
              if (moduleName.slice(-3).toLowerCase() === ".ts") {
                return moduleName.slice(0, -3);
              }
              return moduleName;
            })
          ) {
            const result = ts.resolveModuleName(
              moduleName,
              containingFile,
              compilerOptions,
              moduleResolutionHost,
            );
            if (result.resolvedModule) {
              resolvedModules.push(result.resolvedModule);
            }
          }

          return resolvedModules;
        },
      };
    },
  });

  for (const key in files) {
    project.createSourceFile(key, files[key]);
  }

  const diagnostics = project.getPreEmitDiagnostics();

  if (diagnostics.length > 0) {
    throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics));
  }

  const result = await project.emitToMemory({
    /*customTransformers: {
      after: [context => sourceFile => {
        function visitNodeAndChildren(node: ts.Node): ts.Node {
          if (node.kind == ts.SyntaxKind.ExportKeyword || (ts.isExportDeclaration(node) &&
          !node.exportClause &&
          !node.moduleSpecifier)) {
            return context.factory.createNotEmittedStatement(node);
          }

          return ts.visitEachChild(node, visitNodeAndChildren, context);
        }

        return visitNodeAndChildren(sourceFile) as ts.SourceFile;
      }],
    },*/
    customTransformers: {
      after: [(context) => (sourceFile) => {
        function visitor(node: ts.Node): ts.Node {
          if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
            if (
              node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)
            ) {
              const specifier = node.moduleSpecifier.text;
              if (specifier.startsWith(".") && specifier.endsWith(".ts")) {
                const importDeclaration = node as ts.ImportDeclaration;
                return ts.factory.updateImportDeclaration(
                  importDeclaration,
                  importDeclaration.modifiers,
                  importDeclaration.importClause,
                  ts.factory.createStringLiteral(
                    specifier.replace(/\.ts$/, ".js"),
                  ),
                  importDeclaration.attributes,
                );
              }
            }
          }
          return ts.visitEachChild(node, visitor, context);
        }

        return visitor(sourceFile) as ts.SourceFile;
      }],
    },
  });

  const tranpiled: { [file: string]: string } = {};

  for (const file of result.getFiles()) {
    logger.info("Script: %v => %v", file.filePath, file.text);
    tranpiled[file.filePath] = file.text;
  }

  const k = Object.keys(tranpiled);

  const key = k[k.length - 1];

  const a = await esbuild.build({
    stdin: {
      contents: tranpiled[key],
      sourcefile: key,
      loader: "js",
    },
    plugins: [
      {
        name: "memory-fs",
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            return { path: args.path.replace(/^.\//, "/"), namespace: "memory" };
          });

          build.onLoad({ filter: /.*/, namespace: "memory" }, (args) => {
            if (tranpiled[args.path]) {
              return { contents: tranpiled[args.path], loader: "js" };
            }
          });
        },
      },
    ],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
  });

  const bundledCode = a.outputFiles[0].text;

  logger.info("Code: %v", bundledCode);

  return bundledCode;
}
