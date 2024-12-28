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
import { Macro, MacroTranspiler } from "../macroTranspiler.ts";

async function updateMacro(macro: Macro, message: Message) {
  const transpiler = new MacroTranspiler(macro.code!);

  const diagnostics = transpiler.diagnostics;

  if (diagnostics.length > 0) {
    await message.edit({
      embeds: [...macro.message.embeds, {
        title: locale.commands.macro.error,
        description: diagnostics.join("\n"),
        color: colors.red,
      }]
    });
  } else {

    macro.transpiled = transpiler.transpiled;

    await saveMacro(macro);

    await message.edit({
      embeds: macro.message.embeds,
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: macro.buttons!.map((label, index) => macroButton(
          {
            label: label,
          },
          message.id,
          index
        )
        ),
      }],
    });
  }
}

export async function macroModalSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const macro = (await getMacro(input.context[0]))!;

  macro.buttons = input.fields.buttons.split("\n");
  macro.code = input.fields.code;
  macro.transpiled = undefined;

  await saveMacro(macro);

  const message = new Message(
    interaction.client,
    Object.assign({}, macro.message),
    interaction.channel!,
    new User(interaction.client, macro.message.author),
  );

  await message.edit({
    embeds: [...macro.message.embeds, {
      title: locale.commands.macro.loading,
      color: colors.gray,
    }]
  });

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: locale.commands.macro.saved,
      color: colors.green,
    }],
    ephemeral: true,
  });

  updateMacro(macro, message);
}