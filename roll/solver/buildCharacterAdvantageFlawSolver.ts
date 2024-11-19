import { AdvantageFlaw, Character } from "../../character.ts";
import { Interaction } from "../../deps.ts";
import { Solver } from "../commands/common.ts";


export function buildCharacterAdvantageFlawSolver(advantageFlaw: (character: Character) => AdvantageFlaw): Solver {
    return async (interaction: Interaction, values: {
        value: number,
        name?: string,
        index?: number
    }) => {
    };
  }