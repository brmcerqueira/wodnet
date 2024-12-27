import { ts } from "./deps.ts";
import { logger } from "./logger.ts";
import {
compilerOptions,
  MacroCompilerHost,
  MacroFunction,
} from "./macroCompilerHost.ts";

export function macro(code: string): MacroFunction {
  const host = new MacroCompilerHost(code);

  const program = ts.createProgram(
    [host.root.fileName],
    compilerOptions,
    host,
  );

  const diagnostics = ts.getPreEmitDiagnostics(program);

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

  return host.macro();
}
