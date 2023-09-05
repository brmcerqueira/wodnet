import { Interaction, InteractionResponseType } from "../../deps.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { get, search } from "../../characterManager.ts";
import { config } from "../../config.ts";
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
        choices: search(values.character.value).map((c) => {
          return {
            value: c.id.toString(),
            name: c.name,
          };
        }),
      });
    } else {
      const id = parseInt(values.character.value);
      data.setCurrentCharacter(id);
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerChangeCurrentCharacter,
          color: colors.Gray,
          fields: [{
            name: locale.character,
            value: `**${(await get(config.campaignId, id)).name}**`,
            inline: true,
          }],
        }],
      });
    }
  }
}
