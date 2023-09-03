import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";
import { isStoryteller } from "../isStoryteller.ts";

export async function setDifficultySolver(
  interaction: Interaction,
  values: { difficulty: number },
) {
  if (await isStoryteller(interaction)) {
    data.setDifficulty(values.difficulty);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeDifficulty,
        color: colors.Gray,
        fields: [{
          name: locale.roll.difficulty,
          value: `**${data.difficulty}**`,
          inline: true,
        }],
      }],
    });
  }
}
