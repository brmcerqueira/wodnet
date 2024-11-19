import { Character } from "../../character.ts";
import { get, update } from "../../characterManager.ts";
import { config } from "../../config.ts";
import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import { Solver } from "../commands/common.ts";
import * as data from "../data.ts";
import * as colors from "../colors.ts";
import { logger } from "../../logger.ts";

export function buildCharacterSolver<T>(parse: (character: Character, input: T) => void): Solver {
    return async (interaction: Interaction, input: T) => {
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

      if (character.image == "") {
        character.image = interaction.user.avatarURL();
      }

      logger.info("get %v", JSON.stringify(character));

      parse(character, input);

      await update(id, character);

      logger.info("update %v", JSON.stringify(character));

      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: locale.characterUpdate,
          color: colors.Gray,
          fields: [{
            name: locale.character,
            value: `**${character.name}**`,
            inline: true,
          }],
        }],
      });
    };
  }