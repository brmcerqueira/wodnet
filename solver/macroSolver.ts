import { characterLinkButton } from "../buttons/module.ts";
import { Chronicle } from "../chronicle.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";

export async function macroSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { message: Message, button: string },
) {
  if (input.button == locale.commands.macro.add) {
    await input.message.edit({
        components: [{
          type: MessageComponentType.ACTION_ROW,
          components: [
            characterLinkButton(chronicle.id, ""),
          ],
        }],
      })
    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        content: "test",
        ephemeral: true
    });
  }
}
