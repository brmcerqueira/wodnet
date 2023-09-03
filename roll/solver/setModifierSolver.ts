import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";
import { isStoryteller } from "../isStoryteller.ts";

export async function setModifierSolver(
  interaction: Interaction,
  values: { modifier: number },
) {
  if (await isStoryteller(interaction)) {
    data.setModifier(values.modifier);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeModifier,
        color: colors.Gray,
        fields: [{
          name: locale.roll.modifier,
          value: `**${data.modifier}**`,
          inline: true,
        }],
      }],
    });
  }
}
