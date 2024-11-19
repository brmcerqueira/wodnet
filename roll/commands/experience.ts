import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import { CommandOptionType, commands, option, treatKey } from "./common.ts";

commands[treatKey(locale.experience.name)] = {
  description: `${locale.commands.sheet.description} ${locale.experience.name}`,
  options: option(locale.experience.total, {
    property: "total",
    description: locale.experience.total,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).option(locale.experience.spent, {
    property: "spent",
    description: locale.experience.spent,
    type: CommandOptionType.INTEGER,
    minValue: -20,
    maxValue: 20,
  }).build,
  solve: buildCharacterSolver((c, i: { total?: number; spent?: number }) => {
    if (i.total) {
      c.experience.total += i.total;
    }

    if (i.spent) {
      c.experience.spent += i.spent;
    }
  }),
};
