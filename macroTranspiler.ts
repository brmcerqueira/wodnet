import { ActionResult, Character } from "./character.ts";
import { ButtonStyle, MessageComponentEmoji, MessagePayload, ts } from "./deps.ts";
import { logger } from "./logger.ts";

export type MacroButton = {
  label?: string;
  style?: ButtonStyle;
  emoji?: {
    id: string
    name: string
  } | string;
  value?: any
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

const target = ts.ScriptTarget.Latest;

const compilerOptions: ts.CompilerOptions = {
  target,
  allowImportingTsExtensions: true,
  noEmit: true,
};

const host = ts.createCompilerHost(compilerOptions, true);

export function macroFunction(code: string): MacroFunction {
  return new Function(
    "character",
    "result",
    "button",
    code,
  ) as MacroFunction;
}

export class MacroTranspiler {
  private _code: string;

  constructor(code: string) {
    this._code =
      `import { ActionResult, Character, CharacterMode } from "./character.ts";declare const character: Character;declare const result: ActionResult;declare const button: any;
      ${code}`;
  }

  public get diagnostics(): string[] {
    const root = ts.createSourceFile(
      "./root.ts",
      this._code,
      target,
      true,
      ts.ScriptKind.TS,
    );

    return ts.getPreEmitDiagnostics(
      ts.createProgram(
        [root.fileName],
        compilerOptions,
        new MacroCompilerHost(root),
      ),
      root,
    ).map((diagnostic) => {
      const lineAndCharacter = diagnostic.file?.getLineAndCharacterOfPosition(
        diagnostic.start!,
      );

      return `${
        lineAndCharacter
          ? `[${lineAndCharacter.line}, ${lineAndCharacter.character}] -> `
          : ""
      }${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`;
    });
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
