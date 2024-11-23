import { get } from "../../characterManager.ts";
import { config } from "../../config.ts";
import {
    ButtonStyle,
    encodeBase64Url,
    Interaction,
    InteractionResponseType,
    MessageComponentType,
} from "../../deps.ts";
import * as data from "../data.ts";
import * as colors from "../colors.ts";
import { locale } from "../../i18n/locale.ts";
import { InteractionResponseError } from "../interactionResponseError.ts";

export async function characterLinkSolver(interaction: Interaction) {
    const id =
        config.storytellerId == interaction.user.id && data.currentCharacter
            ? data.currentCharacter
            : interaction.user.id;

    const character = await get(id, true);
    
    if (character.name == "") {
        throw new InteractionResponseError(locale.notFound);
    }

    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
            title: locale.character,
            color: colors.Gray,
            image: {
                url: character.image,
            },
        }],
        components: [{
            type: MessageComponentType.ACTION_ROW,
            components: [{
                type: MessageComponentType.BUTTON,
                label: character.name,
                style: ButtonStyle.LINK,
                url: `${config.host}/dark?id=${encodeBase64Url(id)}`,
            }],
        }],
    });
}
