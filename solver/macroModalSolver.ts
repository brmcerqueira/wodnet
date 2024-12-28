import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle, getMacro, saveMacro } from "../repository.ts";
import {
  ButtonComponent,
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentData,
  MessageComponentType,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, jsonRelaxedKeysParse } from "../utils.ts";
import { Macro, MacroButton, MacroTranspiler } from "../macroTranspiler.ts";
import { logger } from "../logger.ts";

async function updateMacro(macro: Macro, message: Message) {
  async function macroError(description: string) {
    await message.edit({
      embeds: [...macro.message.embeds, {
        title: locale.commands.macro.error,
        description: description,
        color: colors.red,
      }],
    });
  }

  try {
    const transpiler = new MacroTranspiler(macro.code!);

    const diagnostics = transpiler.diagnostics;

    if (diagnostics.length > 0) {
      await macroError(diagnostics.join("\n"));
    } else {
      macro.transpiled = transpiler.transpiled;

      await saveMacro(macro);

      const components: MessageComponentData[] = [];
      let buttonComponents: ButtonComponent[] | undefined;

      function pushActionRow() {
        buttonComponents = [];
        components.push({
          type: MessageComponentType.ACTION_ROW,
          components: buttonComponents,
        });
      }

      pushActionRow();

      for (let index = 0; index < macro.buttons!.length; index++) {
        if (buttonComponents!.length == 5) {
          pushActionRow();
        }

        const button = macro.buttons![index];

        buttonComponents!.push(macroButton(
          {
            label: button.label,
            style: button.style,
            emoji: button.emoji,
          },
          message.id,
          index,
        ));
      }

      await message.edit({
        embeds: macro.message.embeds,
        components,
      });
    }
  } catch (error) {
    logger.error(error);
    if (error instanceof Error) {
      await macroError(error.message);
    }
  }
}

export async function macroModalSolver(
  interaction: Interaction,
  _chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const macro = (await getMacro(input.context[0]))!;

  macro.buttons = input.fields.buttons.split("\n").slice(undefined, 25).map(
    (text) => {
      const result: MacroButton = {};

      const index = text.indexOf("{");
      if (index > -1) {
        result.label = text.substring(0, index).trim();
        try {
          const data = jsonRelaxedKeysParse<any>(text.slice(index));
          const style = Number(data.style);
          if (!isNaN(style) && style >= 1 && style <= 4) {
            result.style = style;
          }

          if (data.emoji) {
            result.emoji = {
              id: data.emoji.id !== undefined
                ? String(data.emoji.id)
                : undefined,
              name: data.emoji.name !== undefined
                ? String(data.emoji.name)
                : undefined,
              animated: data.emoji.animated !== undefined
                ? data.emoji.animated === true
                : undefined,
            };
          }

          result.value = data.value;
        } catch (_error) {}
      } else {
        result.label = text.trim();
      }

      return result;
    },
  );

  macro.code = input.fields.code;
  macro.transpiled = undefined;

  await saveMacro(macro);

  const message = new Message(
    interaction.client,
    structuredClone(macro.message),
    interaction.channel!,
    new User(interaction.client, macro.message.author),
  );

  await message.edit({
    embeds: [...macro.message.embeds, {
      title: locale.commands.macro.loading,
      color: colors.blue,
    }],
    components: [],
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
