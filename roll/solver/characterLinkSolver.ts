import { config } from "../../config.ts";
import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";

export async function characterLinkSolver(interaction: Interaction) {
    
    const id = config.storytellerId == interaction.user.id && data.currentCharacter 
    ? data.currentCharacter : interaction.user.id;

    `${config.host}/dark?id=${id}`
    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
            title: locale.storytellerChangeDifficulty,
            color: colors.Gray,
            fields: [{
                name: locale.difficulty,
                value: `**${data.difficulty}**`,
                inline: true,
            }],
        }],
    });
}
