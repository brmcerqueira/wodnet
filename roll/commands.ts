import { Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { characterAutocompleteSolver } from "./solver/characterAutocompleteSolver.ts";
import { rollSolver } from "./solver/rollSolver.ts";
import { setDifficultySolver } from "./solver/setDifficultySolver.ts";
import { setModifierSolver } from "./solver/setModifierSolver.ts";

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
  ATTACHMENT = 11
}

export type CommandOption = {
  property: string;
  description: string;
  type: CommandOptionType;
  required: boolean;
  min_value?: number;
  max_value?: number;
  autocomplete?: boolean;
}

export type CommandOptions = {
  [name: string]: CommandOption
}

export const commands: {
  [name: string]: {
    description: string;
    solve: (interaction: Interaction, values?: any) => Promise<void>
    options?: CommandOptions
  }
} = {}

class BuildOptions {
  private _data: CommandOptions;

  constructor() {
    this._data = {};
  }

  public option(name: string, option: CommandOption): this {
    this._data[name] = option;
    return this;
  }

  public get build(): CommandOptions {
    return this._data;
  }
}

function option(name: string, option: CommandOption): BuildOptions {
  return new BuildOptions().option(name, option)
}

commands[locale.commands.roll.name] = {
  description: locale.commands.roll.description,
  solve: rollSolver,
  options: option(locale.commands.roll.dices.name, {
    property: "dices",
    description: locale.commands.roll.dices.description,
    type: CommandOptionType.INTEGER,
    required: true,
    min_value: 1,
    max_value: 30,
  }).option(locale.commands.roll.hunger.name, {
    property: "hunger",
    description: locale.commands.roll.hunger.description,
    type: CommandOptionType.INTEGER,
    required: false,
    min_value: 1,
    max_value: 5,
  }).option(locale.commands.roll.difficulty.name, {
    property: "difficulty",
    description: locale.commands.roll.difficulty.description,
    type: CommandOptionType.INTEGER,
    required: false,
    min_value: 2,
    max_value: 9,
  }).option(locale.commands.roll.descriptionField.name, {
    property: "description",
    description: locale.commands.roll.descriptionField.description,
    type: CommandOptionType.STRING,
    required: false,
  }).build
};

commands[locale.commands.setDifficulty.name] = {
  description: locale.commands.setDifficulty.description,
  solve: setDifficultySolver,
  options: option(locale.commands.setDifficulty.difficulty.name, {
    property: "difficulty",
    description: locale.commands.setDifficulty.difficulty.description,
    type: CommandOptionType.INTEGER,
    required: true,
    min_value: 1,
    max_value: 10,
  }).build
};

commands[locale.commands.setModifier.name] = {
  description: locale.commands.setModifier.description,
  solve: setModifierSolver,
  options: option(locale.commands.setModifier.modifier.name, {
    property: "modifier",
    description: locale.commands.setModifier.modifier.description,
    type: CommandOptionType.INTEGER,
    required: true,
    min_value: -10,
    max_value: 10,
  }).build
};

commands[locale.commands.setCharacter.name] = {
  description: locale.commands.setCharacter.description,
  solve: characterAutocompleteSolver,
  options: option(locale.commands.setCharacter.character.name, {
    property: "character",
    description: locale.commands.setCharacter.character.description,
    type: CommandOptionType.STRING,
    required: true,
    autocomplete: true
  }).build
};