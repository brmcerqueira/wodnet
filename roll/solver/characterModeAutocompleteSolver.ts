import { Interaction, InteractionResponseType } from "../../deps.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { get } from "../../characterManager.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";
import { searchCharacter } from "../searchCharacter.ts";

export async function characterModeAutocompleteSolver(
    interaction: Interaction,
    values: {
        character: {
            value: string;
            focused: boolean;
        };
    },
) {
    if (await isStoryteller(interaction)) {
        if (await searchCharacter(interaction, values.character)) {
            const id = values.character.value != ""
                ? values.character.value
                : null;
            data.setCurrentCharacter(id);
            const character = id != null ? await get(id) : null;
            await interaction.respond({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                embeds: [{
                    title: locale.storytellerChangeCurrentCharacter,
                    color: colors.Gray,
                    fields: [{
                        name: locale.character,
                        value: `**${character?.name || locale.none}**`,
                        inline: true,
                    }],
                    thumbnail: character
                        ? {
                            url: character.image,
                        }
                        : undefined,
                }],
            });
        }
    }
}
