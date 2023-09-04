import {
ButtonStyle,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  MessageComponentType,
  SelectComponentOption,
} from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import * as tags from "../../tags.ts";
import * as kanka from "../../kanka.ts";
import { isStoryteller } from "../isStoryteller.ts";
import { config } from "../../config.ts";
import { get } from "../../characterManager.ts";

export async function setCurrentCharacterSolver(
  interaction: Interaction,
) {
  if (await isStoryteller(interaction)) {
    await interaction.defer();

    const kankaTags = await kanka.getTagsByName(
      config.campaignId,
      tags.Player.name,
    );

    if (kankaTags.data && kankaTags.data.length > 0) {
      const tag = kankaTags.data[0];
      
      const options: SelectComponentOption[] = [];

      for (let index = 0; index < tag.entities.length; index++) {
        const id = tag.entities[index];
        const character = await get(config.campaignId, id);
        options.push({
          value: id.toString(),
          label: character.name,
        });
      }

      await interaction.editResponse({
        content: locale.storytellerChangeCurrentCharacter.name,
        components: [
          {
            type: MessageComponentType.ACTION_ROW,
            components: [
              {
                type: MessageComponentType.SELECT,
                customID: "entityId",
                options: options,
                placeholder: locale.storytellerChangeCurrentCharacter.placeholder,
              },
            ],
          },
        ],
      });
    }
  }
}
