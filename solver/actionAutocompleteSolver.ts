import { ApplicationCommandChoice, Interaction, InteractionResponseType } from "../deps.ts";
import { keys } from "../utils.ts";
import { sendRoll } from "../sendRoll.ts";
import { actions } from "../actions.ts";
import { Chronicle } from "../chronicle.ts";
import { locale } from "../i18n/locale.ts";

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
        const name = locale.actions.length > index ? locale.actions[index] : index.toString();
        if (term === undefined || term === "" || name.toLowerCase().indexOf(term) > -1) {
          choices.push({
            value: index.toString(),
            name: name.substring(0, 101),
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
    if (character) {
      const result = actions[parseInt(input.action.value!)](character);
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