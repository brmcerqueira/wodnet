import { MessagePayload, TextInputStyle } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { getMacro, saveMacro } from "../repository.ts";
import { macroModalSolver } from "../solver/macroModalSolver.ts";
import { InteractionResponseError } from "../utils.ts";
import { modal, ModalOptions } from "./common.ts";

export const macroModal = modal<{ message: MessagePayload }>(
  async (_interaction, _chronicle, context, input): Promise<ModalOptions> => {
   if (input.message.interaction?.name !== locale.commands.macro.panel.name) {
      throw new InteractionResponseError(locale.unauthorized);
    }

    const macro = await getMacro(input.message.id);

    await saveMacro({ message: input.message });

    context.push(input.message.id);

    return {
      title: `${locale.commands.macro.name}: ${input.message.embeds[0].title}`,
      fields: {
        buttons: {
          label: locale.commands.macro.buttons,
          value: macro?.buttons?.join("\n"),
          style: TextInputStyle.PARAGRAPH,
          minLength: 1,
          maxLength: 4000,
          required: true,
        },
        code: {
          label: locale.commands.macro.code,
          value: macro?.code,
          style: TextInputStyle.PARAGRAPH,
          minLength: 1,
          maxLength: 4000,
          required: true,
        },
      },
    };
  },
  macroModalSolver,
);
