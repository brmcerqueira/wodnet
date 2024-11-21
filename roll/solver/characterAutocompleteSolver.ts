import { Interaction, InteractionResponseType } from "../../deps.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { get } from "../../characterManager.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";
import { searchCharacter } from "../searchCharacter.ts";

export async function characterAutocompleteSolver(
  interaction: Interaction,
  input: {
    character: {
      value: string;
      focused: boolean;
    };
  },
) {
  if (isStoryteller(interaction)) {
    if (await searchCharacter(interaction, input.character, true)) {
      const id = input.character.value != "" ? input.character.value : null;
      data.setCurrentCharacter(id);
      const character = id != null ? await get(id) : null;
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerChangeCurrentCharacter,
          color: colors.Gray,
          fields: [{
            name: locale.character,
            value: `**${character?.name || locale.none}**`,
            inline: true,
          }],
          image: character
            ? {
              url: character.image,
            }
            : undefined,
        }],
      });
    }
  }
}
