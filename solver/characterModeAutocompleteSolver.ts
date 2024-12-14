import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { CharacterMode } from "../character.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function characterModeAutocompleteSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    mode: string;
    character?: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (
    input.character &&
    !(await searchCharacter(interaction, chronicle, input.character))
  ) {
    return;
  }

  if (await chronicle.isStoryteller(interaction.user.id)) {
    await chronicle.updateCharacterMode(
      CharacterMode[
        CharacterMode[parseInt(input.mode)] as keyof typeof CharacterMode
      ],
      input.character?.value,
    );

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: input.character
          ? locale.storytellerChangeCharacterMode
          : locale.storytellerChangeAllCharacterMode,
        color: colors.gray,
      }],
    });
  } else {
    throw new InteractionResponseError(locale.unauthorized);
  }
}
