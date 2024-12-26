import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle } from "../chronicle.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors } from "../utils.ts";

export async function macroModalSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const messageId = input.context[0];
  const macro = (await chronicle.macro(messageId))!;

  macro.buttons = input.fields.buttons.split("\n");
  macro.code = input.fields.code;

  await chronicle.saveMacro(macro);

  const message = new Message(
    interaction.client,
    macro.message,
    interaction.channel!,
    new User(interaction.client, macro.message.author),
  );

  await message.edit({
    components: [{
      type: MessageComponentType.ACTION_ROW,
      components: macro.buttons.map((label, index) =>
        macroButton(
          {
            label: label,
          },
          messageId,
          index,
        )
      ),
    }],
  });

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.commands.macro.saved,
      color: colors.green,
    }],
    ephemeral: true,
  });
}
