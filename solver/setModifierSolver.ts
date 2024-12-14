import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function setModifierSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { modifier: number },
) {
  if (await chronicle.isStoryteller(interaction.user.id)) {
    await chronicle.setModifier(input.modifier);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeModifier,
        color: colors.gray,
        fields: [{
          name: locale.modifier,
          value: `**${input.modifier}**`,
          inline: true,
        }],
      }],
    });
  }
  else {
    throw new InteractionResponseError(locale.unauthorized);
  }
}
