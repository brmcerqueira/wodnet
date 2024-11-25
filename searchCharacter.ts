import { Chronicle } from "./chronicle.ts";
import { Interaction, InteractionResponseType } from "./deps.ts";
import { locale } from "./i18n/locale.ts";

export async function searchCharacter(interaction: Interaction, chronicle: Chronicle, input: {
  value: string;
  focused: boolean;
}, none?: boolean) {
  if (input.focused) {
    const array = (await chronicle.getCharactersByTerm(input.value)).map((c) => {
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
