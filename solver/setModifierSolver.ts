import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import * as data from "../data.ts";
import { colors, isStoryteller } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function setModifierSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  values: { modifier: number },
) {
  if (isStoryteller(interaction)) {
    data.setModifier(values.modifier);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeModifier,
        color: colors.gray,
        fields: [{
          name: locale.modifier,
          value: `**${data.modifier}**`,
          inline: true,
        }],
      }],
    });
  }
}
