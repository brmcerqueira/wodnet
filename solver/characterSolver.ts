import {
  ActionRowComponent,
  ButtonStyle,
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { buttonCharacterLink, colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";
import { CharacterMode } from "../character.ts";

type CharacterInputType = {
  value: string;
  focused: boolean;
}

type InputType = {
  choose?: {
    character: CharacterInputType;
    link?: boolean;
    button?: boolean;
  },
  mode?: {
    character?: CharacterInputType;
    value: string;
  },
  remove?: {
    character: CharacterInputType;
  }
  clear?: boolean
};

export function extractCharacterChooseButtonInput(text: string): InputType {
  const array = text.split(":");
  return {
    choose: {
      character: {
        value: array[1],
        focused: false,
      },
      link: array[2] === "true",
      button: true
    }
  };
}

export async function characterSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: InputType,
) {
  if (await chronicle.isStoryteller(interaction.user.id)) {
    const characterInput = input.choose?.character || input.mode?.character || input.remove?.character;

    if (characterInput && characterInput.focused) {
      await interaction.respond({
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        choices: (await chronicle.getCharactersByTerm(characterInput.value)).map((c) => {
          return {
            value: c.id,
            name: c.name,
          };
        }),
      });

      return;
    }

    if (input.choose) {
      const id = input.choose.character.value != "" ? input.choose.character.value : null;
      await chronicle.setCurrentCharacter(id);
      const character = id != null ? await chronicle.getCharacter(id, true) : null;
  
      const components: ActionRowComponent[] | undefined = character
        ? [{
          type: MessageComponentType.ACTION_ROW,
          components: [{
            type: MessageComponentType.BUTTON,
            label: locale.select,
            style: ButtonStyle.GREEN,
            customID: `select:${character.id}:${input.choose.link ? true : false}`,
          }],
        }]
        : undefined;
  
      if (components && input.choose.link) {
        components[0].components.push(buttonCharacterLink(chronicle.id, id!));
      }
  
      await interaction.respond({
        type: input.choose.button ? InteractionResponseType.UPDATE_MESSAGE : InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
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
    else if (input.mode) {
      await chronicle.updateCharacterMode(
        CharacterMode[
          CharacterMode[parseInt(input.mode.value)] as keyof typeof CharacterMode
        ],
        input.mode.character?.value,
      );

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: input.mode.character
            ? locale.storytellerChangeCharacterMode
            : locale.storytellerChangeAllCharacterMode,
          color: colors.gray,
        }],
      });
    }
    else if (input.remove) {
      await chronicle.deleteCharacter(input.remove.character.value);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerDeleteCharacter,
          color: colors.red,
        }],
      });
    }
    else if (input.clear) {
      await chronicle.setCurrentCharacter(null);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.storytellerClearCurrentCharacter,
          color: colors.red,
        }],
      });
    }
  }
  else {
    throw new InteractionResponseError(locale.unauthorized);
  }
}
