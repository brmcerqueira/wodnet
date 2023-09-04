import { Interaction, InteractionResponseType } from "../../deps.ts";
import { getByDiscordId, getFromCache } from "../../characterManager.ts";
import { config } from "../../config.ts";
import * as data from "../data.ts";
import { keys } from "../../utils.ts";
import { dicePools } from "../dicePools.ts";
import { sendRoll } from "../sendRoll.ts";

export async function dicePoolAutocompleteSolver(
  interaction: Interaction,
  values: {
    dicePool: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (values.dicePool.focused) {
    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: keys(dicePools).filter((key) =>
        (key as string).toLowerCase().indexOf(values.dicePool.value.toLowerCase()) > -1
      ).map((key) => {
        return {
          value: key as string,
          name: key as string,
        };
      }),
    });
  } else {
    const character = config.storytellerId == interaction.user.id
      ? (data.currentCharacter ? getFromCache(data.currentCharacter!) : undefined)
      : getByDiscordId(interaction.user.id);
    if (character) {
      const result = dicePools[values.dicePool.value](character);
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
        values.dicePool.value,
      );
    }
  }
}
