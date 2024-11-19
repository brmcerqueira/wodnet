import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { buildIntegerOptions, commands, treatKey } from "./common.ts";

commands[treatKey(locale.skills.physical.melee)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.melee}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.melee = i.value
  ),
};
commands[treatKey(locale.skills.physical.firearms)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.firearms}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.firearms = i.value
  ),
};
commands[treatKey(locale.skills.physical.athletics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.athletics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.athletics = i.value
  ),
};
commands[treatKey(locale.skills.physical.brawl)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.brawl}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.brawl = i.value
  ),
};
commands[treatKey(locale.skills.physical.drive)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.drive}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.drive = i.value
  ),
};
commands[treatKey(locale.skills.physical.stealth)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.stealth}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.stealth = i.value
  ),
};
commands[treatKey(locale.skills.physical.larceny)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.larceny}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.larceny = i.value
  ),
};
commands[treatKey(locale.skills.physical.craft)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.craft}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.craft = i.value
  ),
};
commands[treatKey(locale.skills.physical.survival)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.physical.survival}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.physical.survival = i.value
  ),
};
