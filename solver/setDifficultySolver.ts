import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import * as data from "../data.ts";
import { colors, isStoryteller } from "../utils.ts";

export async function setDifficultySolver(
  interaction: Interaction,
  values: { difficulty: number },
) {
  if (isStoryteller(interaction)) {
    data.setDifficulty(values.difficulty);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeDifficulty,
        color: colors.gray,
        fields: [{
          name: locale.difficulty,
          value: `**${data.difficulty}**`,
          inline: true,
        }],
      }],
    });
  }
}
