import { Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { characterAutocompleteSolver } from "./solver/characterAutocompleteSolver.ts";
import { actionAutocompleteSolver } from "./solver/actionAutocompleteSolver.ts";
import { rollSolver } from "./solver/rollSolver.ts";
import { setDifficultySolver } from "./solver/setDifficultySolver.ts";
import { setModifierSolver } from "./solver/setModifierSolver.ts";
import { dicePoolSolver } from "./solver/dicePoolSolver.ts";
import { keys, treatDiscipline } from "../utils.ts";
import { buildCharacterFieldSolver } from "./solver/buildCharacterFieldSolver.ts";
import { buildCharacterDamageSolver } from "./solver/buildCharacterDamageSolver.ts";
import { experienceSolver } from "./solver/experienceSolver.ts";
import { buildCharacterDisciplineSolver } from "./solver/buildCharacterDisciplineSolver.ts";
import { buildCharacterAdvantageFlawSolver } from "./solver/buildCharacterAdvantageFlawSolver.ts";
import { specialtiesSolver } from "./solver/specialtiesSolver.ts";
import { characterLinkSolver } from "./solver/characterLinkSolver.ts";

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

function option(name: string, option: CommandOption): BuildOptions {
  return new BuildOptions().option(name, option);
}

function treatKey(key: string | number): string {
  let data = treatDiscipline(key.toString()).name;
  for (const key in locale.shortening) {
    data = data.replaceAll(key, locale.shortening[key]);
  }
  return data.toLowerCase().replaceAll(/\s/g, "-");
}

function buildChoices<T extends object>(o: T): CommandChoice[] {
  return keys(o).map((key) => {
    return {
      name: o[key] as string,
      value: key,
    };
  });
}

const value = locale.commands.sheet.value.name;
const property = "value";

function buildIntegerOptions(
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

function buildAdvantageFlawOptions(): CommandOptions {
  return option(locale.commands.sheet.create.name, {
    property: "create",
    description: locale.commands.sheet.create.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.sheet.name.name, {
      property: "name",
      description: locale.commands.sheet.name.description,
      type: CommandOptionType.STRING,
      required: true,
    }).option(value, {
      property: property,
      description: locale.commands.sheet.value.description,
      type: CommandOptionType.INTEGER,
      required: true,
      minValue: 1,
      maxValue: 5,
    }).build,
  }).option(locale.commands.sheet.edit.name, {
    property: "edit",
    description: locale.commands.sheet.edit.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.sheet.index.name, {
      property: "index",
      description: locale.commands.sheet.index.description,
      type: CommandOptionType.INTEGER,
      required: true,
      minValue: 1,
      maxValue: 99,
    }).option(value, {
      property: property,
      description: locale.commands.sheet.value.description,
      type: CommandOptionType.INTEGER,
      required: true,
      minValue: 0,
      maxValue: 5,
    }).build,
  }).build;
}

function buildChoicesOptions(choices: string[]): CommandOptions {
  return option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
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

commands[treatKey(locale.commands.roll.name)] = {
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

commands[treatKey(locale.commands.sheet.link.name)] = {
  description: locale.commands.sheet.link.description,
  solve: characterLinkSolver
};

commands[treatKey(locale.commands.setDifficulty.name)] = {
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

commands[treatKey(locale.commands.setModifier.name)] = {
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

commands[treatKey(locale.commands.setCharacter.name)] = {
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

commands[treatKey(locale.commands.dicePools.name)] = {
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

commands[treatKey(locale.commands.actions.name)] = {
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

commands[treatKey(locale.player)] = {
  description: `${locale.commands.sheet.description} ${locale.player}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, v: string) => c.player = v),
};

commands[treatKey(locale.resonance.name)] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options),
  solve: buildCharacterFieldSolver((c, v: string) => c.resonance = v),
};

commands[treatKey(locale.ambition)] = {
  description: `${locale.commands.sheet.description} ${locale.ambition}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, v: string) => c.ambition = v),
};

commands[treatKey(locale.desire)] = {
  description: `${locale.commands.sheet.description} ${locale.desire}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, v: string) => c.desire = v),
};

commands[treatKey(locale.predator.name)] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterFieldSolver((c, v: string) => c.predator = v),
};

commands[treatKey(locale.clan.name)] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(locale.clan.options),
  solve: buildCharacterFieldSolver((c, v: string) => c.clan = v),
};

commands[treatKey(locale.generation.name)] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterFieldSolver((c, v: number) => c.generation = v),
};

commands[treatKey(locale.details)] = {
  description: `${locale.commands.sheet.description} ${locale.details}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterFieldSolver((c, v: string) => c.details = v),
};

commands[treatKey(locale.bloodPotency)] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, v: number) => c.bloodPotency = v),
};

commands[treatKey(locale.hunger)] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) => c.hunger = v),
};

commands[treatKey(locale.humanity)] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, v: number) => c.humanity.total = v),
};

commands[treatKey(locale.stains)] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterFieldSolver((c, v: number) => c.humanity.stains = v),
};

commands[treatKey(locale.health)] = {
  description: `${locale.commands.sheet.description} ${locale.health}`,
  options: option(locale.damage.superficial, {
    property: "superficial",
    description: locale.damage.superficial,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.damage.aggravated, {
    property: "aggravated",
    description: locale.damage.aggravated,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: buildCharacterDamageSolver((c) => c.health),
};

commands[treatKey(locale.willpower)] = {
  description: `${locale.commands.sheet.description} ${locale.willpower}`,
  options: option(locale.damage.superficial, {
    property: "superficial",
    description: locale.damage.superficial,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.damage.aggravated, {
    property: "aggravated",
    description: locale.damage.aggravated,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: buildCharacterDamageSolver((c) => c.willpower),
};

commands[treatKey(locale.experience.name)] = {
  description: `${locale.commands.sheet.description} ${locale.experience.name}`,
  options: option(locale.experience.total, {
    property: "total",
    description: locale.experience.total,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.experience.spent, {
    property: "spent",
    description: locale.experience.spent,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: experienceSolver,
};

commands[treatKey(locale.attributes.physical.strength)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.strength}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.physical.strength = v
  ),
};

commands[treatKey(locale.attributes.physical.dexterity)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.dexterity}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.physical.dexterity = v
  ),
};

commands[treatKey(locale.attributes.physical.stamina)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.stamina}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.physical.stamina = v
  ),
};

commands[treatKey(locale.attributes.social.charisma)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.charisma}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.social.charisma = v
  ),
};

commands[treatKey(locale.attributes.social.manipulation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.manipulation}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.social.manipulation = v
  ),
};

commands[treatKey(locale.attributes.social.composure)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.composure}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.social.composure = v
  ),
};

commands[treatKey(locale.attributes.mental.intelligence)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.intelligence}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.mental.intelligence = v
  ),
};

commands[treatKey(locale.attributes.mental.wits)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.wits}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.mental.wits = v
  ),
};

commands[treatKey(locale.attributes.mental.resolve)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.resolve}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.attributes.mental.resolve = v
  ),
};

commands[treatKey(locale.skills.physical.melee)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.melee}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.melee = v
  ),
};

commands[treatKey(locale.skills.physical.firearms)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.firearms}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.firearms = v
  ),
};

commands[treatKey(locale.skills.physical.athletics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.athletics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.athletics = v
  ),
};

commands[treatKey(locale.skills.physical.brawl)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.brawl}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.brawl = v
  ),
};

commands[treatKey(locale.skills.physical.drive)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.drive}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.drive = v
  ),
};

commands[treatKey(locale.skills.physical.stealth)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.stealth}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.stealth = v
  ),
};

commands[treatKey(locale.skills.physical.larceny)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.larceny}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.larceny = v
  ),
};

commands[treatKey(locale.skills.physical.craft)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.craft}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.craft = v
  ),
};

commands[treatKey(locale.skills.physical.survival)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.survival}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.physical.survival = v
  ),
};

commands[treatKey(locale.skills.social.animalKen)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.animalKen}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.animalKen = v
  ),
};

commands[treatKey(locale.skills.social.etiquette)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.etiquette}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.etiquette = v
  ),
};

commands[treatKey(locale.skills.social.intimidation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.intimidation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.intimidation = v
  ),
};

commands[treatKey(locale.skills.social.leadership)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.leadership}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.leadership = v
  ),
};

commands[treatKey(locale.skills.social.streetwise)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.streetwise}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.streetwise = v
  ),
};

commands[treatKey(locale.skills.social.performance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.performance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.performance = v
  ),
};

commands[treatKey(locale.skills.social.persuasion)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.persuasion}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.persuasion = v
  ),
};

commands[treatKey(locale.skills.social.insight)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.insight}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.insight = v
  ),
};

commands[treatKey(locale.skills.social.subterfuge)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.subterfuge}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.social.subterfuge = v
  ),
};

commands[treatKey(locale.skills.mental.science)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.science}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.science = v
  ),
};

commands[treatKey(locale.skills.mental.academics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.academics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.academics = v
  ),
};

commands[treatKey(locale.skills.mental.finance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.finance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.finance = v
  ),
};

commands[treatKey(locale.skills.mental.investigation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.investigation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.investigation = v
  ),
};

commands[treatKey(locale.skills.mental.medicine)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.medicine}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.medicine = v
  ),
};

commands[treatKey(locale.skills.mental.occult)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.occult}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.occult = v
  ),
};

commands[treatKey(locale.skills.mental.awareness)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.awareness}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.awareness = v
  ),
};

commands[treatKey(locale.skills.mental.politics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.politics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.politics = v
  ),
};

commands[treatKey(locale.skills.mental.technology)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.technology}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterFieldSolver((c, v: number) =>
    c.skills.mental.technology = v
  ),
};

commands[treatKey(locale.specialties.name)] = { 
  description: `${locale.commands.sheet.description} ${locale.specialties.name}`,
  solve: specialtiesSolver,
  options: option(locale.physical, {
    property: "physical",
    description: locale.physical,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.specialties.skill, {
      property: "skill",
      description: locale.specialties.skill,
      type: CommandOptionType.STRING,
      required: true,
      choices: buildChoices(locale.skills.physical)
    }).option(locale.commands.sheet.name.name, {
      property: "name",
      description: locale.commands.sheet.name.description,
      type: CommandOptionType.STRING,
      required: true,
    }).build,
  }).option(locale.social, {
    property: "social",
    description: locale.social,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.specialties.skill, {
      property: "skill",
      description: locale.specialties.skill,
      type: CommandOptionType.STRING,
      required: true,
      choices: buildChoices(locale.skills.social)
    }).option(locale.commands.sheet.name.name, {
      property: "name",
      description: locale.commands.sheet.name.description,
      type: CommandOptionType.STRING,
      required: true,
    }).build,
  }).option(locale.mental, {
    property: "mental",
    description: locale.mental,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.specialties.skill, {
      property: "skill",
      description: locale.specialties.skill,
      type: CommandOptionType.STRING,
      required: true,
      choices: buildChoices(locale.skills.mental)
    }).option(locale.commands.sheet.name.name, {
      property: "name",
      description: locale.commands.sheet.name.description,
      type: CommandOptionType.STRING,
      required: true,
    }).build,
  }).option(locale.commands.sheet.delete.name, {
    property: "delete",
    description: locale.commands.sheet.delete.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.sheet.index.name, {
      property: "index",
      description: locale.commands.sheet.index.description,
      type: CommandOptionType.INTEGER,
      required: true,
      minValue: 1,
      maxValue: 99,
    }).build,
  }).build,
};

commands[treatKey(locale.advantages)] = {
  description: `${locale.commands.sheet.description} ${locale.advantages}`,
  solve: buildCharacterAdvantageFlawSolver((c) => c.advantages),
  options: buildAdvantageFlawOptions(),
};

commands[treatKey(locale.flaws)] = {
  description: `${locale.commands.sheet.description} ${locale.flaws}`,
  solve: buildCharacterAdvantageFlawSolver((c) => c.flaws),
  options: buildAdvantageFlawOptions(),
};

commands[treatKey(locale.disciplines.animalism.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.animalism.name}`,
  solve: buildCharacterDisciplineSolver("animalism"),
  options: option(locale.disciplines.animalism.bondFamulus, {
    property: "bondFamulus",
    description: locale.disciplines.animalism.bondFamulus,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.senseTheBeast, {
    property: "senseTheBeast",
    description: locale.disciplines.animalism.senseTheBeast,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.feralWhispers, {
    property: "feralWhispers",
    description: locale.disciplines.animalism.feralWhispers,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.animalSucculence, {
    property: "animalSucculence",
    description: locale.disciplines.animalism.animalSucculence,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.quellTheBeast, {
    property: "quellTheBeast",
    description: locale.disciplines.animalism.quellTheBeast,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.unlivingHive, {
    property: "unlivingHive",
    description: locale.disciplines.animalism.unlivingHive,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.subsumeTheSpirit, {
    property: "subsumeTheSpirit",
    description: locale.disciplines.animalism.subsumeTheSpirit,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.animalDominion, {
    property: "animalDominion",
    description: locale.disciplines.animalism.animalDominion,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.animalism.drawingOutTheBeast, {
    property: "drawingOutTheBeast",
    description: locale.disciplines.animalism.drawingOutTheBeast,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.auspex.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.auspex.name}`,
  solve: buildCharacterDisciplineSolver("auspex"),
  options: option(locale.disciplines.auspex.heightenedSenses, {
    property: "heightenedSenses",
    description: locale.disciplines.auspex.heightenedSenses,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.senseTheUnseen, {
    property: "senseTheUnseen",
    description: locale.disciplines.auspex.senseTheUnseen,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.obeah, {
    property: "obeah",
    description: locale.disciplines.auspex.obeah,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.premonition, {
    property: "premonition",
    description: locale.disciplines.auspex.premonition,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.scryTheSoul, {
    property: "scryTheSoul",
    description: locale.disciplines.auspex.scryTheSoul,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.shareTheSenses, {
    property: "shareTheSenses",
    description: locale.disciplines.auspex.shareTheSenses,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.spiritsTouch, {
    property: "spiritsTouch",
    description: locale.disciplines.auspex.spiritsTouch,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.clairvoyance, {
    property: "clairvoyance",
    description: locale.disciplines.auspex.clairvoyance,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.possession, {
    property: "possession",
    description: locale.disciplines.auspex.possession,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.telepathy, {
    property: "telepathy",
    description: locale.disciplines.auspex.telepathy,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.auspex.unburdeningTheBestialSoul, {
    property: "unburdeningTheBestialSoul",
    description: locale.disciplines.auspex.unburdeningTheBestialSoul,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.dominate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.dominate.name}`,
  solve: buildCharacterDisciplineSolver("dominate"),
  options: option(locale.disciplines.dominate.cloudMemory, {
    property: "cloudMemory",
    description: locale.disciplines.dominate.cloudMemory,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.compel, {
    property: "compel",
    description: locale.disciplines.dominate.compel,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.mesmerize, {
    property: "mesmerize",
    description: locale.disciplines.dominate.mesmerize,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.dementation, {
    property: "dementation",
    description: locale.disciplines.dominate.dementation,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.domitorsFavor, {
    property: "domitorsFavor",
    description: locale.disciplines.dominate.domitorsFavor,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.theForgetfulMind, {
    property: "theForgetfulMind",
    description: locale.disciplines.dominate.theForgetfulMind,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.submergedDirective, {
    property: "submergedDirective",
    description: locale.disciplines.dominate.submergedDirective,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.rationalize, {
    property: "rationalize",
    description: locale.disciplines.dominate.rationalize,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.massManipulation, {
    property: "massManipulation",
    description: locale.disciplines.dominate.massManipulation,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.dominate.terminalDecree, {
    property: "terminalDecree",
    description: locale.disciplines.dominate.terminalDecree,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.bloodSorcery.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.name}`,
  solve: buildCharacterDisciplineSolver("bloodSorcery"),
  options: option(locale.disciplines.bloodSorcery.corrosiveVitae, {
    property: "corrosiveVitae",
    description: locale.disciplines.bloodSorcery.corrosiveVitae,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.aTasteForBlood, {
    property: "aTasteForBlood",
    description: locale.disciplines.bloodSorcery.aTasteForBlood,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.extinguishVitae, {
    property: "extinguishVitae",
    description: locale.disciplines.bloodSorcery.extinguishVitae,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.bloodOfPotency, {
    property: "bloodOfPotency",
    description: locale.disciplines.bloodSorcery.bloodOfPotency,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.scorpionsTouch, {
    property: "scorpionsTouch",
    description: locale.disciplines.bloodSorcery.scorpionsTouch,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.theftOfVitae, {
    property: "theftOfVitae",
    description: locale.disciplines.bloodSorcery.theftOfVitae,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.baalsCaress, {
    property: "baalsCaress",
    description: locale.disciplines.bloodSorcery.baalsCaress,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.bloodSorcery.cauldronOfBlood, {
    property: "cauldronOfBlood",
    description: locale.disciplines.bloodSorcery.cauldronOfBlood,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.fortitude.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.fortitude.name}`,
  solve: buildCharacterDisciplineSolver("fortitude"),
  options: option(locale.disciplines.fortitude.resilience, {
    property: "resilience",
    description: locale.disciplines.fortitude.resilience,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.unswayableMind, {
    property: "unswayableMind",
    description: locale.disciplines.fortitude.unswayableMind,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.toughness, {
    property: "toughness",
    description: locale.disciplines.fortitude.toughness,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.enduringBeasts, {
    property: "enduringBeasts",
    description: locale.disciplines.fortitude.enduringBeasts,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.valeren, {
    property: "valeren",
    description: locale.disciplines.fortitude.valeren,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.defyBane, {
    property: "defyBane",
    description: locale.disciplines.fortitude.defyBane,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.fortifyTheInnerFacade, {
    property: "fortifyTheInnerFacade",
    description: locale.disciplines.fortitude.fortifyTheInnerFacade,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.draughtOfEndurance, {
    property: "draughtOfEndurance",
    description: locale.disciplines.fortitude.draughtOfEndurance,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.fleshOfMarble, {
    property: "fleshOfMarble",
    description: locale.disciplines.fortitude.fleshOfMarble,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.fortitude.prowessFromPain, {
    property: "prowessFromPain",
    description: locale.disciplines.fortitude.prowessFromPain,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.protean.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.protean.name}`,
  solve: buildCharacterDisciplineSolver("protean"),
  options: option(locale.disciplines.protean.eyesOfTheBeast, {
    property: "eyesOfTheBeast",
    description: locale.disciplines.protean.eyesOfTheBeast,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.weightOfTheFeather, {
    property: "weightOfTheFeather",
    description: locale.disciplines.protean.weightOfTheFeather,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.feralWeapons, {
    property: "feralWeapons",
    description: locale.disciplines.protean.feralWeapons,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.vicissitude, {
    property: "vicissitude",
    description: locale.disciplines.protean.vicissitude,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.earthMeld, {
    property: "earthMeld",
    description: locale.disciplines.protean.earthMeld,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.shapechange, {
    property: "shapechange",
    description: locale.disciplines.protean.shapechange,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.fleshcrafting, {
    property: "fleshcrafting",
    description: locale.disciplines.protean.fleshcrafting,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.metamorphosis, {
    property: "metamorphosis",
    description: locale.disciplines.protean.metamorphosis,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.horridForm, {
    property: "horridForm",
    description: locale.disciplines.protean.horridForm,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.mistForm, {
    property: "mistForm",
    description: locale.disciplines.protean.mistForm,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.theUnfetteredHeart, {
    property: "theUnfetteredHeart",
    description: locale.disciplines.protean.theUnfetteredHeart,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.protean.oneWithTheLand, {
    property: "oneWithTheLand",
    description: locale.disciplines.protean.oneWithTheLand,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.obfuscate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.name}`,
  solve: buildCharacterDisciplineSolver("obfuscate"),
  options: option(locale.disciplines.obfuscate.cloakOfShadows, {
    property: "cloakOfShadows",
    description: locale.disciplines.obfuscate.cloakOfShadows,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.silenceOfDeath, {
    property: "silenceOfDeath",
    description: locale.disciplines.obfuscate.silenceOfDeath,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.unseenPassage, {
    property: "unseenPassage",
    description: locale.disciplines.obfuscate.unseenPassage,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.chimerstry, {
    property: "chimerstry",
    description: locale.disciplines.obfuscate.chimerstry,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.ghostInTheMachine, {
    property: "ghostInTheMachine",
    description: locale.disciplines.obfuscate.ghostInTheMachine,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.maskOfAThousandFaces, {
    property: "maskOfAThousandFaces",
    description: locale.disciplines.obfuscate.maskOfAThousandFaces,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.fataMorgana, {
    property: "fataMorgana",
    description: locale.disciplines.obfuscate.fataMorgana,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.conceal, {
    property: "conceal",
    description: locale.disciplines.obfuscate.conceal,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.vanish, {
    property: "vanish",
    description: locale.disciplines.obfuscate.vanish,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.cloakTheGathering, {
    property: "cloakTheGathering",
    description: locale.disciplines.obfuscate.cloakTheGathering,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.obfuscate.impostorsGuise, {
    property: "impostorsGuise",
    description: locale.disciplines.obfuscate.impostorsGuise,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.potence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.potence.name}`,
  solve: buildCharacterDisciplineSolver("potence"),
  options: option(locale.disciplines.potence.lethalBody, {
    property: "lethalBody",
    description: locale.disciplines.potence.lethalBody,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.soaringLeap, {
    property: "soaringLeap",
    description: locale.disciplines.potence.soaringLeap,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.prowess, {
    property: "prowess",
    description: locale.disciplines.potence.prowess,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.brutalFeed, {
    property: "brutalFeed",
    description: locale.disciplines.potence.brutalFeed,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.sparkOfRage, {
    property: "sparkOfRage",
    description: locale.disciplines.potence.sparkOfRage,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.uncannyGrip, {
    property: "uncannyGrip",
    description: locale.disciplines.potence.uncannyGrip,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.draughtOfMight, {
    property: "draughtOfMight",
    description: locale.disciplines.potence.draughtOfMight,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.earthshock, {
    property: "earthshock",
    description: locale.disciplines.potence.earthshock,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.potence.fistOfCaine, {
    property: "fistOfCaine",
    description: locale.disciplines.potence.fistOfCaine,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.presence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.presence.name}`,
  solve: buildCharacterDisciplineSolver("presence"),
  options: option(locale.disciplines.presence.awe, {
    property: "awe",
    description: locale.disciplines.presence.awe,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.daunt, {
    property: "daunt",
    description: locale.disciplines.presence.daunt,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.eyesOfTheSerpent, {
    property: "eyesOfTheSerpent",
    description: locale.disciplines.presence.eyesOfTheSerpent,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.lingeringKiss, {
    property: "lingeringKiss",
    description: locale.disciplines.presence.lingeringKiss,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.dreadGaze, {
    property: "dreadGaze",
    description: locale.disciplines.presence.dreadGaze,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.entrancement, {
    property: "entrancement",
    description: locale.disciplines.presence.entrancement,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.irresistibleVoice, {
    property: "irresistibleVoice",
    description: locale.disciplines.presence.irresistibleVoice,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.summon, {
    property: "summon",
    description: locale.disciplines.presence.summon,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.majesty, {
    property: "majesty",
    description: locale.disciplines.presence.majesty,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.presence.starMagnetism, {
    property: "starMagnetism",
    description: locale.disciplines.presence.starMagnetism,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.celerity.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.celerity.name}`,
  solve: buildCharacterDisciplineSolver("celerity"),
  options: option(locale.disciplines.celerity.catsGrace, {
    property: "catsGrace",
    description: locale.disciplines.celerity.catsGrace,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.rapidReflexes, {
    property: "rapidReflexes",
    description: locale.disciplines.celerity.rapidReflexes,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.fleetness, {
    property: "fleetness",
    description: locale.disciplines.celerity.fleetness,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.blink, {
    property: "blink",
    description: locale.disciplines.celerity.blink,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.traversal, {
    property: "traversal",
    description: locale.disciplines.celerity.traversal,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.draughtOfElegance, {
    property: "draughtOfElegance",
    description: locale.disciplines.celerity.draughtOfElegance,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.unerringAim, {
    property: "unerringAim",
    description: locale.disciplines.celerity.unerringAim,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.lightningStrike, {
    property: "lightningStrike",
    description: locale.disciplines.celerity.lightningStrike,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.celerity.splitSecond, {
    property: "splitSecond",
    description: locale.disciplines.celerity.splitSecond,
    type: CommandOptionType.BOOLEAN,
  }).build,
};

commands[treatKey(locale.disciplines.rituals.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.rituals.name}`,
  solve: buildCharacterDisciplineSolver("rituals"),
  options: option(locale.commands.sheet.common.name, {
    property: "common",
    description: locale.commands.sheet.common.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.bloodWalk, {
      property: "bloodWalk",
      description: locale.disciplines.rituals.bloodWalk,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.clingingOfTheInsect, {
      property: "clingingOfTheInsect",
      description: locale.disciplines.rituals.clingingOfTheInsect,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.craftBloodstone, {
      property: "craftBloodstone",
      description: locale.disciplines.rituals.craftBloodstone,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wakeWithEveningsFreshness, {
      property: "wakeWithEveningsFreshness",
      description: locale.disciplines.rituals.wakeWithEveningsFreshness,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.communicateWithKindredSire, {
      property: "communicateWithKindredSire",
      description: locale.disciplines.rituals.communicateWithKindredSire,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.eyesOfBabel, {
      property: "eyesOfBabel",
      description: locale.disciplines.rituals.eyesOfBabel,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.illuminateTheTrailOfPrey, {
      property: "illuminateTheTrailOfPrey",
      description: locale.disciplines.rituals.illuminateTheTrailOfPrey,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.ishtarsTouch, {
      property: "ishtarsTouch",
      description: locale.disciplines.rituals.ishtarsTouch,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.truthOfBlood, {
      property: "truthOfBlood",
      description: locale.disciplines.rituals.truthOfBlood,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.dagonsCall, {
      property: "dagonsCall",
      description: locale.disciplines.rituals.dagonsCall,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.deflectionOfWoodenDoom, {
      property: "deflectionOfWoodenDoom",
      description: locale.disciplines.rituals.deflectionOfWoodenDoom,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.essenceOfAir, {
      property: "essenceOfAir",
      description: locale.disciplines.rituals.essenceOfAir,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.firewalker, {
      property: "firewalker",
      description: locale.disciplines.rituals.firewalker,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.oneWithTheBlade, {
      property: "oneWithTheBlade",
      description: locale.disciplines.rituals.oneWithTheBlade,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.defenseOfTheSacredHaven, {
      property: "defenseOfTheSacredHaven",
      description: locale.disciplines.rituals.defenseOfTheSacredHaven,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.eyesOfTheNighthawk, {
      property: "eyesOfTheNighthawk",
      description: locale.disciplines.rituals.eyesOfTheNighthawk,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.incorporealPassage, {
      property: "incorporealPassage",
      description: locale.disciplines.rituals.incorporealPassage,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.escapeToTrueSanctuary, {
      property: "escapeToTrueSanctuary",
      description: locale.disciplines.rituals.escapeToTrueSanctuary,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.heartOfStone, {
      property: "heartOfStone",
      description: locale.disciplines.rituals.heartOfStone,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.shaftOfBelatedDissolution, {
      property: "shaftOfBelatedDissolution",
      description: locale.disciplines.rituals.shaftOfBelatedDissolution,
      type: CommandOptionType.BOOLEAN,
    }).build,
  }).option(locale.commands.sheet.wards.name, {
    property: "wards",
    description: locale.commands.sheet.wards.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.wardAgainstGhouls, {
      property: "wardAgainstGhouls",
      description: locale.disciplines.rituals.wardAgainstGhouls,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardAgainstSpirits, {
      property: "wardAgainstSpirits",
      description: locale.disciplines.rituals.wardAgainstSpirits,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardAgainstLupines, {
      property: "wardAgainstLupines",
      description: locale.disciplines.rituals.wardAgainstLupines,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardAgainstCainites, {
      property: "wardAgainstCainites",
      description: locale.disciplines.rituals.wardAgainstCainites,
      type: CommandOptionType.BOOLEAN,
    }).build,
  }).option(locale.commands.sheet.circles.name, {
    property: "circles",
    description: locale.commands.sheet.circles.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.wardingCircleAgainstGhouls, {
      property: "wardingCircleAgainstGhouls",
      description: locale.disciplines.rituals.wardingCircleAgainstGhouls,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardingCircleAgainstSpirits, {
      property: "wardingCircleAgainstSpirits",
      description: locale.disciplines.rituals.wardingCircleAgainstSpirits,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardingCircleAgainstLupines, {
      property: "wardingCircleAgainstLupines",
      description: locale.disciplines.rituals.wardingCircleAgainstLupines,
      type: CommandOptionType.BOOLEAN,
    }).option(locale.disciplines.rituals.wardingCircleAgainstCainites, {
      property: "wardingCircleAgainstCainites",
      description: locale.disciplines.rituals.wardingCircleAgainstCainites,
      type: CommandOptionType.BOOLEAN,
    }).build,
  }).build,
};

commands[treatKey(locale.disciplines.thinBloodAlchemy.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.name}`,
  solve: buildCharacterDisciplineSolver("thinBloodAlchemy"),
  options: option(locale.disciplines.thinBloodAlchemy.farReach, {
    property: "farReach",
    description: locale.disciplines.thinBloodAlchemy.farReach,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.haze, {
    property: "haze",
    description: locale.disciplines.thinBloodAlchemy.haze,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.envelop, {
    property: "envelop",
    description: locale.disciplines.thinBloodAlchemy.envelop,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.profaneHierosGamos, {
    property: "profaneHierosGamos",
    description: locale.disciplines.thinBloodAlchemy.profaneHierosGamos,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.defractionate, {
    property: "defractionate",
    description: locale.disciplines.thinBloodAlchemy.defractionate,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.airborneMomentum, {
    property: "airborneMomentum",
    description: locale.disciplines.thinBloodAlchemy.airborneMomentum,
    type: CommandOptionType.BOOLEAN,
  }).option(locale.disciplines.thinBloodAlchemy.awakenTheSleeper, {
    property: "awakenTheSleeper",
    description: locale.disciplines.thinBloodAlchemy.awakenTheSleeper,
    type: CommandOptionType.BOOLEAN,
  }).build,
};
