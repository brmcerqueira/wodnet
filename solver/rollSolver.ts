import { Chronicle } from "../repository.ts";
import { Interaction } from "../deps.ts";
import { sendRoll } from "../sendRoll.ts";

export async function rollSolver(interaction: Interaction, chronicle: Chronicle, input: {
  dices: number;
  hunger?: number;
  difficulty?: number;
  description?: string;
}) {
  await sendRoll(
    interaction,
    chronicle,
    input.dices,
    input.hunger || 0,
    input.difficulty || 1,
    0,
    input.description,
    await chronicle.getCharacterByUserId(interaction.user.id)
  );
}
