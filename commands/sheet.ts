import { detailsModal } from "../custom/module.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  apply,
  attributeChoices,
  booleanChoices,
  buildChoicesOptions,
  buildIntegerOptions,
  BuildOptions,
  calculateSpent,
  CommandChoice,
  CommandOptions,
  CommandOptionType,
  commands,
  option,
  parseField,
  parseNumberFieldWithSpent,
  property,
  treatKey,
  value,
} from "./common.ts";
import { keys, uploadImage } from "../utils.ts";
import { Character, CharacterKind } from "../character.ts";
import { LocaleType } from "../i18n/localeType.ts";

type NumberValueInput = { value: number };

type AttributesPhysicalType = keyof Character["attributes"]["physical"];
type AttributesSocialType = keyof Character["attributes"]["social"];
type AttributesMentalType = keyof Character["attributes"]["mental"];
type AttributesType =
  | AttributesPhysicalType
  | AttributesSocialType
  | AttributesMentalType;

type SkillsPhysicalType = keyof Character["skills"]["physical"];
type SkillsSocialType = keyof Character["skills"]["social"];
type SkillsMentalType = keyof Character["skills"]["mental"];

type RiteInput = { rite: string; value: boolean }

const skillsMultiple = 3;
const ritesCost = 5;

function buildSkillOptions(
  key: Exclude<keyof LocaleType["skills"], "name">,
): CommandOptions {
  const result = new BuildOptions();
  const group = locale.skills[key] as Record<string, string>;

  for (const key in group) {
    const item = group[key];
    result.option(item, {
      property: key,
      description: `${locale.commands.sheet.description} ${item}`,
      type: CommandOptionType.SUB_COMMAND,
      options: buildIntegerOptions(0, 5),
    });
  }

  return result.build;
}

function buildRitesOptions(key: Exclude<keyof LocaleType["rites"], "name">,): CommandOptions {
  const choices: CommandChoice[] = [];
  const group = locale.rites[key] as Record<string, string>;

  for (const key in group) {
    if (key !== "name") {
      choices.push({
        name: group[key],
        value: key
      })
    }
  }

  return option(locale.commands.sheet.rite.name, {
    property: "rite",
    description: locale.commands.sheet.rite.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: choices,
  }).option(locale.commands.sheet.value.name, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: booleanChoices(),
  }).build
}

commands[treatKey(locale.kind.name)] = {
  description: `${locale.commands.sheet.description} ${locale.kind.name}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: keys(CharacterKind).filter((item) => Number(item) >= 0).map(
      (key) => {
        return {
          name: locale.kind.options[key as unknown as number],
          value: key,
        };
      },
    ),
  }).build,
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) =>
      c.kind = CharacterKind[
        CharacterKind[
          parseInt(v)
        ] as keyof typeof CharacterKind
      ]
    ),
    false,
  ),
};
commands[treatKey(locale.commands.detailsModal.name)] = {
  description: locale.commands.detailsModal.description,
  solve: detailsModal,
};
commands[treatKey(locale.image)] = {
  description: `${locale.commands.sheet.description} ${locale.image}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.ATTACHMENT,
    required: true,
  }).build,
  solve: buildCharacterUpdateSolver(
    async (c, i: { value: { url: string } }) => {
      c.image = await uploadImage(i.value.url);
      return 0;
    },
    false,
  ),
};
commands[treatKey(locale.attributes.name)] = {
  description: `${locale.commands.sheet.description} ${locale.attributes.name}`,
  options: apply((builder) => {
    for (const item of attributeChoices) {
      builder.option(item.name, {
        property: item.value,
        description: `${locale.commands.sheet.description} ${item.name}`,
        type: CommandOptionType.SUB_COMMAND,
        options: buildIntegerOptions(0, 5),
      });
    }
  }).build,
  solve: buildCharacterUpdateSolver(
    (character, input: Record<AttributesType, NumberValueInput>) => {
      const key = Object.keys(input)[0];

      let group: Record<string, number>;

      if (
        character.attributes.physical[key as AttributesPhysicalType] !==
          undefined
      ) {
        group = character.attributes["physical"];
      } else if (
        character.attributes.social[key as AttributesSocialType] !== undefined
      ) {
        group = character.attributes["social"];
      } else if (
        character.attributes.mental[key as AttributesMentalType] !== undefined
      ) {
        group = character.attributes["mental"];
      }

      const old = group![key];

      const value = input[key as AttributesType].value;

      group![key] = value;

      return calculateSpent(old, value, 5);
    },
    false,
  ),
};
commands[treatKey(locale.skills.name)] = {
  description: `${locale.commands.sheet.description} ${locale.skills.name}`,
  options: option(locale.physical, {
    property: "physical",
    description: `${locale.commands.sheet.description} ${locale.physical}`,
    type: CommandOptionType.SUB_COMMAND_GROUP,
    options: buildSkillOptions("physical"),
  }).option(locale.social, {
    property: "social",
    description: `${locale.commands.sheet.description} ${locale.social}`,
    type: CommandOptionType.SUB_COMMAND_GROUP,
    options: buildSkillOptions("social"),
  }).option(locale.mental, {
    property: "mental",
    description: `${locale.commands.sheet.description} ${locale.mental}`,
    type: CommandOptionType.SUB_COMMAND_GROUP,
    options: buildSkillOptions("mental"),
  }).build,
  solve: buildCharacterUpdateSolver((character, input: {
    physical?: Record<SkillsPhysicalType, NumberValueInput>;
    social?: Record<SkillsSocialType, NumberValueInput>;
    mental?: Record<SkillsMentalType, NumberValueInput>;
  }) => {
    if (input.physical) {
      const key = Object.keys(input.physical)[0] as SkillsPhysicalType;

      const old = character.skills.physical[key];

      const value = input.physical[key].value;

      character.skills.physical[key] = value;

      return calculateSpent(old, value, skillsMultiple);
    } else if (input.social) {
      const key = Object.keys(input.social)[0] as SkillsSocialType;

      const old = character.skills.social[key];

      const value = input.social[key].value;

      character.skills.social[key] = value;

      return calculateSpent(old, value, skillsMultiple);
    } else if (input.mental) {
      const key = Object.keys(input.mental)[0] as SkillsMentalType;

      const old = character.skills.mental[key];

      const value = input.mental[key].value;

      character.skills.mental[key] = value;

      return calculateSpent(old, value, skillsMultiple);
    }

    return 0;
  }, false),
};
//Vampire
commands[treatKey(locale.resonance.name)] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options, true),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.resonance = v),
    false,
  ),
};
commands[treatKey(locale.predator.name)] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.predator = v),
    false,
  ),
};
commands[treatKey(locale.clan.name)] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(Object.keys(locale.clan.options)),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.clan = v),
    false,
  ),
};
commands[treatKey(locale.generation.name)] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.generation = v),
    false,
  ),
};
commands[treatKey(locale.bloodPotency)] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.bloodPotency,
      (c, v) => c.bloodPotency = v,
      10,
    ),
    false,
  ),
};
commands[treatKey(locale.hunger)] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.hungerOrRage = v),
    false,
  ),
};
commands[treatKey(locale.humanity)] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.humanity.total = v),
    false,
  ),
};
commands[treatKey(locale.stains)] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.humanity.stains = v),
    false,
  ),
};
//Werewolf
commands[treatKey(locale.rage)] = {
  description: `${locale.commands.sheet.description} ${locale.rage}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.hungerOrRage = v),
    false,
  ),
};
commands[treatKey(locale.auspice.name)] = {
  description: `${locale.commands.sheet.description} ${locale.auspice.name}`,
  options: buildChoicesOptions(locale.auspice.options),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.auspice = v),
    false,
  ),
};
commands[treatKey(locale.tribe.name)] = {
  description: `${locale.commands.sheet.description} ${locale.tribe.name}`,
  options: buildChoicesOptions(locale.tribe.options),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.tribe = v),
    false,
  ),
};
commands[treatKey(locale.renown.glory)] = {
  description: `${locale.commands.sheet.description} ${locale.renown.glory}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.renown.glory,
      (c, v) => c.renown.glory = v,
      5,
    ),
    false,
  ),
};
commands[treatKey(locale.renown.honor)] = {
  description: `${locale.commands.sheet.description} ${locale.renown.honor}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.renown.honor,
      (c, v) => c.renown.honor = v,
      5,
    ),
    false,
  ),
};
commands[treatKey(locale.renown.wisdom)] = {
  description: `${locale.commands.sheet.description} ${locale.renown.wisdom}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.renown.wisdom,
      (c, v) => c.renown.wisdom = v,
      5,
    ),
    false,
  ),
};
commands[treatKey(locale.harano)] = {
  description: `${locale.commands.sheet.description} ${locale.harano}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.harano = v),
    false,
  ),
};
commands[treatKey(locale.hauglosk)] = {
  description: `${locale.commands.sheet.description} ${locale.hauglosk}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.hauglosk = v),
    false,
  ),
};
commands[treatKey(locale.rites.name)] = {
  description: `${locale.commands.sheet.description} ${locale.rites.name}`,
  options: option(locale.rites.common.name, {
    property: "common",
    description: `${locale.commands.sheet.description} ${locale.rites.common.name}`,
    type: CommandOptionType.SUB_COMMAND,
    options: buildRitesOptions("common"),
  }).option(locale.rites.social.name, {
    property: "social",
    description: `${locale.commands.sheet.description} ${locale.rites.social.name}`,
    type: CommandOptionType.SUB_COMMAND,
    options: buildRitesOptions("social"),
  }).build,
  solve: buildCharacterUpdateSolver((character, input: { common?: RiteInput, social?: RiteInput }) => {
    if (input.common) {
      const index = character.rites.indexOf(input.common.rite);
  
      if (input.common.value) {
        if (index == -1) {
          character.rites.push(input.common.rite);
          return ritesCost;
        }
      } else if (index > -1) {
        character.rites.splice(index, 1);
        return -ritesCost;
      }
    } else if (input.social) {
      const index = character.rites.indexOf(input.social.rite);
  
      if (input.social.value) {
        if (index == -1) {
          character.rites.push(input.social.rite);
        }
      } else if (index > -1) {
        character.rites.splice(index, 1);
      }
    }

    return 0;
  }, false),
};