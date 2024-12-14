import {
  ActionRowComponent,
  ButtonStyle,
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { searchCharacter } from "../searchCharacter.ts";
import { buttonCharacterLink, colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

type InputType = {
  character: {
    value: string;
    focused: boolean;
  };
  link?: boolean;
  select?: boolean;
};

export function extractCharacterAutocompleteInput(text: string): InputType {
  const array = text.split(":");
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
  chronicle: Chronicle,
  input: InputType,
) {
  if (await searchCharacter(interaction, chronicle, input.character, true)) {
    if ((await chronicle.storyteller()) == interaction.user.id) {
      const id = input.character.value != "" ? input.character.value : null;
      await chronicle.setCurrentCharacter(id);
      const character = id != null ? await chronicle.getCharacter(id, true) : null;

      const components: ActionRowComponent[] | undefined = character
        ? [{
          type: MessageComponentType.ACTION_ROW,
          components: [{
            type: MessageComponentType.BUTTON,
            label: locale.select,
            style: ButtonStyle.GREEN,
            customID: `select:${character.id}:${input.link ? true : false}`,
          }],
        }]
        : undefined;

      if (components && input.link) {
        components[0].components.push(buttonCharacterLink(chronicle.id, id!));
      }

      await interaction.respond({
        type: input.select ? InteractionResponseType.UPDATE_MESSAGE : InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: character?.name || locale.none,
          color: colors.gray,
          image: character
            ? {
              url: character.image,
            }
            : undefined,
        }],
        components: components,
      });
    }
    else {
      throw new InteractionResponseError(locale.unauthorized);
    }
  }
}
