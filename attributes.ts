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
commands[locale.advantages] = { description: `${locale.commands.sheet.description} ${locale.advantages}`,
  type: undefined,
  context: (c) => {
    for (const key in c.advantages) {
      delete c.advantages[key];
    }
    return <AdvantageFlawContext> {
      generic: advantageFlawAttributeParse,
      object: c.advantages,
    };
  },
};
commands[locale.flaws] = { description: `${locale.commands.sheet.description} ${locale.flaws}`,
  type: undefined,
  context: (c) => {
    for (const key in c.flaws) {
      delete c.flaws[key];
    }
    return <AdvantageFlawContext> {
      generic: advantageFlawAttributeParse,
      object: c.flaws,
    };
  },
};
commands[locale.disciplines.animalism.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.name}`,
  disciplines: [Discipline.Animalism],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "animalism",
    };
  },
};
commands[locale.disciplines.animalism.bondFamulus] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.bondFamulus}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.senseTheBeast] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.senseTheBeast}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.feralWhispers] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.feralWhispers}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.animalSucculence] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.animalSucculence}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.quellTheBeast] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.quellTheBeast}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.unlivingHive] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.unlivingHive}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.subsumeTheSpirit] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.subsumeTheSpirit}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.animalDominion] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.animalDominion}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.animalism.drawingOutTheBeast] = { description: `${locale.commands.sheet.description} ${locale.disciplines.animalism.drawingOutTheBeast}`,
  disciplines: [Discipline.Animalism],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.name}`,
  disciplines: [Discipline.Auspex],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "auspex",
    };
  },
};
commands[locale.disciplines.auspex.heightenedSenses] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.heightenedSenses}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.senseTheUnseen] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.senseTheUnseen}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.obeah] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.obeah}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.premonition] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.premonition}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.scryTheSoul] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.scryTheSoul}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.shareTheSenses] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.shareTheSenses}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.spiritsTouch] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.spiritsTouch}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.clairvoyance] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.clairvoyance}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.possession] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.possession}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.telepathy] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.telepathy}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.auspex.unburdeningTheBestialSoul] = { description: `${locale.commands.sheet.description} ${locale.disciplines.auspex.unburdeningTheBestialSoul}`,
  disciplines: [Discipline.Auspex],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.name}`,
  disciplines: [Discipline.Dominate],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "dominate",
    };
  },
};
commands[locale.disciplines.dominate.cloudMemory] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.cloudMemory}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.compel] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.compel}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.mesmerize] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.mesmerize}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.dementation] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.dementation}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.domitorsFavor] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.domitorsFavor}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.theForgetfulMind] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.theForgetfulMind}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.submergedDirective] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.submergedDirective}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.rationalize] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.rationalize}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.massManipulation] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.massManipulation}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.dominate.terminalDecree] = { description: `${locale.commands.sheet.description} ${locale.disciplines.dominate.terminalDecree}`,
  disciplines: [Discipline.Dominate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.name}`,
  disciplines: [Discipline.BloodSorcery],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "bloodSorcery",
    };
  },
};
commands[locale.disciplines.bloodSorcery.corrosiveVitae] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.corrosiveVitae}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.aTasteForBlood] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.aTasteForBlood}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.extinguishVitae] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.extinguishVitae}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.bloodOfPotency] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.bloodOfPotency}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.scorpionsTouch] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.scorpionsTouch}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.theftOfVitae] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.theftOfVitae}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.baalsCaress] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.baalsCaress}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.bloodSorcery.cauldronOfBlood] = { description: `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.cauldronOfBlood}`,
  disciplines: [Discipline.BloodSorcery],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.name}`,
  disciplines: [Discipline.Fortitude],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "fortitude",
    };
  },
};
commands[locale.disciplines.fortitude.resilience] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.resilience}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.unswayableMind] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.unswayableMind}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.toughness] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.toughness}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.enduringBeasts] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.enduringBeasts}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.valeren] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.valeren}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.defyBane] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.defyBane}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.fortifyTheInnerFacade] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.fortifyTheInnerFacade}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.draughtOfEndurance] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.draughtOfEndurance}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.fleshOfMarble] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.fleshOfMarble}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.fortitude.prowessFromPain] = { description: `${locale.commands.sheet.description} ${locale.disciplines.fortitude.prowessFromPain}`,
  disciplines: [Discipline.Fortitude],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.name}`,
  disciplines: [Discipline.Protean],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "protean",
    };
  },
};
commands[locale.disciplines.protean.eyesOfTheBeast] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.eyesOfTheBeast}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.weightOfTheFeather] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.weightOfTheFeather}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.feralWeapons] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.feralWeapons}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.vicissitude] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.vicissitude}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.earthMeld] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.earthMeld}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.shapechange] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.shapechange}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.fleshcrafting] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.fleshcrafting}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.metamorphosis] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.metamorphosis}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.horridForm] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.horridForm}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.mistForm] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.mistForm}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.theUnfetteredHeart] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.theUnfetteredHeart}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.protean.oneWithTheLand] = { description: `${locale.commands.sheet.description} ${locale.disciplines.protean.oneWithTheLand}`,
  disciplines: [Discipline.Protean],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.name}`,
  disciplines: [Discipline.Obfuscate],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "obfuscate",
    };
  },
};
commands[locale.disciplines.obfuscate.cloakOfShadows] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.cloakOfShadows}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.silenceOfDeath] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.silenceOfDeath}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.unseenPassage] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.unseenPassage}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.chimerstry] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.chimerstry}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.ghostInTheMachine] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.ghostInTheMachine}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.maskOfAThousandFaces] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.maskOfAThousandFaces}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.fataMorgana] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.fataMorgana}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.conceal] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.conceal}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.vanish] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.vanish}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.cloakTheGathering] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.cloakTheGathering}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.obfuscate.impostorsGuise] = { description: `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.impostorsGuise}`,
  disciplines: [Discipline.Obfuscate],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.name}`,
  disciplines: [Discipline.Potence],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "potence",
    };
  },
};
commands[locale.disciplines.potence.lethalBody] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.lethalBody}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.soaringLeap] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.soaringLeap}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.prowess] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.prowess}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.brutalFeed] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.brutalFeed}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.sparkOfRage] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.sparkOfRage}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.uncannyGrip] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.uncannyGrip}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.draughtOfMight] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.draughtOfMight}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.earthshock] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.earthshock}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.potence.fistOfCaine] = { description: `${locale.commands.sheet.description} ${locale.disciplines.potence.fistOfCaine}`,
  disciplines: [Discipline.Potence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.name}`,
  disciplines: [Discipline.Presence],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "presence",
    };
  },
};
commands[locale.disciplines.presence.awe] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.awe}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.daunt] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.daunt}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.eyesOfTheSerpent] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.eyesOfTheSerpent}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.lingeringKiss] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.lingeringKiss}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.dreadGaze] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.dreadGaze}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.entrancement] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.entrancement}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.irresistibleVoice] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.irresistibleVoice}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.summon] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.summon}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.majesty] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.majesty}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.presence.starMagnetism] = { description: `${locale.commands.sheet.description} ${locale.disciplines.presence.starMagnetism}`,
  disciplines: [Discipline.Presence],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.name}`,
  disciplines: [Discipline.Celerity],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "celerity",
    };
  },
};
commands[locale.disciplines.celerity.catsGrace] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.catsGrace}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.rapidReflexes] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.rapidReflexes}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.fleetness] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.fleetness}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.blink] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.blink}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.traversal] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.traversal}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.draughtOfElegance] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.draughtOfElegance}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.unerringAim] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.unerringAim}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.lightningStrike] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.lightningStrike}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.celerity.splitSecond] = { description: `${locale.commands.sheet.description} ${locale.disciplines.celerity.splitSecond}`,
  disciplines: [Discipline.Celerity],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.name}`,
  disciplines: [Discipline.Rituals],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "rituals",
    };
  },
};
commands[locale.disciplines.rituals.bloodWalk] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.bloodWalk}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.clingingOfTheInsect] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.clingingOfTheInsect}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.craftBloodstone] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.craftBloodstone}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wakeWithEveningsFreshness] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wakeWithEveningsFreshness}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardAgainstGhouls] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardAgainstGhouls}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.communicateWithKindredSire] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.communicateWithKindredSire}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.eyesOfBabel] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.eyesOfBabel}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.illuminateTheTrailOfPrey] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.illuminateTheTrailOfPrey}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.ishtarsTouch] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.ishtarsTouch}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.truthOfBlood] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.truthOfBlood}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardAgainstSpirits] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardAgainstSpirits}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardingCircleAgainstGhouls] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardingCircleAgainstGhouls}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.dagonsCall] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.dagonsCall}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.deflectionOfWoodenDoom] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.deflectionOfWoodenDoom}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.essenceOfAir] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.essenceOfAir}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.firewalker] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.firewalker}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardAgainstLupines] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardAgainstLupines}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardingCircleAgainstSpirits] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardingCircleAgainstSpirits}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.oneWithTheBlade] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.oneWithTheBlade}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.defenseOfTheSacredHaven] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.defenseOfTheSacredHaven}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.eyesOfTheNighthawk] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.eyesOfTheNighthawk}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.incorporealPassage] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.incorporealPassage}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardAgainstCainites] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardAgainstCainites}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardingCircleAgainstLupines] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardingCircleAgainstLupines}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.escapeToTrueSanctuary] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.escapeToTrueSanctuary}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.heartOfStone] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.heartOfStone}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.shaftOfBelatedDissolution] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.shaftOfBelatedDissolution}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.rituals.wardingCircleAgainstCainites] = { description: `${locale.commands.sheet.description} ${locale.disciplines.rituals.wardingCircleAgainstCainites}`,
  disciplines: [Discipline.Rituals],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.name] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.name}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: undefined,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "thinBloodAlchemy",
    };
  },
};
commands[locale.disciplines.thinBloodAlchemy.farReach] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.farReach}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.haze] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.haze}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.envelop] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.envelop}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.profaneHierosGamos] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.profaneHierosGamos}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.defractionate] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.defractionate}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.airborneMomentum] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.airborneMomentum}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
commands[locale.disciplines.thinBloodAlchemy.awakenTheSleeper] = { description: `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.awakenTheSleeper}`,
  disciplines: [Discipline.ThinBloodAlchemy],
  type: CommandOptionType.BOOLEAN,
};
*/