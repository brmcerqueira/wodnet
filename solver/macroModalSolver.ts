import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle, getMacro, saveMacro } from "../repository.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors } from "../utils.ts";
import { MacroTranspiler } from "../macroTranspiler.ts";

export async function macroModalSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const messageId = input.context[0];

  const macro = (await getMacro(messageId))!;

  macro.buttons = input.fields.buttons.split("\n");
  macro.code = input.fields.code;

  const transpiler = new MacroTranspiler(input.fields.code);

  const diagnostics = transpiler.diagnostics;

  if (diagnostics.length > 0) {
    await saveMacro(macro);

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.commands.macro.error,
        description: diagnostics.join("\n"),
        color: colors.red,
      }],
      ephemeral: true,
    });
  } else {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.commands.macro.saved,
        color: colors.green,
      }],
      ephemeral: true,
    });

    macro.transpiled = transpiler.transpiled;

    await saveMacro(macro);

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
  }
}
