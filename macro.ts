import { ActionResult } from "./actions.ts";
import { Character } from "./character.ts";
import { ts } from "./deps.ts";
import { logger } from "./logger.ts";
import { MacroCompilerHost } from "./macroCompilerHost.ts";

export type MacroFunction = (
  character: Character,
  result: ActionResult,
) => void;

const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.Latest,
  noEmit: true,
  allowImportingTsExtensions: true,
};

const host = new MacroCompilerHost(compilerOptions);

await host.load();

export function macro(code: string): MacroFunction {
  const program = ts.createProgram(
    host.code(code),
    compilerOptions,
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

  return new Function(
    "character",
    "result",
    ts.transpile(code, compilerOptions),
  ) as MacroFunction;
}