import { ActionResult, Character } from "./character.ts";
import { ts } from "./deps.ts";
import { logger } from "./logger.ts";

export type MacroFunction = (
  character: Character,
  result: ActionResult,
) => void;

export class MacroCompilerHost implements ts.CompilerHost {
  private host: ts.CompilerHost;
  private dependencies: ts.SourceFile[] = [];
  private dummy: ts.SourceFile | undefined;
  constructor() {
    this.host = ts.createCompilerHost(this.compilerOptions, true);
  }

  public get compilerOptions(): ts.CompilerOptions {
    return {
      target: ts.ScriptTarget.Latest,
      noEmit: true,
      allowImportingTsExtensions: true,
    };
  }

  private get files(): ts.SourceFile[] {
    return this.dummy ? [this.dummy, ...this.dependencies] : this.dependencies;
  }

  async load() {
    const array = ["./character.ts"];

    for (const file of array) {
      this.dependencies.push(ts.createSourceFile(
        file,
        await Deno.readTextFile(file),
        ts.ScriptTarget.Latest,
      ));
    }
  }

  code(value: string): string[] {
    this.dummy = ts.createSourceFile(
      "./dummy.ts",
      `import { ActionResult, Character } from "./character.ts";

      declare const character: Character;
      declare const result: ActionResult;

      ${value}`,
      ts.ScriptTarget.Latest,
    );
    return [this.dummy.fileName];
  }

  fileExists(filePath: string): boolean {
    return this.files.findIndex((f) => f.fileName === filePath) > -1 ||
      this.host.fileExists(filePath);
  }

  directoryExists(directoryName: string): boolean {
    return this.host.directoryExists!(directoryName);
  }

  getCurrentDirectory(): string {
    return this.host.getCurrentDirectory();
  }

  getCanonicalFileName(fileName: string): string {
    return this.host.getCanonicalFileName(fileName);
  }

  getNewLine(): string {
    return this.host.getNewLine();
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return this.host.getDefaultLibFileName(options);
  }

  getSourceFile(
    fileName: string,
    languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean,
  ): ts.SourceFile | undefined {
    return this.files.find((f) => f.fileName === fileName) ||
      this.host.getSourceFile(
        fileName,
        languageVersionOrOptions,
        onError,
        shouldCreateNewSourceFile,
      );
  }

  readFile(fileName: string): string | undefined {
    return this.files.find((f) => f.fileName === fileName)?.getText() ||
      this.host.readFile(fileName);
  }

  useCaseSensitiveFileNames() {
    return this.host.useCaseSensitiveFileNames();
  }

  writeFile(
    fileName: string,
    text: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly ts.SourceFile[],
    data?: ts.WriteFileCallbackData,
  ): void {
    this.host.writeFile(
      fileName,
      text,
      writeByteOrderMark,
      onError,
      sourceFiles,
      data,
    );
  }

  buildMacroFunction(): MacroFunction {
    const code = ts.transpile(this.dummy!.getText(), {
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
