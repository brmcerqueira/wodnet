import { reRoll } from "../diceRollManager.ts";
import * as data from "../data.ts";
import { Interaction, InteractionResponseType, sprintf } from "../deps.ts";
import { buildRollMessage } from "../buildRollMessage.ts";
import { locale } from "../i18n/locale.ts";
import { Chronicle } from "../chronicle.ts";

export async function reRollSolver(interaction: Interaction, chronicle: Chronicle, dices: number) {
  const roll = data.lastRolls[interaction.user.id];
  if (roll) {
    delete data.lastRolls[interaction.user.id];
    if ((roll.result.amount - roll.result.hunger) > 0) {
      await interaction.respond({
        type: InteractionResponseType.UPDATE_MESSAGE,
        embeds: [roll.embed],
        components: [],
      });

      const message = buildRollMessage(
        chronicle,
        reRoll(roll.result, dices),
        interaction.guild!.id,
        interaction.user.id,
        sprintf(locale.reRollHelperText, dices),
      );

      await interaction.message!.channel.send({
        content: message.content,
        embeds: [message.embed],
      });
    }
  }
}
