import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
  buildChoicesOptions,
  buildIntegerOptions,
  CommandOptionType,
  commands,
  option,
  property,
  treatKey,
  value,
} from "./common.ts";

commands[treatKey(locale.name)] = {
  description: `${locale.commands.sheet.description} ${locale.name}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver((c, i: { value: string }) => c.name = i.value),
};
commands[treatKey(locale.image)] = {
  description: `${locale.commands.sheet.description} ${locale.image}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.ATTACHMENT,
    required: true,
  }).build,
  solve: buildCharacterSolver((c, i: { value: { url: string }}) => c.image = i.value.url),
};
commands[treatKey(locale.player)] = {
  description: `${locale.commands.sheet.description} ${locale.player}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
  }).build,
  solve: buildCharacterSolver((c, i: { value: string }) => c.player = i.value),
};
commands[treatKey(locale.resonance.name)] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options, true),
  solve: buildCharacterSolver((c, i: { value: string }) =>
    c.resonance = i.value
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
  solve: buildCharacterSolver((c, i: { value: string }) =>
    c.ambition = i.value
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
  solve: buildCharacterSolver((c, i: { value: string }) => c.desire = i.value),
};
commands[treatKey(locale.predator.name)] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterSolver((c, i: { value: string }) =>
    c.predator = i.value
  ),
};
commands[treatKey(locale.clan.name)] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(locale.clan.options),
  solve: buildCharacterSolver((c, i: { value: string }) => c.clan = i.value),
};
commands[treatKey(locale.generation.name)] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.generation = i.value
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
  solve: buildCharacterSolver((c, i: { value: string }) => c.details = i.value),
};
commands[treatKey(locale.bloodPotency)] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.bloodPotency = i.value
  ),
};
commands[treatKey(locale.hunger)] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) => c.hunger = i.value),
};
commands[treatKey(locale.humanity)] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.humanity.total = i.value
  ),
};
commands[treatKey(locale.stains)] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.humanity.stains = i.value
  ),
};
