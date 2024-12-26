import { ts } from "./deps.ts";

export class MacroCompilerHost implements ts.CompilerHost {
  private host: ts.CompilerHost;
  private dependencies: ts.SourceFile[] = [];
  private dummy: ts.SourceFile | undefined;
  constructor(compilerOptions: ts.CompilerOptions) {
    this.host = ts.createCompilerHost(compilerOptions, true);
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
      value,
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
}

/*
async function compileTypeScriptCode(
  code: string,
): Promise<string | undefined> {
  const dummyFilePath = "/in-memory-file.ts";
  const characterSourceFile = ts.createSourceFile(
    "/character.ts",
    await Deno.readTextFile("./character.ts"),
    ts.ScriptTarget.Latest,
  );
  const dummySourceFile = ts.createSourceFile(
    dummyFilePath,
    code,
    ts.ScriptTarget.Latest,
  );

  const host: ts.CompilerHost = {
    fileExists: (filePath) => {
      logger.info(filePath);
      return filePath === characterSourceFile.fileName ||
        filePath === dummyFilePath || realHost.fileExists(filePath);
    },
    directoryExists: (path) => {
      return realHost.directoryExists!(path);
    },
    getCurrentDirectory: realHost.getCurrentDirectory.bind(realHost),
    getDirectories: realHost.getDirectories?.bind(realHost),
    getCanonicalFileName: (fileName) => realHost.getCanonicalFileName(fileName),
    getNewLine: realHost.getNewLine.bind(realHost),
    getDefaultLibFileName: realHost.getDefaultLibFileName.bind(realHost),
    getSourceFile: (
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    ) => {
      logger.info("File: %v %v", fileName, shouldCreateNewSourceFile);

      if (fileName === characterSourceFile.fileName) {
        return characterSourceFile;
      }

      return fileName === dummyFilePath
        ? dummySourceFile
        : realHost.getSourceFile(
          fileName,
          languageVersion,
          onError,
          shouldCreateNewSourceFile,
        );
    },
    getSourceFileByPath: realHost.getSourceFileByPath?.bind(realHost),
    readFile: (filePath) =>
      filePath === dummyFilePath ? code : realHost.readFile(filePath),
    useCaseSensitiveFileNames: () => realHost.useCaseSensitiveFileNames(),
    writeFile: realHost.writeFile.bind(realHost),
  };

  const program = ts.createProgram([dummyFilePath], compilerOptions, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  program.emit();

  if (diagnostics.length > 0) {
    diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      const { line, character } =
        diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start!) ?? {};
      logger.error(
        `file: ${diagnostic.file?.fileName}, line: ${line}, column: ${character} -> ${message}`,
      );
    });
  }

  return ts.transpile(code, compilerOptions);
}
 */
