import { Chronicle } from "../repository.ts";
import { Solver } from "../commands/module.ts";
import {
  ButtonComponent,
  ButtonStyle,
  Interaction,
  InteractionMessageComponentData,
  InteractionModalSubmitData,
  InteractionResponseType,
  MessageComponentEmoji,
  MessageComponentType,
  TextInputStyle,
} from "../deps.ts";

export type ButtonOptions = {
  label: string;
  style?: ButtonStyle;
  emoji?: MessageComponentEmoji;
};

export type ModalOptions = {
  title: string;
  fields: {
    [name: string]: {
      label: string;
      style: TextInputStyle | keyof typeof TextInputStyle;
      placeholder?: string;
      minLength?: number;
      maxLength?: number;
      value?: string;
      required?: boolean;
    };
  };
};

export type ModalInput<T extends { [key: string]: string }> = {
  context: string[],
  fields: T
}

const separator = "^";

const custom: {
  parse: (context: string[], data?: any) => any;
  solve: Solver;
}[] = [];

function generateId(
  parse: (context: string[], data?: any) => any,
  solve: Solver,
) {
  const id = custom.length;
  custom.push({
    parse,
    solve,
  });
  return id;
}

function modalParse(context: string[], data: InteractionModalSubmitData): ModalInput<any> {
  const fields: any = {};

  for (const row of data.components) {
    const textInput = row.components[0];
    if (textInput.value !== "") {
      fields[textInput.custom_id] = textInput.value;
    }
  }

  return {
    context,
    fields: fields
  };
}

export async function interactionCustomId(
  interaction: Interaction,
  chronicle: Chronicle,
) {
  const data = interaction.data as
    | InteractionMessageComponentData
    | InteractionModalSubmitData;
  const array = data.custom_id.split(separator);

  if (array.length > 0) {
    const index = parseInt(array[0]);
    if (!isNaN(index)) {
      const button = custom[index];
      await button.solve(
        interaction,
        chronicle,
        button.parse(array.slice(1), data),
      );
    }
  }
}

export function button<T>(
  parse: (context: string[]) => T,
  solve: Solver,
): (options: ButtonOptions, ...context: any[]) => ButtonComponent {
  const id = generateId(parse, solve);
  return (options: ButtonOptions, ...context: any[]): ButtonComponent => {
    return {
      type: MessageComponentType.BUTTON,
      label: options.label,
      style: options.style || ButtonStyle.PRIMARY,
      emoji: options.emoji,
      customID: [id, ...context].join(separator),
    };
  };
}

export function modal<T>(
  build: (
    interaction: Interaction,
    chronicle: Chronicle,
    context: any[],
    input: T,
  ) => ModalOptions | Promise<ModalOptions>,
  solve: Solver,
): Solver {
  const id = generateId(modalParse, solve);
  return async (
    interaction: Interaction,
    chronicle: Chronicle,
    input: T,
  ) => {
    const context: any[] = [];

    const options = await build(interaction, chronicle, context, input);

    await interaction.respond({
      type: InteractionResponseType.MODAL,
      customID: [id, ...context].join(separator),
      title: options.title,
      components: Object.keys(options.fields).map((key) => {
        const field = options.fields[key];
        return {
          type: MessageComponentType.ACTION_ROW,
          components: [{
            type: MessageComponentType.TEXT_INPUT,
            label: field.label,
            value: field.value,
            style: field.style,
            minLength: field.minLength,
            maxLength: field.maxLength,
            required: field.required,
            customID: key,
          }],
        };
      }),
    });
  };
}
