import { Interaction, InteractionResponseType } from "../../deps.ts";
import { sendRoll } from "../sendRoll.ts";

export async function rollSolver(interaction: Interaction, values: {
  dices: number;
  hunger?: number;
  difficulty?: number;
  description?: string;
}) {
  await sendRoll(
    async (m) => {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        content: m.content,
        embeds: m.embeds,
        components: m.components,
      });
    },
    interaction.guild!.id,
    interaction.user.id,
    values.dices,
    values.hunger || 0,
    values.difficulty || 1,
    0,
    values.description,
  );
}
