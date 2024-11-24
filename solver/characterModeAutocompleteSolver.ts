import { Interaction, InteractionResponseType } from "../deps.ts";
import { updateCharacterMode } from "../repository.ts";
import { locale } from "../i18n/locale.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { CharacterMode } from "../character.ts";
import { colors, isStoryteller } from "../utils.ts";

export async function characterModeAutocompleteSolver(
    interaction: Interaction,
    input: {
        mode: string,
        character?: {
            value: string;
            focused: boolean;
        };
    },
) {
    if (input.character && !(await searchCharacter(interaction, input.character))) {
        return;
    }

    if (isStoryteller(interaction)) {
        await updateCharacterMode(CharacterMode[CharacterMode[parseInt(input.mode)] as keyof typeof CharacterMode], input.character?.value);

        await interaction.respond({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            embeds: [{
              title: input.character ? locale.storytellerChangeCharacterMode : locale.storytellerChangeAllCharacterMode,
              color: colors.gray,
            }],
          });
    }
}
