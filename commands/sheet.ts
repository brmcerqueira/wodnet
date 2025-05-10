import { detailsModal } from "../custom/module.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  buildChoicesOptions,
  buildIntegerOptions,
  CommandOptionType,
  commands,
  option,
  parseField,
  parseNumberFieldWithSpent,
  property,
  treatKey,
  value,
} from "./common.ts";
import { uploadImage } from "../utils.ts";

commands[treatKey(locale.image)] = {
  description: `${locale.commands.sheet.description} ${locale.image}`,
  options: option(value, {
    property: property,
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.ATTACHMENT,
    required: true,
  }).build,
  solve: buildCharacterUpdateSolver(async (c, i: { value: { url: string } }) => {
    c.image = await uploadImage(i.value.url);
    return 0;
  }, false),
};
commands[treatKey(locale.resonance.name)] = {
  description: `${locale.commands.sheet.description} ${locale.resonance.name}`,
  options: buildChoicesOptions(locale.resonance.options, true),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.resonance = v), false
  ),
};
commands[treatKey(locale.predator.name)] = {
  description: `${locale.commands.sheet.description} ${locale.predator.name}`,
  options: buildChoicesOptions(locale.predator.options),
  solve: buildCharacterUpdateSolver(
    parseField<string>((c, v) => c.predator = v),false
  ),
};
commands[treatKey(locale.clan.name)] = {
  description: `${locale.commands.sheet.description} ${locale.clan.name}`,
  options: buildChoicesOptions(Object.keys(locale.clan.options)),
  solve: buildCharacterUpdateSolver(parseField<string>((c, v) => c.clan = v), false),
};
commands[treatKey(locale.generation.name)] = {
  description: `${locale.commands.sheet.description} ${locale.generation.name}`,
  options: buildIntegerOptions(4, 16),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.generation = v),false
  ),
};
commands[treatKey(locale.bloodPotency)] = {
  description: `${locale.commands.sheet.description} ${locale.bloodPotency}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent((c) => c.bloodPotency, (c, v) => c.bloodPotency = v, 10),false
  ),
};
commands[treatKey(locale.hunger)] = {
  description: `${locale.commands.sheet.description} ${locale.hunger}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(parseField<number>((c, v) => c.hungerOrRage = v), false),
};
commands[treatKey(locale.humanity)] = {
  description: `${locale.commands.sheet.description} ${locale.humanity}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.humanity.total = v),false
  ),
};
commands[treatKey(locale.stains)] = {
  description: `${locale.commands.sheet.description} ${locale.stains}`,
  options: buildIntegerOptions(0, 10),
  solve: buildCharacterUpdateSolver(
    parseField<number>((c, v) => c.humanity.stains = v),false
  ),
};
commands[treatKey(locale.commands.detailsModal.name)] = {
  description: locale.commands.detailsModal.description,
  solve: detailsModal,
};