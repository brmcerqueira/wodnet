import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle, getMacro, saveMacro } from "../repository.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
  ts,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors } from "../utils.ts";
import { MacroTranspiler } from "../macroTranspiler.ts";
import { logger } from "../logger.ts";

export async function macroModalSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const transpiler = new MacroTranspiler(input.fields.code);

/*  const diagnostics = transpiler.diagnostics;

  if (diagnostics.length > 0) {
    diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      const { line, character } =
        diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start!) ?? {};
      logger.error(
        `file: ${diagnostic.file?.fileName}, line: ${line}, column: ${character} -> ${message}`,
      );
    });
  } else {*/
    const messageId = input.context[0];

    const macro = (await getMacro(messageId))!;
  
    macro.buttons = input.fields.buttons.split("\n");
    macro.code = input.fields.code;
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

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.commands.macro.saved,
        color: colors.green,
      }],
      ephemeral: true,
    });
  //}
}
