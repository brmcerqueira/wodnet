import {
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import {
  colors,
  InteractionResponseError,
} from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { characterLinkButton } from "../custom/module.ts";

export async function characterLinkSolver(
  interaction: Interaction,
  chronicle: Chronicle,
) {
  const character = await chronicle.getCharacterByUserId(interaction.user.id);

  if (!character) {
    throw new InteractionResponseError(locale.notFound);
  }

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.characterLinkSent,
      color: colors.green,
    }],
  });

  interaction.user.send({
    embeds: [{
      title: character.name,
      color: colors.gray,
      image: {
        url: character.image,
      },
    }],
    components: [{
      type: MessageComponentType.ACTION_ROW,
      components: [await characterLinkButton(chronicle.id, character.id)],
    }],
  });
}
