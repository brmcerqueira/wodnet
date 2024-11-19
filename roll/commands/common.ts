import { Interaction } from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import { keys, treatDiscipline } from "../../utils.ts";

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
  autocomplete?: boolean;
  choices?: CommandChoice[];
  options?: CommandOptions;
};

export type CommandOptions = {
  [name: string]: CommandOption;
};

export type Solver = (interaction: Interaction, values?: any) => Promise<void>;

export const commands: {
  [name: string]: {
    description: string;
    solve: Solver;
    options?: CommandOptions;
  };
} = {};

class BuildOptions {
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

export function option(name: string, option: CommandOption): BuildOptions {
  return new BuildOptions().option(name, option);
}

export function treatKey(key: string | number): string {
  let data = treatDiscipline(key.toString()).name;
  for (const key in locale.shortening) {
    data = data.replaceAll(key, locale.shortening[key]);
  }
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

export function buildCreateSpecialtyOptions<T extends object>(
  o: T,
): CommandOptions {
  return option(locale.specialties.skill, {
    property: "skill",
    description: locale.specialties.skill,
    type: CommandOptionType.STRING,
    required: true,
    choices: buildChoices(o),
  }).option(locale.commands.sheet.name.name, {
    property: "name",
    description: locale.commands.sheet.name.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build;
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