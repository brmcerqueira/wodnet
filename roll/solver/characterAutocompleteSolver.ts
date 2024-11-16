import { Interaction, InteractionResponseType } from "../../deps.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { get, search } from "../../characterManager.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";

export async function characterAutocompleteSolver(
  interaction: Interaction,
  values: {
    character: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (await isStoryteller(interaction)) {
    if (values.character.focused) {
      await interaction.respond({
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        choices: (await search(values.character.value)).map(c => {
          return {
            value: c.id,
            name: c.name,
          };
        }),
      });
    } else {
      data.setCurrentCharacter(values.character.value);
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerChangeCurrentCharacter,
          color: colors.Gray,
          fields: [{
            name: locale.character,
            value: `**${(await get(values.character.value)).name}**`,
            inline: true,
          }],
        }],
      });
    }
  }
}
