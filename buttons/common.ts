import { Chronicle } from "../chronicle.ts";
import { Solver } from "../commands/module.ts";
import {
  ButtonComponent,
  ButtonStyle,
  Interaction,
  InteractionMessageComponentData,
  MessageComponentEmoji,
  MessageComponentType,
} from "../deps.ts";

export type ButtonOptions = {
  label: string;
  style?: ButtonStyle;
  emoji?: MessageComponentEmoji;
};

const separator = "^";

const buttons: { parse: (data: string[]) => any; solve: Solver }[] = [];

export async function interactionButton(
  interaction: Interaction,
  chronicle: Chronicle,
) {
  const data = interaction.data as InteractionMessageComponentData;
  const array = data.custom_id.split(separator);

  if (array.length > 0) {
    const index = parseInt(array[0]);
    if (!isNaN(index)) {
      const button = buttons[index];
      await button.solve(interaction, chronicle, button.parse(array.slice(1)));
    }
  }
}

export function button<T>(
  parse: (data: string[]) => T,
  solve: Solver,
): (options: ButtonOptions, ...data: any[]) => ButtonComponent {
  const id = buttons.length;
  buttons.push({
    parse,
    solve,
  });
  return (options: ButtonOptions, ...data: any[]): ButtonComponent => {
    return {
      type: MessageComponentType.BUTTON,
      label: options.label,
      style: options.style || ButtonStyle.GREEN,
      emoji: options.emoji,
      customID: [id, ...data].join(separator),
    };
  };
}
