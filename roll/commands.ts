import { Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { characterAutocompleteSolver } from "./solver/characterAutocompleteSolver.ts";
import { actionAutocompleteSolver } from "./solver/actionAutocompleteSolver.ts";
import { rollSolver } from "./solver/rollSolver.ts";
import { setDifficultySolver } from "./solver/setDifficultySolver.ts";
import { setModifierSolver } from "./solver/setModifierSolver.ts";
import { dicePoolSolver } from "./solver/dicePoolSolver.ts";
import { keys } from "../utils.ts";
import { buildCharacterFieldSolver } from "./solver/buildCharacterFieldSolver.ts";
import { buildCharacterDamageSolver } from "./solver/buildCharacterDamageSolver.ts";
import { experienceSolver } from "./solver/experienceSolver.ts";

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
    this._data[name] = option;
    return this;
  }

  public get build(): CommandOptions {
    return this._data;
  }
}

export function option(name: string, option: CommandOption): BuildOptions {
  return new BuildOptions().option(name, option);
}

function buildChoices<T extends object>(o: T): CommandChoice[] {
  return keys(o).map((key) => {
    return {
      name: o[key] as string,
      value: key,
    };
  });
}

const value = locale.commands.sheet.value;
const property = "value";

function buildIntegerOptions(
  minValue?: number,
  maxValue?: number,
): CommandOptions {
  return option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue,
    maxValue,
  }).build;
}

function buildChoicesOptions(choices: string[]): CommandOptions {
  return option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.STRING,
    required: true,
    choices: choices.map((item) => {
      return {
        name: item,
        value: item,
      };
    }),
  }).build;
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
    choices: keys(locale.disciplines).filter((key) => key != "name").map(
      (key) => {
        return {
          name: (locale.disciplines[key] as any).name,
          value: key,
        };
      },
    ),
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

commands[locale.player] = {
  description: `${locale.commands.sheet.description} ${locale.player}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.player = v),
};
commands[locale.resonance.name] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options),
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.resonance = v),
};
commands[locale.ambition] = {
  description: `${locale.commands.sheet.description} ${locale.ambition}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.ambition = v),
};
commands[locale.desire] = {
  description: `${locale.commands.sheet.description} ${locale.desire}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.desire = v),
};
commands[locale.predator.name] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.predator = v),
};
commands[locale.clan.name] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(locale.clan.options),
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.clan = v),
};
commands[locale.generation.name] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.generation = v),
};
commands[locale.details] = {
  description: `${locale.commands.sheet.description} ${locale.details}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.valueDescription,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, _o, v: string) => c.details = v),
};
commands[locale.bloodPotency] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.bloodPotency = v),
};
commands[locale.hunger] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.hunger = v),
};
commands[locale.humanity] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.humanity.total = v),
};
commands[locale.stains] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.humanity.stains = v),
};

commands[locale.health] = {
  description: `${locale.commands.sheet.description} ${locale.health}`,
  options: option(locale.damage.superficial.toLowerCase(), {
    property: "superficial",
    description: locale.damage.superficial,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.damage.aggravated.toLowerCase(), {
    property: "aggravated",
    description: locale.damage.aggravated,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: buildCharacterDamageSolver(c => c.health),
};

commands[locale.willpower] = {
  description: `${locale.commands.sheet.description} ${locale.willpower}`,
  options: option(locale.damage.superficial.toLowerCase(), {
    property: "superficial",
    description: locale.damage.superficial,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.damage.aggravated.toLowerCase(), {
    property: "aggravated",
    description: locale.damage.aggravated,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: buildCharacterDamageSolver(c => c.willpower),
};

commands[locale.experience.name] = {
  description: `${locale.commands.sheet.description} ${locale.experience.name}`,
  options: option(locale.experience.total.toLowerCase(), {
    property: "total",
    description: locale.experience.total,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.experience.spent.toLowerCase(), {
    property: "spent",
    description: locale.experience.spent,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: experienceSolver,
};

commands[locale.attributes.physical.strength] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.strength}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.physical.strength = v),
};
commands[locale.attributes.physical.dexterity] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.dexterity}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.physical.dexterity = v),
};
commands[locale.attributes.physical.stamina] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.stamina}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.physical.stamina = v),
};
commands[locale.attributes.social.charisma] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.charisma}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.social.charisma = v),
};
commands[locale.attributes.social.manipulation] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.manipulation}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.social.manipulation = v),
};
commands[locale.attributes.social.composure] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.composure}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.social.composure = v),
};
commands[locale.attributes.mental.intelligence] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.intelligence}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.mental.intelligence = v),
};
commands[locale.attributes.mental.wits] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.wits}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.mental.wits = v),
};
commands[locale.attributes.mental.resolve] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.resolve}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.attributes.mental.resolve = v),
};
commands[locale.skills.physical.melee] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.melee}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.melee = v),
};
commands[locale.skills.physical.firearms] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.firearms}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.firearms = v),
};
commands[locale.skills.physical.athletics] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.athletics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.athletics = v),
};
commands[locale.skills.physical.brawl] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.brawl}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.brawl = v),
};
commands[locale.skills.physical.drive] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.drive}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.drive = v),
};
commands[locale.skills.physical.stealth] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.stealth}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.stealth = v),
};
commands[locale.skills.physical.larceny] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.larceny}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.larceny = v),
};
commands[locale.skills.physical.craft] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.craft}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.craft = v),
};
commands[locale.skills.physical.survival] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.survival}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.physical.survival = v),
};
commands[locale.skills.social.animalKen] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.animalKen}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.animalKen = v),
};
commands[locale.skills.social.etiquette] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.etiquette}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.etiquette = v),
};
commands[locale.skills.social.intimidation] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.intimidation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.intimidation = v),
};
commands[locale.skills.social.leadership] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.leadership}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.leadership = v),
};
commands[locale.skills.social.streetwise] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.streetwise}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.streetwise = v),
};
commands[locale.skills.social.performance] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.performance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.performance = v),
};
commands[locale.skills.social.persuasion] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.persuasion}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.persuasion = v),
};
commands[locale.skills.social.insight] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.insight}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.insight = v),
};
commands[locale.skills.social.subterfuge] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.subterfuge}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.social.subterfuge = v),
};
commands[locale.skills.mental.science] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.science}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.science = v),
};
commands[locale.skills.mental.academics] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.academics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.academics = v),
};
commands[locale.skills.mental.finance] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.finance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.finance = v),
};
commands[locale.skills.mental.investigation] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.investigation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.investigation = v),
};
commands[locale.skills.mental.medicine] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.medicine}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.medicine = v),
};
commands[locale.skills.mental.occult] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.occult}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.occult = v),
};
commands[locale.skills.mental.awareness] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.awareness}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.awareness = v),
};
commands[locale.skills.mental.politics] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.politics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.politics = v),
};
commands[locale.skills.mental.technology] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.technology}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, _o, v: number) => c.skills.mental.technology = v),
};
