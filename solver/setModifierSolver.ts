import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, isStoryteller } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function setModifierSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  values: { modifier: number },
) {
  if (isStoryteller(interaction)) {
    await chronicle.setModifier(values.modifier);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeModifier,
        color: colors.gray,
        fields: [{
          name: locale.modifier,
          value: `**${values.modifier}**`,
          inline: true,
        }],
      }],
    });
  }
}
