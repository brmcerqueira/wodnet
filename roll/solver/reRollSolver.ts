import { reRoll } from "../diceRollManager.ts";
import * as data from "../data.ts";
import { Interaction, InteractionMessageComponentData, InteractionResponseType, sprintf } from "../../deps.ts";
import { buildRollMessage } from "../buildRollMessage.ts";
import { locale } from "../../i18n/locale.ts";

export async function reRollSolver(interaction: Interaction) {
    const roll = data.lastRolls[interaction.user.id];
    if (roll) {
        delete data.lastRolls[interaction.user.id];
        if ((roll.result.amount - roll.result.hunger) > 0) {
            await interaction.respond({
                type: InteractionResponseType.UPDATE_MESSAGE,
                embeds: [roll.embed],
                components: []
            });

            const data = interaction.data as InteractionMessageComponentData;
            const dices = parseInt(data.custom_id);

            const message = buildRollMessage(reRoll(roll.result, dices), interaction.guild!.id, 
                interaction.user.id, sprintf(locale.reRollHelperText, dices));

            await interaction.message!.channel.send({
                content: message.content,
                embeds: [message.embed]
            });
        }
    }
}