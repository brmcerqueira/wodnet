import { Chronicle } from "../chronicle.ts";
import {
  Interaction,
  InteractionResponseType,
  Message,
  MessageComponentType,
  TextInputStyle,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { InteractionResponseError } from "../utils.ts";

export async function macroSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: { message: Message },
) {
  if (input.message.interaction?.name !== locale.commands.macro.panel.name) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  await interaction.respond({
    type: InteractionResponseType.MODAL,
    customID: "macro",
    title: `${locale.commands.macro.button}: ${input.message.embeds[0].title}`,
    components: [{
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

  /*
  await input.message.edit({
    components: [{
      type: MessageComponentType.ACTION_ROW,
      components: [
        characterLinkButton(chronicle.id, ""),
      ],
    }],
  });*/
}
