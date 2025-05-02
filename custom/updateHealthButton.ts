import { ButtonComponent } from "../deps.ts";
import { reRollSolver } from "../solver/reRollSolver.ts";
import { ButtonOptions, button } from "./common.ts";

export const updateHealthButton: (options: ButtonOptions, value: number, aggravated: boolean) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  reRollSolver
);