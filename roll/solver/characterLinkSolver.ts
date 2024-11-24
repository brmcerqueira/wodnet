import { getCharacter } from "../../repository.ts";
import { config } from "../../config.ts";
import {
    ButtonStyle,
    encodeBase64Url,
    Interaction,
    InteractionResponseType,
    MessageComponentData,
    MessageComponentType,
} from "../../deps.ts";
import * as data from "../data.ts";
import * as colors from "../colors.ts";
import { locale } from "../../i18n/locale.ts";
import { InteractionResponseError } from "../interactionResponseError.ts";

export function buttonCharacterLink(id: string): MessageComponentData {
    return {
      type: MessageComponentType.BUTTON,
      label: locale.open,
      style: ButtonStyle.LINK,
      url: `${config.host}/dark?id=${encodeBase64Url(id)}`,
    };
  }

export async function characterLinkSolver(interaction: Interaction) {
    const id =
        config.storytellerId == interaction.user.id && data.currentCharacter
            ? data.currentCharacter
            : interaction.user.id;

    const character = await getCharacter(id, true);
    
    if (character.name == "") {
        throw new InteractionResponseError(locale.notFound);
    }

    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
            title: character.name,
            color: colors.Gray,
            image: {
                url: character.image,
            },
        }],
        components: [{
            type: MessageComponentType.ACTION_ROW,
            components: [buttonCharacterLink(id)],
        }],
    });
}
