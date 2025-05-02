import { damageParse } from "../commands/damage.ts";
import { ButtonComponent } from "../deps.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { ButtonOptions, DamageInput, button } from "./common.ts";

export const updateWillpowerButton: (options: ButtonOptions, value: number, aggravated: boolean) => ButtonComponent = button<DamageInput>(
  (context) => {
    const value = parseInt(context[0]);
    const aggravated = "true" == context[1];
    return { superficial: aggravated ? undefined : value, aggravated: aggravated ? value: undefined, add: true }
  },
  buildCharacterUpdateSolver(damageParse((c) => c.willpower))
);