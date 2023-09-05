import { Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { characterAutocompleteSolver } from "./solver/characterAutocompleteSolver.ts";
import { actionAutocompleteSolver } from "./solver/actionAutocompleteSolver.ts";
import { rollSolver } from "./solver/rollSolver.ts";
import { setDifficultySolver } from "./solver/setDifficultySolver.ts";
import { setModifierSolver } from "./solver/setModifierSolver.ts";
import { dicePoolSolver } from "./solver/dicePoolSolver.ts";
import { keys } from "../utils.ts";

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
  required: boolean;
  minValue?: number;
  maxValue?: number;
  autocomplete?: boolean;
  choices?: CommandChoice[];
};

export type CommandOptions = {
  [name: string]: CommandOption;
};

export const commands: {
  [name: string]: {
    description: string;
    solve: (interaction: Interaction, values?: any) => Promise<void>;
    options?: CommandOptions;
  };
} = {};

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
  return new BuildOptions().option(name, option);
}

function buildChoices<T extends object>(o: T): CommandChoice[] {
  return keys(o).map((key) => {
    return {
      name: o[key],
      value: key,
    };
  });
}

const attributeChoices = [
  ...buildChoices(locale.attributes.physical),
  ...buildChoices(locale.attributes.social),
  ...buildChoices(locale.attributes.mental),
];

commands[locale.commands.roll.name] = {
  description: locale.commands.roll.description,
  solve: rollSolver,
  options: option(locale.commands.roll.dices.name, {
    property: "dices",
    description: locale.commands.roll.dices.description,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue: 1,
    maxValue: 30,
  }).option(locale.commands.roll.hunger.name, {
    property: "hunger",
    description: locale.commands.roll.hunger.description,
    type: CommandOptionType.INTEGER,
    required: false,
    minValue: 1,
    maxValue: 5,
  }).option(locale.commands.roll.difficulty.name, {
    property: "difficulty",
    description: locale.commands.roll.difficulty.description,
    type: CommandOptionType.INTEGER,
    required: false,
    minValue: 2,
    maxValue: 9,
  }).option(locale.commands.roll.descriptionField.name, {
    property: "description",
    description: locale.commands.roll.descriptionField.description,
    type: CommandOptionType.STRING,
    required: false,
  }).build,
};

commands[locale.commands.setDifficulty.name] = {
  description: locale.commands.setDifficulty.description,
  solve: setDifficultySolver,
  options: option(locale.commands.setDifficulty.difficulty.name, {
    property: "difficulty",
    description: locale.commands.setDifficulty.difficulty.description,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue: 1,
    maxValue: 10,
  }).build,
};

commands[locale.commands.setModifier.name] = {
  description: locale.commands.setModifier.description,
  solve: setModifierSolver,
  options: option(locale.commands.setModifier.modifier.name, {
    property: "modifier",
    description: locale.commands.setModifier.modifier.description,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue: -10,
    maxValue: 10,
  }).build,
};

commands[locale.commands.setCharacter.name] = {
  description: locale.commands.setCharacter.description,
  solve: characterAutocompleteSolver,
  options: option(locale.commands.setCharacter.character.name, {
    property: "character",
    description: locale.commands.setCharacter.character.description,
    type: CommandOptionType.STRING,
    required: true,
    autocomplete: true,
  }).build,
};

commands[locale.commands.dicePools.name] = {
  description: locale.commands.dicePools.description,
  solve: dicePoolSolver,
  options: option(locale.commands.dicePools.attribute.name, {
    property: "attribute",
    description: locale.commands.dicePools.attribute.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: attributeChoices,
  }).option(locale.commands.dicePools.secondaryAttribute.name, {
    property: "secondaryAttribute",
    description: locale.commands.dicePools.secondaryAttribute.description,
    type: CommandOptionType.STRING,
    required: false,
    choices: attributeChoices,
  }).option(locale.commands.dicePools.skillPhysical.name, {
    property: "skillPhysical",
    description: locale.commands.dicePools.skillPhysical.description,
    type: CommandOptionType.STRING,
    required: false,
    choices: buildChoices(locale.skills.physical),
  }).option(locale.commands.dicePools.skillSocial.name, {
    property: "skillSocial",
    description: locale.commands.dicePools.skillSocial.description,
    type: CommandOptionType.STRING,
    required: false,
    choices: buildChoices(locale.skills.social),
  }).option(locale.commands.dicePools.skillMental.name, {
    property: "skillMental",
    description: locale.commands.dicePools.skillMental.description,
    type: CommandOptionType.STRING,
    required: false,
    choices: buildChoices(locale.skills.mental),
  }).option(locale.commands.dicePools.discipline.name, {
    property: "discipline",
    description: locale.commands.dicePools.discipline.description,
    type: CommandOptionType.STRING,
    required: false,
    choices: keys(locale.disciplines).filter(key => key != "name").map((key) => {
      return {
        name: (locale.disciplines[key] as any).name,
        value: key,
      };
    }),
  }).build,
};

commands[locale.commands.actions.name] = {
  description: locale.commands.actions.description,
  solve: actionAutocompleteSolver,
  options: option(locale.commands.actions.action.name, {
    property: "action",
    description: locale.commands.actions.action.description,
    type: CommandOptionType.STRING,
    required: true,
    autocomplete: true,
  }).build,
};
