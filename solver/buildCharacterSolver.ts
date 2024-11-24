import { Character, CharacterMode } from "../character.ts";
import { config } from "../config.ts";
import { Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { Solver } from "../commands/common.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../chronicle.ts";

export async function getOrBuildCharacterId(interaction: Interaction, chronicle: Chronicle): Promise<string> {
  let id: string | null | undefined;

  if (config.storytellerId == interaction.user.id) {
    id = await chronicle.currentCharacter();
    if (id == null) {
      id = crypto.randomUUID();
      chronicle.setCurrentCharacter(id);
    }
  } else {
    id = interaction.user.id;
  }

  return id!;
}

export function buildCharacterSolver<T>(
  parse: (character: Character, input: T) => number, onlyStoryteller?: boolean
): Solver {
  return async (interaction: Interaction, chronicle: Chronicle, input: T) => {
    const isStoryteller = interaction.user.id == config.storytellerId;
    if (!onlyStoryteller || isStoryteller) {
      const id = await getOrBuildCharacterId(interaction, chronicle);

      const character = await chronicle.getCharacter(id);

      if (!isStoryteller && character.mode == CharacterMode.Closed) {
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

      await chronicle.updateCharacter(character);

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
    else {
      throw new InteractionResponseError(locale.unauthorized);
    }
  };
}