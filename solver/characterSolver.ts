import {
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { CharacterMode } from "../character.ts";
import {
  characterLinkButton,
  CharacterSolverInput,
  selectButton,
} from "../custom/module.ts";

export async function characterSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: CharacterSolverInput,
) {
  if (!(await chronicle.isStoryteller(interaction.user.id))) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  const characterInput = input.choose?.character || input.mode?.character ||
    input.remove?.character;

  if (characterInput && characterInput.focused) {
    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: await chronicle.getCharacterChoicesByTerm(
        characterInput.value,
      ),
    });

    return;
  }

  if (input.choose) {
    const id = input.choose.character.value != ""
      ? input.choose.character.value
      : null;
    await chronicle.setCurrentCharacter(id);
    const character = id != null
      ? await chronicle.getCharacter(id, true)
      : null;

    if (input.choose.isSelect) {
      await interaction.respond({
        type: InteractionResponseType.UPDATE_MESSAGE,
      });
    } else {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: character?.name || locale.none,
          color: colors.gray,
          image: character
            ? {
              url: character.image,
            }
            : undefined,
        }],
        components: character && input.choose.buttons
          ? [{
            type: MessageComponentType.ACTION_ROW,
            components: [
              selectButton(
                { label: locale.select },
                character.id,
              ),
              characterLinkButton(chronicle.id, id!),
            ],
          }]
          : undefined,
      });
    }
  } else if (input.mode) {
    await chronicle.updateCharacterMode(
      CharacterMode[
        CharacterMode[
          parseInt(input.mode.value)
        ] as keyof typeof CharacterMode
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
  } else if (input.remove) {
    await chronicle.deleteCharacter(input.remove.character.value);

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.storytellerDeleteCharacter,
        color: colors.red,
      }],
    });
  } else if (input.clear) {
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
