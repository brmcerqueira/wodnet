import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { buildIntegerOptions, commands, treatKey } from "./common.ts";

commands[treatKey(locale.attributes.physical.strength)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.strength}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.physical.strength = i.value
  ),
};
commands[treatKey(locale.attributes.physical.dexterity)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.dexterity}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.physical.dexterity = i.value
  ),
};
commands[treatKey(locale.attributes.physical.stamina)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.stamina}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.physical.stamina = i.value
  ),
};
commands[treatKey(locale.attributes.social.charisma)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.charisma}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.social.charisma = i.value
  ),
};
commands[treatKey(locale.attributes.social.manipulation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.manipulation}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.social.manipulation = i.value
  ),
};
commands[treatKey(locale.attributes.social.composure)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.composure}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.social.composure = i.value
  ),
};
commands[treatKey(locale.attributes.mental.intelligence)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.intelligence}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.mental.intelligence = i.value
  ),
};
commands[treatKey(locale.attributes.mental.wits)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.wits}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.mental.wits = i.value
  ),
};
commands[treatKey(locale.attributes.mental.resolve)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.resolve}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.attributes.mental.resolve = i.value
  ),
};
