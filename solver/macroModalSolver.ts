import { macroButton } from "../buttons/module.ts";
import { Chronicle } from "../chronicle.ts";
import {
  Interaction,
  InteractionModalSubmitData,
  InteractionResponseType,
  Message,
  MessageComponentType,
  MessagePayload,
  TextInputStyle,
  User,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError, separator } from "../utils.ts";

export async function macroModalSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { message?: MessagePayload } & InteractionModalSubmitData,
) {
  if (input.message) {
    if (input.message.interaction?.name !== locale.commands.macro.panel.name) {
      throw new InteractionResponseError(locale.unauthorized);
    }

    await chronicle.saveMacro({ message: input.message });

    await interaction.respond({
      type: InteractionResponseType.MODAL,
      customID: `macroModal${separator}${input.message.id}`,
      title: `${locale.commands.macro.name}: ${input.message.embeds[0].title}`,
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.commands.macro.buttons,
          value: undefined,
          style: TextInputStyle.PARAGRAPH,
          minLength: 1,
          maxLength: 4000,
          required: true,
          customID: "buttons",
        }],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.commands.macro.code,
          value: undefined,
          style: TextInputStyle.PARAGRAPH,
          minLength: 1,
          maxLength: 4000,
          required: true,
          customID: "code",
        }],
      }],
    });
  } else {
    const messageId = input.custom_id.split(separator)[1];
    const macro = (await chronicle.macro(messageId))!;

    const buttonsTextInput = input.components[0].components[0];
    const codeTextInput = input.components[1].components[0];

    macro.buttons = buttonsTextInput.value.split("\n");
    macro.code = codeTextInput.value;

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
          macroButton({
            label: label,
          }, messageId, index)
        ),
      }],
    });

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.commands.macro.saved,
        color: colors.green,
      }],
      ephemeral: true
    });
  }
}
