import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { buildIntegerOptions, commands, parseNumberFieldWithSpent, treatKey } from "./common.ts";

const multiplier = 5;

commands[treatKey(locale.attributes.physical.strength)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.strength}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.physical.strength, (c, v) => c.attributes.physical.strength = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.physical.dexterity)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.dexterity}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.physical.dexterity, (c, v) => c.attributes.physical.dexterity = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.physical.stamina)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.physical.stamina}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.physical.stamina, (c, v) => c.attributes.physical.stamina = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.social.charisma)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.charisma}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.social.charisma, (c, v) => c.attributes.social.charisma = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.social.manipulation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.manipulation}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.social.manipulation, (c, v) => c.attributes.social.manipulation = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.social.composure)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.social.composure}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.social.composure, (c, v) => c.attributes.social.composure = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.mental.intelligence)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.intelligence}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.mental.intelligence, (c, v) => c.attributes.mental.intelligence = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.mental.wits)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.wits}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.mental.wits, (c, v) => c.attributes.mental.wits = v, multiplier)
  ),
};
commands[treatKey(locale.attributes.mental.resolve)] = {
  description:
    `${locale.commands.sheet.description} ${locale.attributes.mental.resolve}`,
  options: buildIntegerOptions(1, 5),
  solve: buildCharacterUpdateSolver(parseNumberFieldWithSpent(c => c.attributes.mental.resolve, (c, v) => c.attributes.mental.resolve = v, multiplier)
  ),
};
