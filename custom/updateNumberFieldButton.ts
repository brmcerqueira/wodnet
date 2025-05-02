import { ButtonComponent } from "../deps.ts";
import { reRollSolver } from "../solver/reRollSolver.ts";
import { ButtonOptions, button } from "./common.ts";

export enum UpdateNumberFieldButtonKind {
  Health,
  Willpower,
  Hunger
}

export const updateNumberFieldButton: (options: ButtonOptions, value: number, kind: UpdateNumberFieldButtonKind) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  reRollSolver
);
