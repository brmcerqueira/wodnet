/*import { Character } from "./character.ts";
import { Interaction } from "./deps.ts";
import { locale } from "./i18n/locale.ts";
import { CommandOptions, option, Solve } from "./roll/commands.ts";

type CommandChoice = {
  name: string;
  value: any;
};

export enum Discipline {
  Animalism,
  Auspex,
  Dominate,
  BloodSorcery,
  Fortitude,
  Protean,
  Obfuscate,
  Potence,
  Presence,
  Celerity,
  Rituals,
  ThinBloodAlchemy,
}

enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export type Attribute = {
  parse?: (
    character: Character,
    origin: string,
    value: any,
    context?: any,
  ) => void;
  context?: (character: Character) => any;
  type?: CommandOptionType;
  choices?: CommandChoice[];
  minValue?: number;
  maxValue?: number;
  disciplines?: Discipline[];
};

export type Context = {
  generic: Attribute;
};

type AdvantageFlawContext = {
  object: {
    [name: string]: number;
  };
} & Context;

type DisciplineKeyType = keyof Character["disciplines"];

type DisciplineContext = {
  key: DisciplineKeyType;
} & Context;

const commands: {
  [name: string]: {
    description: string;
    solve: (interaction: Interaction, values?: any) => Promise<void>;
    options: CommandOptions;
  };
} = {};

const advantageFlawAttributeParse: Attribute = {
  solve: (_c, o, v: number, context: AdvantageFlawContext) =>
    context.object[o] = v,
};

const disciplineAttributeParse: Attribute = {
  parse(c, o, v: boolean, context: DisciplineContext) {
    if (c.disciplines[context.key] == undefined) {
      c.disciplines[context.key] = [];
    }

    const array = c.disciplines[context.key]!;

    const index = array.indexOf(o);

    if (v && index == -1) {
      array.push(o);
    } else if (!v && index > -1) {
      array.splice(index, 1);
    }

    if (c.disciplines[context.key]!.length == 0) {
      delete c.disciplines[context.key];
    }
  },
  type: CommandOptionType.BOOLEAN,
};



commands[locale.specialties.name] = { description: `${locale.commands.sheet.description} ${locale.specialties.name}`,
  type: undefined,
  context: (c) => {
    for (const key in c.specialties) {
      delete c.specialties[key];
    }
    return <Context> {
      generic: {
        solve: buildSolve((c: Character, o: string, v: string) => {
          if (c.specialties[v] == undefined) {
            c.specialties[v] = [];
          }
          if (c.specialties[v].indexOf(o) == -1) {
            c.specialties[v].push(o);
          }
        },
      },
    };
  },
};
*/