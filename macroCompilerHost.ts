import { ActionResult, Character } from "./character.ts";
import { ts } from "./deps.ts";
import { logger } from "./logger.ts";

export type MacroFunction = (
  character: Character,
  result: ActionResult,
) => void;

export const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.Latest,
  noEmitOnError: true,
  module: ts.ModuleKind.Preserve,
};

const host = ts.createCompilerHost(compilerOptions, true);

const files: ts.SourceFile[] = [];

const paths = ["./character.ts"];

for (const file of paths) {
  files.push(ts.createSourceFile(
    file,
    await Deno.readTextFile(file),
    ts.ScriptTarget.Latest,
  ));
}

export class MacroCompilerHost implements ts.CompilerHost {
  private _root: ts.SourceFile;
  private files: ts.SourceFile[] = [];

  constructor(
    code: string,
  ) {
    this._root = ts.createSourceFile(
      "./root.ts",
      `import { ActionResult, Character, CharacterMode } from "./character";
  
        declare const character: Character;
        declare const result: ActionResult;
  
        ${code}`,
      ts.ScriptTarget.Latest,
    );
    this.files = [this._root, ...files];
  }

  public get root(): ts.SourceFile {
    return this._root;
  }

  fileExists(filePath: string): boolean {
    return this.files.findIndex((f) => f.fileName === filePath) > -1 ||
      host.fileExists(filePath);
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
    return this.files.find((f) => f.fileName === fileName) ||
      host.getSourceFile(
        fileName,
        languageVersionOrOptions,
        onError,
        shouldCreateNewSourceFile,
      );
  }

  readFile(fileName: string): string | undefined {
    return this.files.find((f) => f.fileName === fileName)?.getText() ||
      host.readFile(fileName);
  }

  useCaseSensitiveFileNames() {
    return host.useCaseSensitiveFileNames();
  }

  writeFile(
    fileName: string,
    text: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly ts.SourceFile[],
    data?: ts.WriteFileCallbackData,
  ): void {
    logger.info("writeFile: %v -> %v", fileName, text);
    /*host.writeFile(
      fileName,
      text,
      writeByteOrderMark,
      onError,
      sourceFiles,
      data,
    );*/
  }

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
  }
}
