import { Interaction, InteractionResponseType } from "../../deps.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { deleteCharacter } from "../../characterManager.ts";

export async function deleteCharacterAutocompleteSolver(
  interaction: Interaction,
  input: {
    character: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (isStoryteller(interaction)) {
    if (await searchCharacter(interaction, input.character)) {
   
      await deleteCharacter(input.character.value);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerDeleteCharacter,
          color: colors.Red,
        }],
      });
    }
  }
}
