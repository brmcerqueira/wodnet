import { Interaction, InteractionResponseType } from "../deps.ts";
import { colors } from "../utils.ts";
import { Chronicle } from "../repository.ts";

export async function panelSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: { title: string; description?: string },
) {
  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: input.title,
      description: input.description,
      color: colors.gray,
    }],
  });
}
