import { Chronicle } from "../chronicle.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { sendRoll } from "../sendRoll.ts";

export async function rollSolver(interaction: Interaction, chronicle: Chronicle, values: {
  dices: number;
  hunger?: number;
  difficulty?: number;
  description?: string;
}) {
  const character = await chronicle.getCharacterByUserId(interaction.user.id);

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
    values.dices,
    values.hunger || 0,
    values.difficulty || 1,
    0,
    values.description,
    character
  );

  if (character) {
    character.willpower.superficial += 1;
    await chronicle.updateCharacter(character);
  }
}
