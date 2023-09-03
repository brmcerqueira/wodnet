import { Interaction,InteractionApplicationCommandData,InteractionResponseType } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import { sendRoll } from "../sendRoll.ts";

export async function rollSolver(interaction: Interaction, data: InteractionApplicationCommandData) {
    let dices = 0;
    let hunger = 0;
    let difficulty = 1;
    let description: string | undefined = undefined;
  
    for(const option of data.options) {
      switch(option.name) {
        case locale.commands.roll.dices.name:
          dices = parseInt(option.value);
          break;
        case locale.commands.roll.hunger.name:
          hunger = parseInt(option.value);
          break;
        case locale.commands.roll.difficulty.name:
          difficulty = parseInt(option.value);
          break;
        case locale.commands.roll.descriptionField.name:
          description = option.value;
          break;
      }
    }
  
    await sendRoll(
      async (m) => {
        await interaction.respond({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          content: m.content,
          embeds: m.embeds,
          components: m.components,
        });
      },
      interaction.guild!.id,
      interaction.user.id,
      dices,
      hunger,
      difficulty,
      0,
      description
    );
  }