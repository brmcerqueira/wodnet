import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
  buildIntegerOptions,
  commands,
  parseNumberField,
  treatKey,
} from "./common.ts";

const multiplier = 3;

commands[treatKey(locale.skills.physical.melee)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.melee}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.melee, (c, v) =>
      c.skills.physical.melee = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.firearms)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.firearms}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.firearms, (c, v) =>
      c.skills.physical.firearms = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.athletics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.athletics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.athletics, (c, v) =>
      c.skills.physical.athletics = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.brawl)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.brawl}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.brawl, (c, v) =>
      c.skills.physical.brawl = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.drive)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.drive}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.drive, (c, v) =>
      c.skills.physical.drive = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.stealth)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.stealth}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.stealth, (c, v) =>
      c.skills.physical.stealth = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.larceny)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.larceny}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.larceny, (c, v) =>
      c.skills.physical.larceny = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.craft)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.craft}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.craft, (c, v) =>
      c.skills.physical.craft = v, multiplier),
  ),
};
commands[treatKey(locale.skills.physical.survival)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.survival}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver(
    parseNumberField((c) =>
      c.skills.physical.survival, (c, v) =>
      c.skills.physical.survival = v, multiplier),
  ),
};
