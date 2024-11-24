import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
  CommandOptions,
  CommandOptionType,
  commands,
  option,
  property,
  treatKey,
  value,
} from "./common.ts";

const multiplier = 3;

export function advantageFlawParse(
  advantages: boolean,
): (character: Character, input: {
  create?: { name: string; value: number };
  edit?: { index: number; value: number };
}) => number {
  return (c, input) => {
    let spent = 0;
    const advantageFlaw = advantages ? c.advantages : c.flaws;

    if (input.create) {
      if (advantageFlaw[input.create.name] == undefined) {
        advantageFlaw[input.create.name] = input.create.value;
        spent = input.create.value * multiplier;
      }
    } else {
      let index = 1;
      for (const key in advantageFlaw) {
        const edit = input.edit!;
        if (index == edit.index) {
          const old = advantageFlaw[key];
          if (edit.value == 0) {
            delete advantageFlaw[key];
          } else {
            advantageFlaw[key] = edit.value;    
          }
          spent = (edit.value - old) * multiplier;
          break;
        }
        index++;
      }
    }

    return spent;
  };
}

export function buildAdvantageFlawOptions(): CommandOptions {
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

commands[treatKey(locale.advantages)] = {
  description: `${locale.commands.sheet.description} ${locale.advantages}`,
  solve: buildCharacterSolver(advantageFlawParse(true)),
  options: buildAdvantageFlawOptions(),
};

commands[treatKey(locale.flaws)] = {
  description: `${locale.commands.sheet.description} ${locale.flaws}`,
  solve: buildCharacterSolver(advantageFlawParse(false)),
  options: buildAdvantageFlawOptions(),
};
