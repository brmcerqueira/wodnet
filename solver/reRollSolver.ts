import { reRoll } from "../diceRollManager.ts";
import { Interaction, InteractionResponseType, sprintf } from "../deps.ts";
import { buildRollMessage } from "../buildRollMessage.ts";
import { locale } from "../i18n/locale.ts";
import { Chronicle } from "../chronicle.ts";

export async function reRollSolver(interaction: Interaction, chronicle: Chronicle, dices: number) {
  const roll = await chronicle.getLastRollByUserId(interaction.user.id);
  if (roll) {
    if ((roll.result.amount - roll.result.hunger) > 0) {
      await interaction.respond({
        type: InteractionResponseType.UPDATE_MESSAGE,
        embeds: [roll.embed],
        components: [],
      });

      const message = await buildRollMessage(
        reRoll(roll.result, dices),
        interaction.user.id,
        sprintf(locale.reRollHelperText, dices),
        await chronicle.getCharacterByUserId(interaction.user.id)
      );

      await interaction.message!.channel.send({
        content: message.content,
        embeds: [message.embed],
      });
    }
  }
}
