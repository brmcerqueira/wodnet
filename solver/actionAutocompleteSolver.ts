import { ApplicationCommandChoice, Interaction, InteractionResponseType } from "../deps.ts";
import { keys } from "../utils.ts";
import { sendRoll } from "../sendRoll.ts";
import { actions } from "../actions.ts";
import { Chronicle } from "../chronicle.ts";

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

    for (const key in actions) {
      if (choices.length == 25) {
        break;
      } else if (term === undefined || term === "" || (key as string).toLowerCase().indexOf(term) > -1) {
        choices.push({
          value: key,
          name: key as string,
        })
      }
    }

    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: choices,
    });
  } else {
    const character = await chronicle.getCharacterByUserId(interaction.user.id);
    if (character) {
      const result = actions[input.action.value!](character);
      await sendRoll(
        chronicle,
        async (m) => {
          await interaction.respond({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            content: m.content,
            embeds: m.embeds,
            components: m.components,
          });
        },
        interaction.user.id,
        result.dices,
        character.hunger,
        result.difficulty,
        result.modifier,
        input.action.value,
        character
      );
    }
  }
}