import { ButtonComponent } from "../deps.ts";
import { reRollSolver } from "../solver/reRollSolver.ts";
import { button, ButtonOptions } from "./common.ts";

export const reRollButton: (options: ButtonOptions, value: number) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  reRollSolver
);