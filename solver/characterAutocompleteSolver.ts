import {
  ActionRowComponent,
  ButtonStyle,
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { getCharacter } from "../repository.ts";
import { locale } from "../i18n/locale.ts";
import * as data from "../data.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { buttonCharacterLink } from "./characterLinkSolver.ts";
import { colors, isStoryteller } from "../utils.ts";

type InputType = {
  character: {
    value: string;
    focused: boolean;
  };
  link?: boolean;
  select?: boolean;
};

export function extractCharacterAutocompleteInput(text: string): InputType {
  const array = text.split("-");
  return {
    character: {
      value: array[1],
      focused: false,
    },
    link: Boolean(array[2]),
    select: true
  };
}

export async function characterAutocompleteSolver(
  interaction: Interaction,
  input: InputType,
) {
  if (await searchCharacter(interaction, input.character, true)) {
    if (isStoryteller(interaction)) {
      const id = input.character.value != "" ? input.character.value : null;
      data.setCurrentCharacter(id);
      const character = id != null ? await getCharacter(id, true) : null;

      const components: ActionRowComponent[] | undefined = character
        ? [{
          type: MessageComponentType.ACTION_ROW,
          components: [{
            type: MessageComponentType.BUTTON,
            label: locale.select,
            style: ButtonStyle.GREEN,
            customID: `select-${character.id}-${input.link ? true : false}`,
          }],
        }]
        : undefined;

      if (components && input.link) {
        components[0].components.push(buttonCharacterLink(id!));
      }

      await interaction.respond({
        type: input.select ? InteractionResponseType.UPDATE_MESSAGE : InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerChangeCurrentCharacter,
          color: colors.gray,
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
        components: components,
      });
    }
  }
}
