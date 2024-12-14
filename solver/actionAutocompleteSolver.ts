import { Interaction, InteractionResponseType } from "../deps.ts";
import { keys } from "../utils.ts";
import { sendRoll } from "../sendRoll.ts";
import { actions } from "../actions.ts";
import { Chronicle } from "../chronicle.ts";

export async function actionAutocompleteSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  values: {
    action: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (values.action.focused) {
    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: keys(actions).filter((key) =>
        (key as string).toLowerCase().indexOf(
          values.action.value.toLowerCase(),
        ) > -1
      ).map((key) => {
        return {
          value: key as string,
          name: key as string,
        };
      }),
    });
  } else {
    const character = await chronicle.getCharacterByUserId(interaction.user.id);
    if (character) {
      const result = actions[values.action.value](character);
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
        values.action.value,
        character
      );
    }
  }
}