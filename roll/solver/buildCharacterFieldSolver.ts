import { Character } from "../../character.ts";
import { Interaction } from "../../deps.ts";
import { Solver } from "../commands.ts";

export function buildCharacterFieldSolver(
    parse: (
      character: Character,
      origin: string,
      value: any,
      context?: any,
    ) => void,
    context?: (character: Character) => any,
  ): Solver {
    return async (interaction: Interaction, values: any) => {
    };
  }