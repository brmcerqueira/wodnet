import { detailsModal } from "../custom/module.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  buildChoicesOptions,
  buildIntegerOptions,
  BuildOptions,
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
import { CharacterKind } from "../character.ts";
import { characterSolver } from "../solver/characterSolver.ts";
import { LocaleType } from "../i18n/localeType.ts";

function buildSkillOptions(
  key: Exclude<keyof LocaleType["skills"], "name">,
): CommandOptions {
  const result = new BuildOptions();
  const group = locale.skills[key] as Record<string, string>;

  for (const key in group) {
    const item = group[key];
    result.option(treatKey(item), {
      property: key,
      description: `${locale.commands.sheet.description} ${item}`,
      type: CommandOptionType.SUB_COMMAND,
      options: buildIntegerOptions(0, 5),
    });
  }

  return result.build;
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
commands[treatKey(locale.skills.name)] = {
  description: `${locale.commands.sheet.description} ${locale.skills.name}`,
  solve: characterSolver,
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
};
//vampire
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
//werewolf
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
commands[treatKey(locale.rage)] = {
  description: `${locale.commands.sheet.description} ${locale.rage}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.hungerOrRage = v),
    false,
  ),
};
