import { config } from "../config.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import * as colors from "./colors.ts";

export async function isStoryteller(
  interaction: Interaction,
): Promise<boolean> {
  const result = interaction.user.id == config.storytellerId;
  if (!result) {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.unauthorized,
        color: colors.Red,
      }],
    });
  }
  return result;
}
