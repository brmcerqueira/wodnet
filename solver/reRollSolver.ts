import { reRoll } from "../diceRollManager.ts";
import { Interaction, InteractionResponseType, sprintf } from "../deps.ts";
import { buildRollMessage } from "../buildRollMessage.ts";
import { locale } from "../i18n/locale.ts";
import { Chronicle } from "../repository.ts";
import { InteractionResponseError } from "../utils.ts";

export async function reRollSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  dices: number,
) {
  const roll = await chronicle.getLastRollByUserId(interaction.user.id);
  if (roll && (roll.result.amount - roll.result.hunger) > 0) {
    const character = await chronicle.getCharacterByUserId(interaction.user.id);

    await interaction.respond({
      type: InteractionResponseType.UPDATE_MESSAGE,
      content: roll.content,
      components: [],
    });

    const message = await buildRollMessage(
      reRoll(roll.result, dices),
      interaction.user.id,
      sprintf(locale.reRollHelperText, dices),
      character,
    );

    interaction.message!.reply({
      content: message.content,
      embeds: [message.embed],
    });

    if (character) {
      character.willpower.superficial += 1;
      chronicle.updateCharacter(character);
    }
  } else {
    throw new InteractionResponseError(locale.unauthorized);
  }
}
