import { ButtonComponent } from "../deps.ts";
import { reRollSolver } from "../solver/reRollSolver.ts";
import { ButtonOptions, button } from "./common.ts";

export const updateHungerButton: (options: ButtonOptions, value: number) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  reRollSolver
);