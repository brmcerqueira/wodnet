import { Chronicle } from "../repository.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { sendRoll } from "../sendRoll.ts";

export async function rollSolver(interaction: Interaction, chronicle: Chronicle, input: {
  dices: number;
  hunger?: number;
  difficulty?: number;
  description?: string;
}) {
  await sendRoll(
    chronicle,
    async (m) => {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        content: m.content,
        embeds: m.embeds,
        components: m.components,
      });
    },
    interaction.user.id,
    input.dices,
    input.hunger || 0,
    input.difficulty || 1,
    0,
    input.description,
    await chronicle.getCharacterByUserId(interaction.user.id)
  );
}
