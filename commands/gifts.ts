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

const multiplier = 5;

type GiftKey = Exclude<keyof LocaleType["gifts"], "name">;

function giftParse(
  key: GiftKey,
): (character: Character, input: Level) => number {
  const levels: Record<string, number> = {};

  const group = locale.gifts[key] as Record<string, any>;
  for (const groupKey in group) {
    if (groupKey !== "name") {
      const groupLevel = group[groupKey] as Record<string, any>;

      let level = 0;

      switch (groupKey) {
        case "one":
          level = 1;
          break;
        case "two":
          level = 2;
          break;
        case "three":
          level = 3;
          break;
        case "four":
          level = 4;
          break;
        case "five":
          level = 5;
          break;
        case "six":
          level = 6;
          break;
        case "seven":
          level = 7;
          break;
        case "eight":
          level = 8;
          break;
        case "nine":
          level = 9;
          break;
      }

      for (const key in groupLevel) {
        levels[key] = level;
      }
    }
  }

  return (c, input) => {
    const index = c.gifts.indexOf(input.level);

    const level = levels[input.level];

    if (input.value) {
      if (index == -1) {
        c.gifts.push(input.level);
        return calculateSpent(0, level, multiplier);
      }
    } else if (index > -1) {
      c.gifts.splice(index, 1);
      return calculateSpent(level, 0, multiplier);
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
      const groupLevel = group[groupKey] as Record<string, any>;

      for (const key in groupLevel) {
        choices.push({
          name: groupLevel[key],
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
commands[treatKey(locale.gifts.ragabash.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.ragabash.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("ragabash"),
    false,
  ),
  options: buildGiftOptions("ragabash"),
};
commands[treatKey(locale.gifts.theurge.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.theurge.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("theurge"),
    false,
  ),
  options: buildGiftOptions("theurge"),
};
commands[treatKey(locale.gifts.philodox.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.philodox.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("philodox"),
    false,
  ),
  options: buildGiftOptions("philodox"),
};
commands[treatKey(locale.gifts.galliard.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.galliard.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("galliard"),
    false,
  ),
  options: buildGiftOptions("galliard"),
};
commands[treatKey(locale.gifts.ahroun.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.ahroun.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("ahroun"),
    false,
  ),
  options: buildGiftOptions("ahroun"),
};
commands[treatKey(locale.gifts.blackFuries.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.blackFuries.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("blackFuries"),
    false,
  ),
  options: buildGiftOptions("blackFuries"),
};
commands[treatKey(locale.gifts.boneGnawers.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.boneGnawers.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("boneGnawers"),
    false,
  ),
  options: buildGiftOptions("boneGnawers"),
};
commands[treatKey(locale.gifts.childrenOfGaia.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.childrenOfGaia.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("childrenOfGaia"),
    false,
  ),
  options: buildGiftOptions("childrenOfGaia"),
};
commands[treatKey(locale.gifts.galestalkers.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.galestalkers.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("galestalkers"),
    false,
  ),
  options: buildGiftOptions("galestalkers"),
};
commands[treatKey(locale.gifts.ghostCouncil.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.ghostCouncil.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("ghostCouncil"),
    false,
  ),
  options: buildGiftOptions("ghostCouncil"),
};
commands[treatKey(locale.gifts.glassWalkers.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.glassWalkers.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("glassWalkers"),
    false,
  ),
  options: buildGiftOptions("glassWalkers"),
};
commands[treatKey(locale.gifts.hartWardens.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.hartWardens.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("hartWardens"),
    false,
  ),
  options: buildGiftOptions("hartWardens"),
};
commands[treatKey(locale.gifts.redTalons.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.redTalons.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("redTalons"),
    false,
  ),
  options: buildGiftOptions("redTalons"),
};
commands[treatKey(locale.gifts.shadowLords.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.shadowLords.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("shadowLords"),
    false,
  ),
  options: buildGiftOptions("shadowLords"),
};
commands[treatKey(locale.gifts.silentStriders.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.silentStriders.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("silentStriders"),
    false,
  ),
  options: buildGiftOptions("silentStriders"),
};
commands[treatKey(locale.gifts.silverFangs.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.gifts.silverFangs.name}`,
  solve: buildCharacterUpdateSolver(
    giftParse("silverFangs"),
    false,
  ),
  options: buildGiftOptions("silverFangs"),
};
