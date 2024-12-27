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

const target = ts.ScriptTarget.Latest;

const compilerOptions: ts.CompilerOptions = {
  target,
  allowImportingTsExtensions: true,
  noEmit: true,
};

const host = ts.createCompilerHost(compilerOptions, true);

export function macroFunction(macro: Macro): MacroFunction {
  return new Function(
    "character",
    "result",
    "button",
    macro.transpiled!,
  ) as MacroFunction;
}

export class MacroTranspiler {
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

    return ts.getPreEmitDiagnostics(ts.createProgram(
      [root.fileName],
      compilerOptions,
      host,
    ), root);
  }

  public get transpiled(): string {
    const output = ts.transpileModule(this._code, {
      compilerOptions: {
        target,
        module: ts.ModuleKind.Preserve,
      },
      transformers: {
        before: [(context: ts.TransformationContext) => {
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

          return (rootNode) => ts.visitNode(rootNode, visit);
        }],
      },
    });

    logger.info("Code: %v", output.outputText);

    return output.outputText;
  }
}

class MacroCompilerHost implements ts.CompilerHost {
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
}
