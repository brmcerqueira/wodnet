import { Character } from "../../character.ts";
import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
  buildChoicesOptions,
  buildIntegerOptions,
  CommandOptionType,
  commands,
  option,
  parseNumberField,
  property,
  treatKey,
  value,
} from "./common.ts";

function parseField<T>(
  set: (character: Character, value: T) => void,
): (character: Character, input: { value: T }) => number {
  return (character, input) => {
    set(character, input.value);
    return 0;
  };
}

commands[treatKey(locale.name)] = {
  description: `${locale.commands.sheet.description} ${locale.name}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver(parseField<string>((c, v) => c.name = v)),
};
commands[treatKey(locale.image)] = {
  description: `${locale.commands.sheet.description} ${locale.image}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.ATTACHMENT,
    required: true,
  }).build,
  solve: buildCharacterSolver((c, i: { value: { url: string } }) => {
    c.image = i.value.url;
    return 0;
  }),
};
commands[treatKey(locale.player)] = {
  description: `${locale.commands.sheet.description} ${locale.player}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver(parseField<string>((c, v) => c.player = v)),
};
commands[treatKey(locale.resonance.name)] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options, true),
  solve: buildCharacterSolver(
    parseField<string>((c, v) => c.resonance = v),
  ),
};
commands[treatKey(locale.ambition)] = {
  description: `${locale.commands.sheet.description} ${locale.ambition}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver(
    parseField<string>((c, v) => c.ambition = v),
  ),
};
commands[treatKey(locale.desire)] = {
  description: `${locale.commands.sheet.description} ${locale.desire}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver(parseField<string>((c, v) => c.desire = v)),
};
commands[treatKey(locale.predator.name)] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterSolver(
    parseField<string>((c, v) => c.predator = v),
  ),
};
commands[treatKey(locale.clan.name)] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(Object.keys(locale.clan.options)),
  solve: buildCharacterSolver(parseField<string>((c, v) => c.clan = v)),
};
commands[treatKey(locale.generation.name)] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterSolver(
    parseField<number>((c, v) => c.generation = v),
  ),
};
commands[treatKey(locale.details)] = {
  description: `${locale.commands.sheet.description} ${locale.details}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver(
    parseField<string>((c, v) => c.details = v),
  ),
};
commands[treatKey(locale.bloodPotency)] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver(
    parseNumberField((c) => c.bloodPotency, (c, v) => c.bloodPotency = v, 10),
  ),
};
commands[treatKey(locale.hunger)] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(parseField<number>((c, v) => c.hunger = v)),
};
commands[treatKey(locale.humanity)] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver(
    parseField<number>((c, v) => c.humanity.total = v),
  ),
};
commands[treatKey(locale.stains)] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver(
    parseField<number>((c, v) => c.humanity.stains = v),
  ),
};
