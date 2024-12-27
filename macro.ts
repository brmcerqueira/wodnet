import { ActionResult, Character } from "./character.ts";
import { MessagePayload, ts } from "./deps.ts";
import { logger } from "./logger.ts";

export type MacroData = {
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

const target = ts.ScriptTarget.Latest;

const compilerOptions: ts.CompilerOptions = {
  target,
  allowImportingTsExtensions: true,
  noEmit: true
};


export function includeFileTransformer<
  T extends ts.Node,
>(): ts.TransformerFactory<T> {
  return (context: ts.TransformationContext) => {
    return (rootNode: T): any => {
      function visit(node: ts.Node): any {
        if (node.kind == ts.SyntaxKind.ExportKeyword) {
          return ts.visitNode(undefined, visit);
        }

        if (ts.isImportDeclaration(node)) {
          const moduleName = node.moduleSpecifier.getText().replace(
            /['"]/g,
            "",
          );

          return ts.visitNode(
            ts.createSourceFile(
              moduleName,
              Deno.readTextFileSync(moduleName),
              target,
              true,
              ts.ScriptKind.TS,
            ),
            visit,
          );
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

export class Transpiler {
  private _code: string;

  constructor(code: string) {
    this._code =
      `import { ActionResult, Character, CharacterMode } from "./character.ts";

        declare const character: Character;
        declare const result: ActionResult;
  
        ${code}`;
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    const root = ts.createSourceFile(
      "./root.ts",
      this._code,
      target,
      true,
      ts.ScriptKind.TS,
    );

    const host = new MacroCompilerHost(root);

    const program = ts.createProgram(
      [root.fileName],
      compilerOptions,
      host,
    );
  
    return ts.getPreEmitDiagnostics(program);
  }

  public get transpiled(): string {
    const output = ts.transpileModule(this._code, {
      compilerOptions: {
        target,
        module: ts.ModuleKind.Preserve,
      },
      transformers: {
        before: [includeFileTransformer()]
      }
    });

    logger.info("Code: %v", output.outputText);

    return output.outputText;
  }
}

export class MacroCompilerHost implements ts.CompilerHost {
  constructor(private _root: ts.SourceFile) {

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

  writeFile(): void {}
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
