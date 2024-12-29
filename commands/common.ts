import { Character } from "../character.ts";
import { Chronicle } from "../repository.ts";
import { config } from "../config.ts";
import { ApplicationCommandType, ChannelTypes, Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { keys, treatDiscipline } from "../utils.ts";

export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export type CommandChoice = {
  name: string;
  value: any;
};

export type CommandOption = {
  property: string;
  description: string;
  type: CommandOptionType;
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  channelTypes?: ChannelTypes[];
  autocomplete?: boolean;
  choices?: CommandChoice[];
  options?: CommandOptions;
};

export type CommandOptions = {
  [name: string]: CommandOption;
};

export type Solver = (interaction: Interaction, chronicle: Chronicle, input?: any) => Promise<void>;

export const commands: {
  [name: string]: {
    solve: Solver;
    type?: ApplicationCommandType,
    description?: string;
    options?: CommandOptions;
  };
} = {};

export class BuildOptions {
  private _data: CommandOptions;

  constructor() {
    this._data = {};
  }

  public option(name: string, option: CommandOption): this {
    this._data[treatKey(name)] = option;
    return this;
  }

  public get build(): CommandOptions {
    return this._data;
  }
}

export function booleanChoices(): CommandChoice[] {
  return [{
    name: "👍",
    value: "true",
  }, {
    name: "❌",
    value: "false",
  }];
}

export function option(name: string, option: CommandOption): BuildOptions {
  return new BuildOptions().option(name, option);
}

export function treatKey(key: string | number): string {
  let data = treatDiscipline(key.toString()).name;
  return data.toLowerCase().replaceAll(/\s/g, "-");
}

export function buildChoices<T extends object>(o: T): CommandChoice[] {
  return keys(o).map((key) => {
    return {
      name: o[key] as string,
      value: key,
    };
  });
}

export const value = locale.commands.sheet.value.name;
export const property = "value";

export function buildIntegerOptions(
  minValue?: number,
  maxValue?: number,
): CommandOptions {
  return option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue,
    maxValue,
  }).build;
}

export function parseNumberField(get: (character: Character) => number, 
set: (character: Character, value: number) => void, multiplier: number): (character: Character, input: { value: number }) => number {
  return (character, input) => {
    const old = get(character);
    set(character, input.value);
    return calculateSpent(old, input.value, multiplier);
  }
}

export function calculateSpent(old: number, value: number, multiplier: number) {
  let spent = 0;
  const growing = value >= old;
  for (let index = (growing ? old : value) + 1; index <= (growing ? value : old); index++) {
    const result = index * multiplier;
    spent += growing ? result : -result;
  }
  return spent;
}

export function buildChoicesOptions(choices: string[], none?: boolean): CommandOptions {
  const array = choices.map(item => {
    return {
      value: item,
      name: item,
    };
  })

  if (none) {
    array.unshift({
      value: "",
      name: locale.none,
    });
  }

  return option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: array,
  }).build;
}