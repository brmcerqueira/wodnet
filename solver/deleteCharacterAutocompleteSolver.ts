import { Chronicle } from "../chronicle.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { colors, InteractionResponseError } from "../utils.ts";

export async function deleteCharacterAutocompleteSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    character: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (await searchCharacter(interaction, chronicle, input.character)) {
    if ((await chronicle.storyteller()) == interaction.user.id) {
      await chronicle.deleteCharacter(input.character.value);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerDeleteCharacter,
          color: colors.red,
        }],
      });
    }
    else {
      throw new InteractionResponseError(locale.unauthorized);
    }
  }
}
