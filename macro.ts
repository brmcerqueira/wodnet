import { ts } from "./deps.ts";
import { logger } from "./logger.ts";
import { MacroCompilerHost, MacroFunction } from "./macroCompilerHost.ts";

const host = new MacroCompilerHost();

await host.load();

export function macro(code: string): MacroFunction {
  const program = ts.createProgram(
    host.code(code),
    host.compilerOptions,
    host,
  );

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

  return host.buildMacroFunction();
}