import {
  ApplicationCommandChoice,
  Interaction,
  InteractionResponseType,
} from "../deps.ts";
import { actions } from "../actions.ts";
import { Chronicle } from "../repository.ts";
import { locale } from "../i18n/locale.ts";
import { InteractionResponseError } from "../utils.ts";
import { sendRoll } from "../sendRoll.ts";

export async function actionAutocompleteSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    action: {
      value?: string;
      focused: boolean;
    };
  },
) {
  if (input.action.focused) {
    const term = input.action.value?.toLowerCase();

    const choices: ApplicationCommandChoice[] = [];

    for (let index = 0; index < actions.length; index++) {
      if (choices.length == 25) {
        break;
      } else {
        const name = locale.actions.length > index
          ? locale.actions[index]
          : index.toString();
        if (
          term === undefined || term === "" ||
          name.toLowerCase().indexOf(term) > -1
        ) {
          choices.push({
            value: index.toString(),
            name: name.substring(0, 100),
          });
        }
      }
    }

    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices,
    });
  } else {
    const character = await chronicle.getCharacterByUserId(interaction.user.id);

    if (!character) {
      throw new InteractionResponseError(locale.notFound);
    }

    const index = parseInt(input.action.value!);
    const result = actions[index](character);
    await sendRoll(
      interaction,
      chronicle,
      result.dices,
      character.hungerOrRage,
      result.difficulty,
      result.modifier,
      locale.actions[index],
      character,
    );
  }
}
