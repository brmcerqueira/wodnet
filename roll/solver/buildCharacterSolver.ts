import { Character, CharacterMode } from "../../character.ts";
import { get, update } from "../../characterManager.ts";
import { config } from "../../config.ts";
import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import { Solver } from "../commands/common.ts";
import * as data from "../data.ts";
import * as colors from "../colors.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { InteractionResponseError } from "../interactionResponseError.ts";

export function buildCharacterSolver<T>(
  parse: (character: Character, input: T) => number, onlyStoryteller?: boolean
): Solver {
  return async (interaction: Interaction, input: T) => {
    const storyteller = isStoryteller(interaction);
    if (!onlyStoryteller || storyteller) {
      let id = "";

      if (config.storytellerId == interaction.user.id) {
        if (data.currentCharacter == null) {
          data.setCurrentCharacter(crypto.randomUUID());
        }
        id = data.currentCharacter!;
      } else {
        id = interaction.user.id;
      }

      const character = await get(id, true);

      if (!storyteller && character.mode == CharacterMode.Closed) {
        throw new InteractionResponseError(locale.unauthorized);
      }

      if (character.name == "") {
        character.name = config.storytellerId == interaction.user.id
          ? `${interaction.member!.displayName} ${
            crypto.getRandomValues(new Int8Array(1))
          }`
          : interaction.member!.displayName;
      }

      if (character.image == "") {
        character.image = interaction.user.avatarURL();
      }

      const spent = parse(character, input);

      if (character.mode != CharacterMode.Opened) {
        character.experience.spent += spent;
      }

      await update(character);

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.characterUpdate,
          color: colors.Green,
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
