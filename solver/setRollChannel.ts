import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";

export async function setRollChannel(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { channel: string },
) {
  if (!(await chronicle.isStoryteller(interaction.user.id))) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  await chronicle.setRollChannel(input.channel);
  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.storytellerChangeRollChannel,
      color: colors.gray,
      fields: [{
        name: locale.rollChannel,
        value: `<#${input.channel}>`,
        inline: true,
      }],
    }],
  });
}
