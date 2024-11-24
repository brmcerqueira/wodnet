import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { deleteCharacter } from "../repository.ts";
import { colors, isStoryteller } from "../utils.ts";

export async function deleteCharacterAutocompleteSolver(
  interaction: Interaction,
  input: {
    character: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (await searchCharacter(interaction, input.character)) {
    if (isStoryteller(interaction)) {
      await deleteCharacter(input.character.value);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerDeleteCharacter,
          color: colors.red,
        }],
      });
    }
  }
}