import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  buildIntegerOptions,
  commands,
  parseNumberFieldWithSpent,
  treatKey,
} from "./common.ts";

const multiplier = 3;

commands[treatKey(locale.skills.mental.science)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.science}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.science,
      (c, v) => c.skills.mental.science = v,
      multiplier,
    ),
    false,
  ),
};
/*commands[treatKey(locale.skills.mental.academics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.academics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.academics,
      (c, v) => c.skills.mental.academics = v,
      multiplier,
    ),
    false,
  ),
};*/
commands[treatKey(locale.skills.mental.finance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.finance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.finance,
      (c, v) => c.skills.mental.finance = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.mental.investigation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.investigation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.investigation,
      (c, v) => c.skills.mental.investigation = v,
      multiplier,
    ),
    false,
  ),
};
/*
commands[treatKey(locale.skills.mental.medicine)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.medicine}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.medicine,
      (c, v) => c.skills.mental.medicine = v,
      multiplier,
    ),
    false,
  ),
};*/
commands[treatKey(locale.skills.mental.occult)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.occult}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.occult,
      (c, v) => c.skills.mental.occult = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.mental.awareness)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.awareness}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.awareness,
      (c, v) => c.skills.mental.awareness = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.mental.politics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.politics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.politics,
      (c, v) => c.skills.mental.politics = v,
      multiplier,
    ),
    false,
  ),
};
commands[treatKey(locale.skills.mental.technology)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.technology}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterUpdateSolver(
    parseNumberFieldWithSpent(
      (c) => c.skills.mental.technology,
      (c, v) => c.skills.mental.technology = v,
      multiplier,
    ),
    false,
  ),
};
