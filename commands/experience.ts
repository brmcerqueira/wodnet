import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { CommandOptionType, commands, option, treatKey } from "./common.ts";

commands[treatKey(locale.experience.name)] = {
  description: `${locale.commands.sheet.description} ${locale.experience.name}`,
  options: option(locale.experience.total, {
    property: "total",
    description: locale.experience.total,
    type: CommandOptionType.INTEGER,
    minValue: -50,
    maxValue: 50,
  }).option(locale.experience.spent, {
    property: "spent",
    description: locale.experience.spent,
    type: CommandOptionType.INTEGER,
    minValue: -50,
    maxValue: 50,
  }).build,
  solve: buildCharacterUpdateSolver(
    (c, i: { total?: number; spent?: number }) => {
      if (i.total) {
        c.experience.total += i.total;
      }

      if (i.spent) {
        c.experience.spent += i.spent;
      }

      return 0;
    },
    false,
    true,
  ),
};
