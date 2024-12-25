import { ButtonComponent } from "../deps.ts";
import { macroSolver } from "../solver/macroSolver.ts";
import { button, ButtonOptions } from "./common.ts";

export type MacroButtonInput = { messageId: string, index: number };

export const macroButton: (
  options: ButtonOptions,
  messageId: string,
  index: number,
) => ButtonComponent = button<MacroButtonInput>(
  (array) => {
    return { messageId: array[0], index: parseInt(array[1]) };
  },
  macroSolver,
);
