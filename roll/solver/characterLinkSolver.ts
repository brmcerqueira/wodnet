import { config } from "../../config.ts";
import {
    ButtonStyle,
    encodeBase64Url,
    Interaction,
    InteractionResponseType,
    MessageComponentType,
} from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as data from "../data.ts";

export async function characterLinkSolver(interaction: Interaction) {
    const id =
        config.storytellerId == interaction.user.id && data.currentCharacter
            ? data.currentCharacter
            : interaction.user.id;

    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        components: [{
            type: MessageComponentType.ACTION_ROW,
            components: [{
                type: MessageComponentType.BUTTON,
                label: locale.character,
                style: ButtonStyle.LINK,
                url: `${config.host}/dark?id=${encodeBase64Url(id)}`,
            }],
        }],
    });
}
