import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  buildIntegerOptions,
  commands,
  parseNumberFieldWithSpent,
  treatKey,
} from "./common.ts";

const multiplier = 3;

commands[treatKey(locale.skills.social.animalKen)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.animalKen}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.animalKen,
      (c, v) => c.skills.social.animalKen = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.etiquette)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.etiquette}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.etiquette,
      (c, v) => c.skills.social.etiquette = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.intimidation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.intimidation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.intimidation,
      (c, v) => c.skills.social.intimidation = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.leadership)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.leadership}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.leadership,
      (c, v) => c.skills.social.leadership = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.streetwise)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.streetwise}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.streetwise,
      (c, v) => c.skills.social.streetwise = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.performance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.performance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.performance,
      (c, v) => c.skills.social.performance = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.persuasion)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.persuasion}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.persuasion,
      (c, v) => c.skills.social.persuasion = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.insight)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.insight}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.insight,
      (c, v) => c.skills.social.insight = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.social.subterfuge)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.subterfuge}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.social.subterfuge,
      (c, v) => c.skills.social.subterfuge = v,
      multiplier,
    ),
    false,
  ),
};
