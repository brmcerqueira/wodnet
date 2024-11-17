import { Character, Damage } from "../../character.ts";
import { Interaction } from "../../deps.ts";
import { Solver } from "../commands.ts";

export function buildCharacterDamageSolver(damage: (character: Character) => Damage): Solver {
    return async (interaction: Interaction, values: {  
        superficial?: number;
        aggravated?: number;
    }) => {
    };
  }