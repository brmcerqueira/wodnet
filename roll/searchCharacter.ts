import { getCharactersByTerm } from "../repository.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";

export async function searchCharacter(interaction: Interaction, input: {
  value: string;
  focused: boolean;
}, none?: boolean) {
  if (input.focused) {
    const array = (await getCharactersByTerm(input.value)).map((c) => {
      return {
        value: c.id,
        name: c.name,
      };
    });

    if (none) {
      array.unshift({
        value: "",
        name: locale.none,
      });
    }

    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: array,
    });

    return false;
  }

  return true;
}
