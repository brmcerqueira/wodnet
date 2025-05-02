import { parseField } from "../commands/module.ts";
import { ButtonComponent } from "../deps.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { ButtonOptions, button } from "./common.ts";

export const updateHungerButton: (options: ButtonOptions, value: number) => ButtonComponent = button(
  (context) => parseInt(context[0]),
  buildCharacterUpdateSolver(parseField<number>((c, v) => c.hunger = v), false),
);