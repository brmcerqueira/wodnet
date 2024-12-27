import { ActionResult, Character } from "./character.ts";
import { MessagePayload, ts } from "./deps.ts";
import { logger } from "./logger.ts";

export type Macro = {
  message: MessagePayload;
  buttons?: string[];
  code?: string;
  transpiled?: string;
};

export type MacroFunction = (
  character: Character,
  result: ActionResult,
  button: number,
) => void;

export const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.Latest,
  //noEmitOnError: true,
  module: ts.ModuleKind.Preserve,
};

function parseCode(code: string) {
  return code.replaceAll(/from[\s\n]*"(.*).ts"/g, (_, module) => {
    return `from "${module}"`;
  });
}

export function includeFileTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return (context: ts.TransformationContext) => {
    return (rootNode: T): any => {
      function visit(node: ts.Node): any {
        if (node.kind == ts.SyntaxKind.ExportKeyword) {
          return ts.visitNode(undefined, visit);
        }

        if (ts.isImportDeclaration(node)) {   
          const moduleName = `${node.moduleSpecifier.getText().replace(
            /['"]/g,
            "",
          )}.ts`;

          return ts.visitNode(ts.createSourceFile(
            moduleName,
            parseCode(Deno.readTextFileSync(moduleName)),
            compilerOptions.target!,
            true,
            ts.ScriptKind.TS
          ), visit);
        }

        return ts.visitEachChild(node, visit, context);
      }

      return ts.visitNode(rootNode, visit);
    };
  };
}

const host = ts.createCompilerHost(compilerOptions, true);

export function macro(transpiled: string): MacroFunction {
  return new Function(
    "character",
    "result",
    "button",
    transpiled,
  ) as MacroFunction;
}

export class MacroCompilerHost implements ts.CompilerHost {
  private _root: ts.SourceFile;
  private _transpiled: string;

  constructor(
    code: string,
  ) {
    this._root = ts.createSourceFile(
      "./root.ts",
      parseCode(`import { ActionResult, Character, CharacterMode } from "./character.ts";

        declare const character: Character;
        declare const result: ActionResult;
  
        ${code}`),
        compilerOptions.target!,
        undefined,
        ts.ScriptKind.TS
    );
    this._transpiled = "";
  }

  public get root(): ts.SourceFile {
    return this._root;
  }

  public get transpiled(): string {
    return this._transpiled;
  }

  fileExists(filePath: string): boolean {
    return filePath === this._root.fileName || host.fileExists(filePath);
  }

  directoryExists(directoryName: string): boolean {
    return host.directoryExists!(directoryName);
  }

  getCurrentDirectory(): string {
    return host.getCurrentDirectory();
  }

  getCanonicalFileName(fileName: string): string {
    return host.getCanonicalFileName(fileName);
  }

  getNewLine(): string {
    return host.getNewLine();
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return host.getDefaultLibFileName(options);
  }

  getSourceFile(
    fileName: string,
    languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean,
  ): ts.SourceFile | undefined {
    return fileName === this._root.fileName ? this._root : host.getSourceFile(
      fileName,
      languageVersionOrOptions,
      onError,
      shouldCreateNewSourceFile,
    );
  }

  readFile(fileName: string): string | undefined {
    return fileName === this._root.fileName
      ? this._root.getText()
      : host.readFile(fileName);
  }

  useCaseSensitiveFileNames() {
    return host.useCaseSensitiveFileNames();
  }

  writeFile(_fileName: string, text: string): void {
    logger.info("Transpiled: %v", text);
    this._transpiled = text;
  }
  /*
  macro(): MacroFunction {
    const code = ts.transpile(this._root!.getText(), {
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.Preserve,
    });
    logger.info("Code: %v", code);
    return new Function(
      "character",
      "result",
      code,
    ) as MacroFunction;
  }*/
}
