import { locale } from "../i18n/locale.ts";
import { keys } from "../utils.ts";
import { actionAutocompleteSolver } from "../solver/actionAutocompleteSolver.ts";
import { characterSolver } from "../solver/characterSolver.ts";
import { characterLinkSolver } from "../solver/characterLinkSolver.ts";
import { dicePoolSolver } from "../solver/dicePoolSolver.ts";
import { rollSolver } from "../solver/rollSolver.ts";
import { setDifficultySolver } from "../solver/setDifficultySolver.ts";
import { setModifierSolver } from "../solver/setModifierSolver.ts";
import {
booleanChoices,
  buildChoices,
  CommandOptionType,
  commands,
  option,
  treatKey,
} from "./common.ts";
import { CharacterMode } from "../character.ts";
import { setStorytellerSolver } from "../solver/setStorytellerSolver.ts";
import { checkSolver } from "../solver/checkSolver.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";

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
commands[treatKey(locale.commands.check.name)] = {
  description: locale.commands.check.description,
  solve: checkSolver,
  options: option(locale.commands.check.dices.name, {
    property: "dices",
    description: locale.commands.check.dices.description,
    type: CommandOptionType.INTEGER,
    required: false,
    minValue: 1,
    maxValue: 5,
  }).build,
};
commands[treatKey(locale.commands.sheet.link.name)] = {
  description: locale.commands.sheet.link.description,
  solve: characterLinkSolver,
};
commands[treatKey(locale.commands.import.name)] = {
  description: locale.commands.import.description,
  solve: buildCharacterUpdateSolver((c, i: { json: string }) => {
    Object.assign(c, JSON.parse(i.json));
    return 0;
  }, true),
  options: option(locale.commands.import.json.name, {
    property: "json",
    description: locale.commands.import.json.description,
    type: CommandOptionType.STRING,
    required: true,
    minLength: 1,
    maxLength: 6000
  }).build,
};
commands[treatKey(locale.commands.setStoryteller.name)] = {
  description: locale.commands.setStoryteller.description,
  solve: setStorytellerSolver,
  options: option(locale.commands.setStoryteller.user.name, {
    property: "user",
    description: locale.commands.setStoryteller.user.description,
    type: CommandOptionType.USER,
    required: true
  }).build,
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
commands[treatKey(locale.commands.character.name)] = {
  description: locale.commands.character.description,
  solve: characterSolver,
  options: option(locale.commands.character.clear.name, {
    property: "clear",
    description: locale.commands.character.clear.description,
    type: CommandOptionType.SUB_COMMAND,
  }).option(locale.commands.character.choose.name, {
    property: "choose",
    description: locale.commands.character.choose.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.character.characterArg.name, {
      property: "character",
      description: locale.commands.character.characterArg.description,
      type: CommandOptionType.STRING,
      required: true,
      autocomplete: true,
    }).option(locale.commands.character.choose.link.name, {
      property: "link",
      description: locale.commands.character.choose.link.description,
      type: CommandOptionType.STRING, 
      choices: booleanChoices(),
    }).build,
  }).option(locale.commands.character.mode.name, {
    property: "mode",
    description: locale.commands.character.mode.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.character.mode.value.name, {
      property: "value",
      description: locale.commands.character.mode.value.description,
      type: CommandOptionType.STRING,
      required: true,
      choices: keys(CharacterMode).filter(item => Number(item) >= 0).map((key) => {
        return {
          name: locale.mode[key as unknown as number],
          value: key,
        };
      }),
    }).option(locale.commands.character.characterArg.name, {
      property: "character",
      description: locale.commands.character.characterArg.description,
      type: CommandOptionType.STRING,
      autocomplete: true,
    }).build
  }).option(locale.commands.character.remove.name, {
    property: "remove",
    description: locale.commands.character.remove.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.character.characterArg.name, {
      property: "character",
      description: locale.commands.character.characterArg.description,
      type: CommandOptionType.STRING,
      required: true,
      autocomplete: true,
    }).build,
  }).build,
};