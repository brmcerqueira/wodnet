import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  booleanChoices,
  BuildOptions,
  calculateSpent,
  CommandChoice,
  CommandOptions,
  CommandOptionType,
  commands,
  option,
  treatKey,
} from "./common.ts";


type Input = { level: string, value: boolean };

function getMultiplier(
  key: keyof Character["disciplines"],
  character: Character,
): number {
  const disciplines = locale.clan.options[character.clan];
  return disciplines
    ? (disciplines.indexOf((locale.disciplines as any)[key].name) > -1 ? 5 : 7)
    : (disciplines == null ? 6 : 7);
}

function disciplineParse(
  key: keyof Character["disciplines"],
  multiplier: (
    key: keyof Character["disciplines"],
    character: Character,
  ) => number,
): (character: Character, input: Input) => number {
  return (c, input) => {
    if (c.disciplines[key] == undefined) {
      c.disciplines[key] = [];
    }

    const array = c.disciplines[key]!;

    const old = array.length;

    const index = array.indexOf(input.level);

    if (input.value) {
      if (index == -1) {
        array.push(input.level);
      }
    } else if (index > -1) {
      array.splice(index, 1);
    }

    if (array.length == 0) {
      delete c.disciplines[key];
    }

    return calculateSpent(old, array.length, multiplier(key, c));
  };
}

function buildDisciplineOptions(data: any): CommandOptions {
  const choices: CommandChoice[] = [];
  let result: BuildOptions | undefined;

  for (const key in data) {
    if (key !== "name" && key !== "description") {
      const item = data[key];
      if (typeof item === "string") {
        choices.push({
          name: item,
          value: key,
        });
      } else {
        if (!result) {
          result = new BuildOptions();
        }

        result = result.option(item.name, {
          property: key,
          description: item.description || item.name,
          type: CommandOptionType.SUB_COMMAND,
          options: buildDisciplineOptions(item),
        });
      }
    }
  }

  const common = option(locale.commands.sheet.level.name, {
    property: "level",
    description: locale.commands.sheet.level.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: choices,
  }).option(locale.commands.sheet.value.name, {
    property: "value",
    description: locale.commands.sheet.value.description,
    type: CommandOptionType.STRING,
    required: true,
    choices: booleanChoices(),
  });

  if (result) {
    result = result.option(locale.commands.sheet.common.name, {
      property: "common",
      description: locale.commands.sheet.common.description,
      type: CommandOptionType.SUB_COMMAND,
      options: common.build,
    });
  } else {
    result = common;
  }

  return result.build;
}

commands[treatKey(locale.disciplines.animalism.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.animalism.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("animalism", getMultiplier),
  ),
  options: buildDisciplineOptions(locale.disciplines.animalism),
};
commands[treatKey(locale.disciplines.auspex.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.auspex.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("auspex", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.auspex),
};
commands[treatKey(locale.disciplines.dominate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.dominate.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("dominate", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.dominate),
};
commands[treatKey(locale.disciplines.bloodSorcery.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("bloodSorcery", getMultiplier),
  ),
  options: buildDisciplineOptions(locale.disciplines.bloodSorcery),
};
commands[treatKey(locale.disciplines.fortitude.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.fortitude.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("fortitude", getMultiplier),
  ),
  options: buildDisciplineOptions(locale.disciplines.fortitude),
};
commands[treatKey(locale.disciplines.protean.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.protean.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("protean", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.protean),
};
commands[treatKey(locale.disciplines.obfuscate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("obfuscate", getMultiplier),
  ),
  options: buildDisciplineOptions(locale.disciplines.obfuscate),
};
commands[treatKey(locale.disciplines.potence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.potence.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("potence", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.potence),
};
commands[treatKey(locale.disciplines.oblivion.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.oblivion.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("oblivion", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.oblivion),
};
commands[treatKey(locale.disciplines.presence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.presence.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("presence", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.presence),
};
commands[treatKey(locale.disciplines.celerity.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.celerity.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("celerity", getMultiplier)),
  options: buildDisciplineOptions(locale.disciplines.celerity),
};
commands[treatKey(locale.disciplines.rituals.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.rituals.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("rituals", () => 3)),
  options: buildDisciplineOptions(locale.disciplines.rituals),
};
commands[treatKey(locale.disciplines.thinBloodAlchemy.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("thinBloodAlchemy", () => 3),
  ),
  options: buildDisciplineOptions(locale.disciplines.thinBloodAlchemy),
};
