import { AdvantageFlaw, Character } from "../../character.ts";
import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { commands, treatKey, CommandOptions, CommandOptionType, option, value, property } from "./common.ts";

export function advantageFlawParse(get: (character: Character) => AdvantageFlaw): 
(character: Character, input: { 
  create?: { name: string; value: number }, 
  edit?: { index: number; value: number }}) => void {
  return (c, input) => {
    const advantageFlaw = get(c);

    if (input.create) {
      if (advantageFlaw[input.create.name] == undefined) {
        advantageFlaw[input.create.name] = input.create.value;
      }
    }
    else {
      let index = 1;
      for (const key in advantageFlaw) {
        const edit = input.edit!;
        if (index == edit.index) {
          if (edit.value == 0) {
            delete advantageFlaw[key];
          }
          else {
            advantageFlaw[key] = edit.value;
          }
          break;
        }
        index++;
      }
    }
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
  solve: buildCharacterSolver(advantageFlawParse(c => c.advantages)),
  options: buildAdvantageFlawOptions(),
};

commands[treatKey(locale.flaws)] = {
  description: `${locale.commands.sheet.description} ${locale.flaws}`,
  solve: buildCharacterSolver(advantageFlawParse(c => c.flaws)),
  options: buildAdvantageFlawOptions(),
};