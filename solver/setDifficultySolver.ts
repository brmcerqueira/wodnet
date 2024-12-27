import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";

export async function setDifficultySolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { difficulty: number },
) {
  if (await chronicle.isStoryteller(interaction.user.id)) {
    await chronicle.setDifficulty(input.difficulty);
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerChangeDifficulty,
        color: colors.gray,
        fields: [{
          name: locale.difficulty,
          value: `**${input.difficulty}**`,
          inline: true,
        }],
      }],
    });
  }
  else {
    throw new InteractionResponseError(locale.unauthorized);
  }
}
