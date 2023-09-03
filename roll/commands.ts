import { locale } from "../i18n/locale.ts";

export type Command = {
  type: number;
  name: string;
  description: string;
  options: {
    type: number;
    name: string;
    description: string;
    required: boolean;
    min_value?: number;
    max_value?: number;
  }[];
};

export const commands: Command[] = [
  {
    type: 1,
    name: locale.commands.roll.name,
    description: locale.commands.roll.description,
    options: [{
      name: locale.commands.roll.dices.name,
      description: locale.commands.roll.dices.description,
      type: 4,
      required: true,
      min_value: 1,
      max_value: 30,
    }, {
      name: locale.commands.roll.hunger.name,
      description: locale.commands.roll.hunger.description,
      type: 4,
      required: false,
      min_value: 1,
      max_value: 5,
    }, {
      name: locale.commands.roll.difficulty.name,
      description: locale.commands.roll.difficulty.description,
      type: 4,
      required: false,
      min_value: 2,
      max_value: 9,
    }, {
      name: locale.commands.roll.descriptionField.name,
      description: locale.commands.roll.descriptionField.description,
      type: 3,
      required: false,
    }],
  },
];
