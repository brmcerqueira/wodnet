import { Character } from "../../character.ts";
import { Interaction } from "../../deps.ts";
import { Solver } from "../commands.ts";


export function buildCharacterDisciplineSolver(discipline: keyof Character["disciplines"]): Solver {
    return async (interaction: Interaction, values: any) => {
    };
  }