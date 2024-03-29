import { Interaction, InteractionResponseType } from "../../deps.ts";
import { getByDiscordId, getFromCache } from "../../characterManager.ts";
import { config } from "../../config.ts";
import { keys } from "../../utils.ts";
import { sendRoll } from "../sendRoll.ts";
import * as data from "../data.ts";
import { actions } from "../actions.ts";

export async function actionAutocompleteSolver(
  interaction: Interaction,
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
    const character = config.storytellerId == interaction.user.id
      ? (data.currentCharacter
        ? getFromCache(data.currentCharacter!)
        : undefined)
      : getByDiscordId(interaction.user.id);
    if (character) {
      const result = actions[values.action.value](character);
      await sendRoll(
        async (m) => {
          await interaction.respond({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            content: m.content,
            embeds: m.embeds,
            components: m.components,
          });
        },
        interaction.guild!.id,
        interaction.user.id,
        result.dices,
        character.hunger,
        result.difficulty,
        result.modifier,
        values.action.value,
      );
    }
  }
}
