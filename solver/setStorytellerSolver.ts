import { Interaction, InteractionResponseType } from "../deps.ts";
import { Chronicle } from "../chronicle.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";

export async function setStorytellerSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { user: string },
) {
  if (interaction.guild!.ownerID != interaction.user.id) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  await chronicle.setStoryteller(input.user);
  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.storytellerUpdate,
      color: colors.gray,
      fields: [{
        name: locale.storyteller,
        value: `<@${input.user}>`,
        inline: true,
      }],
    }],
  });
}
