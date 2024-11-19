import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { buildIntegerOptions, commands, treatKey } from "./common.ts";

commands[treatKey(locale.skills.social.animalKen)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.animalKen}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.animalKen = i.value
  ),
};
commands[treatKey(locale.skills.social.etiquette)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.etiquette}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.etiquette = i.value
  ),
};
commands[treatKey(locale.skills.social.intimidation)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.intimidation}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.intimidation = i.value
  ),
};
commands[treatKey(locale.skills.social.leadership)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.leadership}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.leadership = i.value
  ),
};
commands[treatKey(locale.skills.social.streetwise)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.streetwise}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.streetwise = i.value
  ),
};
commands[treatKey(locale.skills.social.performance)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.performance}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.performance = i.value
  ),
};
commands[treatKey(locale.skills.social.persuasion)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.persuasion}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.persuasion = i.value
  ),
};
commands[treatKey(locale.skills.social.insight)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.insight}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.insight = i.value
  ),
};
commands[treatKey(locale.skills.social.subterfuge)] = {
  description:
    `${locale.commands.sheet.description} ${locale.skills.social.subterfuge}`,
  options: buildIntegerOptions(0, 5),
  solve: buildCharacterSolver((c, i: { value: number }) =>
    c.skills.social.subterfuge = i.value
  ),
};
