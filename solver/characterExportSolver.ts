import { Interaction, InteractionResponseType, MessageAttachment } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";

export async function characterExportSolver(
  interaction: Interaction,
  chronicle: Chronicle
) {
    const character = await chronicle.getCharacterByUserId(interaction.user.id);

    if (!character) {
      throw new InteractionResponseError(locale.notFound);
    }

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      title: locale.characterExport,
      files: [new MessageAttachment(`${character.name}.json`, JSON.stringify(character))],
    });
}