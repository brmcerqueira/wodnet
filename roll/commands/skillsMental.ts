import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { buildIntegerOptions, commands, treatKey } from "./common.ts";

commands[treatKey(locale.skills.mental.science)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.science}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.science = i.value
  ),
};
commands[treatKey(locale.skills.mental.academics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.academics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.academics = i.value
  ),
};
commands[treatKey(locale.skills.mental.finance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.finance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.finance = i.value
  ),
};
commands[treatKey(locale.skills.mental.investigation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.investigation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.investigation = i.value
  ),
};
commands[treatKey(locale.skills.mental.medicine)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.medicine}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.medicine = i.value
  ),
};
commands[treatKey(locale.skills.mental.occult)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.occult}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.occult = i.value
  ),
};
commands[treatKey(locale.skills.mental.awareness)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.awareness}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.awareness = i.value
  ),
};
commands[treatKey(locale.skills.mental.politics)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.politics}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.politics = i.value
  ),
};
commands[treatKey(locale.skills.mental.technology)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.mental.technology}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.mental.technology = i.value
  ),
};
