// deno-lint-ignore-file no-explicit-any
import { ActionResult, Character } from "./character.ts";
import { ButtonStyle, MessagePayload, Project, ScriptTarget, terser, ts } from "./deps.ts";
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
    "macro.ts": [characterCode,
      "declare const character: Character;declare const result: ActionResult;declare const button: any;",
      code].join("")
  });
}

export async function transpile(files: { [file: string]: string }): Promise<string> {
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ESNext,
    },
    useInMemoryFileSystem: true
  });

  for (const key in files) {
    project.createSourceFile(key, files[key]);
  }

  const diagnostics = project.getPreEmitDiagnostics();

  if (diagnostics.length > 0) {
    throw new Error(project.formatDiagnosticsWithColorAndContext(diagnostics));
  }

  const result = await project.emitToMemory({
    customTransformers: {
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
    },
  });

  const tranpiled: { [file: string]: string } = {};

  for (const file of result.getFiles()) {
    logger.info("TypeScript: %v => %v", file.filePath, file.text);
    tranpiled[file.filePath] = file.text;
  }

  const minify = (await terser.minify(tranpiled)).code!;

  logger.info("Code: %v", minify);

  return minify;
}