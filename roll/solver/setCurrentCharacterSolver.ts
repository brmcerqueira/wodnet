import { get } from "../../characterManager.ts";
import { config } from "../../config.ts";
import { Interaction, InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as colors from "../colors.ts";
import * as data from "../data.ts";
import { isStoryteller } from "../isStoryteller.ts";

export async function setCurrentCharacterSolver(interaction: Interaction, entityId: number) {
    if (await isStoryteller(interaction)) {
        data.setCurrentCharacter(entityId);
        await interaction.respond({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          embeds: [{
            title: locale.storytellerChangeCurrentCharacter.chosen,
            color: colors.Gray,
            fields: [{
              name: locale.character,
              value: `**${(await get(config.campaignId, entityId)).name}**`,
              inline: true,
            }],
          }],
        });
      }
}