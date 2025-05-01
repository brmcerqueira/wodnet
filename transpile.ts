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
  return await transpile(
    "macro.ts",
    `import { ActionResult, Character, CharacterMode } from \"./character.ts\";declare const character: Character;declare const result: ActionResult;declare const button: any;
    ${code}`,
    { "character.ts": characterCode },
  );
}

export async function transpile(
  name: string,
  code: string,
  dependencies?: { [name: string]: string },
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
          const resolvedModules: ts.ResolvedModule[] = [];

          for (const moduleName of moduleNames) {
            const result = ts.resolveModuleName(
              moduleName.endsWith(".ts") ? moduleName.slice(0, -3) : moduleName,
              containingFile,
              getCompilerOptions(),
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

  if (dependencies) {
    for (const key in dependencies) {
      project.createSourceFile(key, dependencies[key]);
    }
  }

  project.createSourceFile(name, code);

  const diagnostics = project.getPreEmitDiagnostics();

  if (diagnostics.length > 0) {
    throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics));
  }

  const emitResult = await project.emitToMemory({
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

  const jsName = `/${name.replace(/\.ts$/, ".js")}`;

  for (const file of emitResult.getFiles()) {
    logger.info("Script: %v => %v", file.filePath, file.text);
    tranpiled[file.filePath] = file.text;
  }

  const buildResult = await esbuild.build({
    stdin: {
      contents: tranpiled[jsName],
      sourcefile: jsName,
      loader: "js",
    },
    plugins: [
      {
        name: "memory-fs",
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            return {
              path: args.path.replace(/^.\//, "/"),
              namespace: "memory",
            };
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
    minify: true,
    format: "esm",
  });

  const bundled = buildResult.outputFiles[0].text;

  logger.info("Code: %v", bundled);

  return bundled;
}
