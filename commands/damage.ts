import { Character, Damage } from "../character.ts";
import { DamageInput } from "../custom/module.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  booleanChoices,
  CommandOptions,
  CommandOptionType,
  commands,
  option,
  parseField,
  property,
  treatKey,
  value,
} from "./common.ts";

function buildDamageOptions(): CommandOptions {
  return option(locale.damage.superficial, {
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
  }).option(locale.damage.add, {
    property: "add",
    description: locale.damage.add,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build;
}

export function damageParse(
  get: (character: Character) => Damage,
): (
  character: Character,
  input: DamageInput,
) => number {
  return (c, i) => {
    const damage = get(c);
    if (i.superficial !== undefined) {
      if (i.add === undefined || i.add) {
        damage.superficial += i.superficial;
      } else {
        damage.superficial = i.superficial;
      }
    }

    if (i.aggravated !== undefined) {
      if (i.add === undefined || i.add) {
        damage.aggravated += i.aggravated;
      } else {
        damage.aggravated = i.aggravated;
      }
    }
    return 0;
  };
}

commands[treatKey(locale.health)] = {
  description: `${locale.commands.sheet.description} ${locale.health}`,
  options: buildDamageOptions(),
  solve: buildCharacterUpdateSolver(damageParse((c) => c.health)),
};

commands[treatKey(locale.healthStart)] = {
  description: `${locale.commands.sheet.description} ${locale.healthStart}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.INTEGER,
    required: true,
    minValue: 3,
  }).build,
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.health.start = v),
  ),
};

commands[treatKey(locale.willpower)] = {
  description: `${locale.commands.sheet.description} ${locale.willpower}`,
  options: buildDamageOptions(),
  solve: buildCharacterUpdateSolver(damageParse((c) => c.willpower)),
};
