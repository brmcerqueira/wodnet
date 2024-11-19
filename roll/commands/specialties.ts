import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
  buildCreateSpecialtyOptions,
  CommandOptionType,
  commands,
  option,
  treatKey,
} from "./common.ts";

type NewSpecialty = { skill: string; name: string; };

commands[treatKey(locale.specialties.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.specialties.name}`,
  solve: buildCharacterSolver((c, input: {
    physical?: NewSpecialty;
    social?: NewSpecialty;
    mental?: NewSpecialty;
    delete?: { index: number };
  }) => {
    if (input.delete) {
      let index = 1;
      loop: for (const key in c.specialties) {
        const array = c.specialties[key];
        for (let i = 0; i < array.length; i++) {
          if (index == input.delete.index) {
            array.splice(i, 1);
            if (array.length == 0) {
              delete c.specialties[key];
            }
            break loop;
          }
          index++;
        }
      }
    } else {
      const specialty = input.physical || input.social ||
        input.mental as NewSpecialty;

      if (c.specialties[specialty.skill] == undefined) {
        c.specialties[specialty.skill] = [];
      }

      const array = c.specialties[specialty.skill];

      if (array.indexOf(specialty.name) == -1) {
        array.push(specialty.name);
      }
    }
  }),
  options: option(locale.physical, {
    property: "physical",
    description: locale.physical,
    type: CommandOptionType.SUB_COMMAND,
    options: buildCreateSpecialtyOptions(locale.skills.physical),
  }).option(locale.social, {
    property: "social",
    description: locale.social,
    type: CommandOptionType.SUB_COMMAND,
    options: buildCreateSpecialtyOptions(locale.skills.social),
  }).option(locale.mental, {
    property: "mental",
    description: locale.mental,
    type: CommandOptionType.SUB_COMMAND,
    options: buildCreateSpecialtyOptions(locale.skills.mental),
  }).option(locale.commands.sheet.delete.name, {
    property: "delete",
    description: locale.commands.sheet.delete.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.commands.sheet.index.name, {
      property: "index",
      description: locale.commands.sheet.index.description,
      type: CommandOptionType.INTEGER,
      required: true,
      minValue: 1,
      maxValue: 99,
    }).build,
  }).build,
};
