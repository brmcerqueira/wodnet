// deno-lint-ignore-file no-explicit-any
import { macroButton, ModalInput } from "../custom/module.ts";
import { Chronicle } from "../repository.ts";
import {
  ButtonComponent,
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentData,
  MessageComponentEmoji,
  MessageComponentType,
  swc,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, jsonRelaxedKeysParse } from "../utils.ts";
import { Macro, MacroButton } from "../macro.ts";
import { logger } from "../logger.ts";

async function updateMacro(
  chronicle: Chronicle,
  macro: Macro,
  message: Message,
) {
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
    const ast = await swc.parse(
      `import { ActionResult, Character, CharacterMode } from "./character.ts";declare const character: Character;declare const result: ActionResult;declare const button: any;
      ${macro.code!}`,
      {
        syntax: "typescript",
        comments: false,
        script: true,
        target: "esnext",
      },
    );

    ast.body = ast.body.filter((node) => {
      if (node.type === "ImportDeclaration") return false;
      if (
        node.type === "ExportDeclaration" &&
        node.declaration == null
      ) return false;
      if (
        node.type === "ExportNamedDeclaration" &&
        node.specifiers.length === 0 &&
        node.source == null
      ) return false;
      return true;
    });

    macro.transpiled = (await swc.transform(ast, {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: false,
          decorators: false,
          dynamicImport: false,
        },
        target: "es5",
        loose: false,
        externalHelpers: false,
        keepClassNames: false,
      },
      isModule: false,
    })).code;

    logger.info("Code: %v", macro.transpiled);

    await chronicle.saveMacro(macro);

    const components: MessageComponentData[] = [];
    let buttonComponents: ButtonComponent[] | undefined;

    // deno-lint-ignore no-inner-declarations
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

      let emoji: MessageComponentEmoji | undefined;

      if (button.emoji) {
        if (typeof button.emoji === "string") {
          emoji = {
            name: button.emoji,
          };
        } else {
          emoji = {
            id: button.emoji.id,
            name: button.emoji.name,
          };
        }
      }

      buttonComponents!.push(macroButton(
        {
          label: button.label,
          style: button.style,
          emoji: emoji,
        },
        message.id,
        index,
      ));
    }

    await message.edit({
      embeds: macro.message.embeds,
      components,
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof Error) {
      await macroError(error.message);
    }
  }
}

export async function macroModalSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: ModalInput<{ buttons: string; code: string }>,
) {
  const macro = (await chronicle.macro(input.context[0]))!;

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
            if (typeof data.emoji === "string") {
              result.emoji = data.emoji;
            } else if (
              data.emoji.id && data.emoji.name &&
              typeof data.emoji.id === "string" &&
              typeof data.emoji.name === "string"
            ) {
              result.emoji = {
                id: data.emoji.id,
                name: data.emoji.name,
              };
            } else if (data.emoji.name && typeof data.emoji.name === "string") {
              result.emoji = data.emoji.name;
            }
          }

          result.value = data.value;
          // deno-lint-ignore no-empty
        } catch (_error) {}
      } else {
        result.label = text.trim();
      }

      return result;
    },
  );

  macro.code = input.fields.code;
  macro.transpiled = undefined;

  await chronicle.saveMacro(macro);

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

  updateMacro(chronicle, macro, message);
}
