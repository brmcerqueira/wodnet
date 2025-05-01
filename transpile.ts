// deno-lint-ignore-file no-explicit-any
import { ActionResult, Character } from "./character.ts";
import { ButtonStyle, MessagePayload, Project, swc, ts } from "./deps.ts";
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
  const project = new Project({
    useInMemoryFileSystem: true,
  });

  const sourceFile = project.createSourceFile("in-memory.ts", [characterCode,
    "declare const character: Character;declare const result: ActionResult;declare const button: any;",
    code
  ].join(""));

  sourceFile.transform(traversal => {
    const node = traversal.visitChildren();
    
    if (node.kind == ts.SyntaxKind.ExportKeyword) {
      return traversal.factory.createNotEmittedStatement(node);
    }
  
    return node;
  });

  logger.info("TypeScript: %v", sourceFile.getFullText());

  const diagnostics = project.getPreEmitDiagnostics();

  logger.info("Diagnostics: %v", project.formatDiagnosticsWithColorAndContext(diagnostics));

  return await transpile(sourceFile.getFullText());
}

export async function transpile(code: string): Promise<string> {
  let result = "";

  const ast = await swc.parse(code,
    {
      syntax: "typescript",
      comments: false,
      script: true,
      target: "esnext",
    },
  );

  result = (await swc.transform(ast, {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: false,
        decorators: false,
        dynamicImport: false,
      },
      target: "es2024",
      loose: false,
      externalHelpers: false,
      keepClassNames: false,
    },
    isModule: false,
  })).code;

  logger.info("Code: %v", result);

  result = (await swc.minify(result, {
    compress: true
  })).code;

  return result;
}