import { Character, CharacterMode } from "../character.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { Solver } from "../commands/module.ts";

export function buildCharacterUpdateSolver<T>(
  parse: (character: Character, input: T) => Promise<number> | number,
  silent: boolean,
  onlyStoryteller?: boolean,
): Solver {
  return async (interaction: Interaction, chronicle: Chronicle, input: T) => {
    const isStoryteller = await chronicle.isStoryteller(interaction.user.id);

    if (onlyStoryteller && !isStoryteller) {
      throw new InteractionResponseError(locale.unauthorized);
    }

    const id = await chronicle.getOrCreateCharacterId(interaction.user.id);

    const character = await chronicle.getCharacter(id);

    const spent = await parse(character, input);

    if (
      !isStoryteller && character.mode == CharacterMode.Closed && spent != 0
    ) {
      throw new InteractionResponseError(locale.unauthorized);
    }

    if (character.name == "") {
      character.name = isStoryteller
        ? `${interaction.member!.displayName} ${
          crypto.getRandomValues(new Int8Array(1))
        }`
        : interaction.member!.displayName;
    }

    if (character.mode != CharacterMode.Opened) {
      character.experience.spent += spent;
    }

    await chronicle.updateCharacter(character);

    if (silent) {
      await interaction.respond({
        type: InteractionResponseType.UPDATE_MESSAGE,
      });
    } else {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.characterUpdate,
          color: colors.green,
          fields: [{
            name: locale.character,
            value: character.name,
            inline: true,
          }],
        }],
      });
    }
  };
}
