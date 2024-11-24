import { config } from "../config.ts";
import {
    Interaction,
    InteractionResponseType,
    MessageComponentType,
} from "../deps.ts";
import * as data from "../data.ts";
import { locale } from "../i18n/locale.ts";
import { buttonCharacterLink, colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function characterLinkSolver(interaction: Interaction, chronicle: Chronicle) {
    const id =
        config.storytellerId == interaction.user.id && data.currentCharacter
            ? data.currentCharacter
            : interaction.user.id;

    const character = await chronicle.getCharacter(id, true);
    
    if (character.name == "") {
        throw new InteractionResponseError(locale.notFound);
    }

    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
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
