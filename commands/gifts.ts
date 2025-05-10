// deno-lint-ignore-file no-explicit-any
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { LocaleType } from "../i18n/localeType.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  booleanChoices,
  calculateSpent,
  CommandChoice,
  CommandOptions,
  CommandOptionType,
  commands,
  Level,
  option,
  property,
  treatKey,
} from "./common.ts";

type GiftKey = Exclude<keyof LocaleType["gifts"], "name">;

function giftParse(
  key: GiftKey,
): (character: Character, input: Level) => number {
  const levelCost: Record<string, number> = {};

  const group = locale.gifts[key] as Record<string, any>;
  for (const groupKey in group) {
    if (groupKey !== "name") {
      const item = group[groupKey] as Record<string, any>;

      let itemCost = 0;

      switch (groupKey) {
        case "one":
          itemCost = 1;
          break;
        case "two":
          itemCost = 2;
          break;
        case "three":
          itemCost = 3;
          break;
        case "four":
          itemCost = 4;
          break;
        case "five":
          itemCost = 5;
          break;
        case "six":
          itemCost = 6;
          break;
        case "seven":
          itemCost = 7;
          break;
        case "eight":
          itemCost = 8;
          break;
        case "nine":
          itemCost = 9;
          break;
      }

      for (const key in item) {
        levelCost[key] = itemCost;
      }
    }
  }

  return (c, input) => {
    const index = c.gifts.indexOf(input.level);

    const value = levelCost[input.level];

    if (input.value) {
      if (index == -1) {
        c.gifts.push(input.level);
        return calculateSpent(0, value, 5);
      }
    } else if (index > -1) {
      c.gifts.splice(index, 1);
      return calculateSpent(value, 0, 5);
    }

    return 0;
  };
}

function buildGiftOptions(
  key: GiftKey,
): CommandOptions {
  const choices: CommandChoice[] = [];
  const group = locale.gifts[key] as Record<string, any>;
  for (const groupKey in group) {
    if (groupKey !== "name") {
      const item = group[groupKey] as Record<string, any>;

      for (const key in item) {
        choices.push({
          name: item[key],
          value: key,
        });
      }
    }
  }

  return option(locale.commands.sheet.level.name, {
    property: "level",
    description: locale.commands.sheet.level.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: choices,
  }).option(locale.commands.sheet.value.name, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: booleanChoices(),
  }).build;
}

commands[treatKey(locale.gifts.native.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.native.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("native"),
    false,
  ),
  options: buildGiftOptions("native"),
};
