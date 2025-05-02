import { ButtonComponent } from "../deps.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { button, ButtonOptions } from "./common.ts";

export const updateHungerButton: (
  options: ButtonOptions,
  value: number,
) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  buildCharacterUpdateSolver<number>((c, v) => c.hunger = v, true),
);
