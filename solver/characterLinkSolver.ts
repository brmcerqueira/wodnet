import { config } from "../config.ts";
import {
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import {
  buttonCharacterLink,
  colors,
  InteractionResponseError,
} from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function characterLinkSolver(
  interaction: Interaction,
  chronicle: Chronicle,
) {
  const currentCharacter = await chronicle.currentCharacter();
  const id = config.storytellerId == interaction.user.id && currentCharacter
    ? currentCharacter
    : interaction.user.id;

  const character = await chronicle.getCharacter(id, true);

  if (character.name == "") {
    throw new InteractionResponseError(locale.notFound);
  }

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.characterLinkSent,
      color: colors.green,
    }],
  });

  await interaction.user.send({
    embeds: [{
      title: character.name,
      color: colors.gray,
      image: {
        url: character.image,
      },
    }],
    components: [{
      type: MessageComponentType.ACTION_ROW,
      components: [buttonCharacterLink(chronicle.id, id)],
    }],
  });
}
