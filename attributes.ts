import { Character } from "./character.ts";
import { locale } from "./i18n/locale.ts";
import * as tags from "./tags.ts";

export enum AttributeType {
  Standard = 1,
  MultilineTextBlock = 2,
  Checkbox = 3,
  Section = 4,
  RandomNumber = 5,
  Number = 6,
  ListChoice = 7,
}

export type Attribute = {
  parse?: (
    character: Character,
    origin: string,
    value: any,
    context?: any,
  ) => void;
  context?: (character: Character) => any;
  value?: string;
  type?: AttributeType;
  tags?: tags.Tag[];
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

export const attributes: {
  [name: string]: Attribute;
} = {};

const advantageFlawAttributeParse: Attribute = {
  parse: (_c, o, v: number, context: AdvantageFlawContext) =>
    context.object[o] = v,
  type: AttributeType.Number,
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
      c.disciplines[context.key] = undefined;
    }
  },
  type: AttributeType.Checkbox,
};

attributes[locale.player] = {
  parse: (c, _o, v: string) => c.player = v,
};
attributes[
  `${locale.resonance.name}[range:,${locale.resonance.options.join(",")}]`
] = {
  parse: (c, _o, v: string) => c.resonance = v,
};
attributes[locale.ambition] = {
  parse: (c, _o, v: string) => c.ambition = v,
};
attributes[locale.desire] = {
  parse: (c, _o, v: string) => c.desire = v,
};
attributes[
  `${locale.predator.name}[range:${locale.predator.options.join(",")}]`
] = {
  parse: (c, _o, v: string) => c.predator = v,
};
attributes[`${locale.clan.name}[range:${locale.clan.options.join(",")}]`] = {
  parse: (c, _o, v: string) => c.clan = v,
};
attributes[`${locale.generation.name}[range:4,16]`] = {
  parse: (c, _o, v: number) => c.generation = v,
  type: AttributeType.Number,
};
attributes[locale.discordId] = {
  parse: (c, _o, v: string) => c.discordId = v,
};
attributes[locale.details] = {
  parse: (c, _o, v: string) => c.details = v,
  type: AttributeType.MultilineTextBlock,
};
attributes[`${locale.bloodPotency}[range:0,10]`] = {
  parse: (c, _o, v: number) => c.bloodPotency = v,
  type: AttributeType.Number,
};
attributes[`${locale.hunger}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.hunger = v,
  type: AttributeType.Number,
};
attributes[`${locale.humanity}[range:0,10]`] = {
  parse: (c, _o, v: number) => c.humanity.total = v,
  type: AttributeType.Number,
};
attributes[`${locale.stains}[range:0,10]`] = {
  parse: (c, _o, v: number) => c.humanity.stains = v,
  type: AttributeType.Number,
};
attributes[`${locale.health} - ${locale.damage.superficial}`] = {
  parse: (c, _o, v: number) => c.health.superficial = v,
  type: AttributeType.Number,
};
attributes[`${locale.health} - ${locale.damage.aggravated}`] = {
  parse: (c, _o, v: number) => c.health.aggravated = v,
  type: AttributeType.Number,
};
attributes[`${locale.willpower} - ${locale.damage.superficial}`] = {
  parse: (c, _o, v: number) => c.willpower.superficial = v,
  type: AttributeType.Number,
};
attributes[`${locale.willpower} - ${locale.damage.aggravated}`] = {
  parse: (c, _o, v: number) => c.willpower.aggravated = v,
  type: AttributeType.Number,
};
attributes[`${locale.experience.name} - ${locale.experience.total}`] = {
  parse: (c, _o, v: number) => c.experience.total = v,
  type: AttributeType.Number,
};
attributes[`${locale.experience.name} - ${locale.experience.spent}`] = {
  parse: (c, _o, v: number) => c.experience.spent = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.physical}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.physical.strength}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.physical.strength = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.physical.dexterity}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.physical.dexterity = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.physical.stamina}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.physical.stamina = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.social}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.social.charisma}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.social.charisma = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.social.manipulation}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.social.manipulation = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.social.composure}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.social.composure = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.mental}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.mental.intelligence}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.mental.intelligence = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.mental.wits}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.mental.wits = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.mental.resolve}[range:1,5]`] = {
  parse: (c, _o, v: number) => c.attributes.mental.resolve = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.physical}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.physical.melee}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.melee = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.firearms}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.firearms = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.athletics}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.athletics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.brawl}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.brawl = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.drive}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.drive = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.stealth}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.stealth = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.larceny}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.larceny = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.craft}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.craft = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.survival}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.physical.survival = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.social}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.social.animalKen}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.animalKen = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.etiquette}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.etiquette = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.intimidation}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.intimidation = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.leadership}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.leadership = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.streetwise}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.streetwise = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.performance}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.performance = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.persuasion}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.persuasion = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.insight}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.insight = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.subterfuge}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.social.subterfuge = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.mental}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.mental.science}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.science = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.academics}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.academics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.finance}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.finance = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.investigation}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.investigation = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.medicine}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.medicine = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.occult}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.occult = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.awareness}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.awareness = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.politics}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.politics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.technology}[range:0,5]`] = {
  parse: (c, _o, v: number) => c.skills.mental.technology = v,
  type: AttributeType.Number,
};
attributes[locale.specialties.name] = {
  type: AttributeType.Section,
  context: (c) => {
    for (const key in c.specialties) {
      delete c.specialties[key];
    }
    return <Context> {
      generic: {
        parse: (c: Character, o: string, v: string) => {
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
attributes[locale.advantages] = {
  type: AttributeType.Section,
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
attributes[locale.flaws] = {
  type: AttributeType.Section,
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
attributes[locale.disciplines.animalism.name] = {
  tags: [tags.Animalism],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "animalism",
    };
  },
};
attributes[locale.disciplines.animalism.bondFamulus] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.senseTheBeast] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.feralWhispers] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalSucculence] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.quellTheBeast] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.unlivingHive] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.subsumeTheSpirit] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalDominion] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.drawingOutTheBeast] = {
  tags: [tags.Animalism],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.name] = {
  tags: [tags.Auspex],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "auspex",
    };
  },
};
attributes[locale.disciplines.auspex.heightenedSenses] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.senseTheUnseen] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.obeah] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.premonition] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.scryTheSoul] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.shareTheSenses] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.spiritsTouch] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.clairvoyance] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.possession] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.telepathy] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.unburdeningTheBestialSoul] = {
  tags: [tags.Auspex],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.name] = {
  tags: [tags.Dominate],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "dominate",
    };
  },
};
attributes[locale.disciplines.dominate.cloudMemory] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.compel] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.mesmerize] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.dementation] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.domitorsFavor] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.theForgetfulMind] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.submergedDirective] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.rationalize] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.massManipulation] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.terminalDecree] = {
  tags: [tags.Dominate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.name] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "bloodSorcery",
    };
  },
};
attributes[locale.disciplines.bloodSorcery.corrosiveVitae] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.aTasteForBlood] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.extinguishVitae] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.bloodOfPotency] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.scorpionsTouch] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.theftOfVitae] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.baalsCaress] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.cauldronOfBlood] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.name] = {
  tags: [tags.Fortitude],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "fortitude",
    };
  },
};
attributes[locale.disciplines.fortitude.resilience] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.unswayableMind] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.toughness] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.enduringBeasts] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.valeren] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.defyBane] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fortifyTheInnerFacade] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.draughtOfEndurance] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fleshOfMarble] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.prowessFromPain] = {
  tags: [tags.Fortitude],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.name] = {
  tags: [tags.Protean],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "protean",
    };
  },
},
  attributes[locale.disciplines.protean.eyesOfTheBeast] = {
    tags: [tags.Protean],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.protean.weightOfTheFeather] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.feralWeapons] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.vicissitude] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.earthMeld] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.shapechange] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.fleshcrafting] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.metamorphosis] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.horridForm] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.mistForm] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.theUnfetteredHeart] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.oneWithTheLand] = {
  tags: [tags.Protean],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.name] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "obfuscate",
    };
  },
};
attributes[locale.disciplines.obfuscate.cloakOfShadows] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.silenceOfDeath] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.unseenPassage] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.chimerstry] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.ghostInTheMachine] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.maskOfAThousandFaces] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.fataMorgana] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.conceal] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.vanish] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.cloakTheGathering] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.impostorsGuise] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.name] = {
  tags: [tags.Potence],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "potence",
    };
  },
},
  attributes[locale.disciplines.potence.lethalBody] = {
    tags: [tags.Potence],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.potence.soaringLeap] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.prowess] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.brutalFeed] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.sparkOfRage] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.uncannyGrip] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.draughtOfMight] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.earthshock] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.fistOfCaine] = {
  tags: [tags.Potence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.name] = {
  tags: [tags.Presence],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "presence",
    };
  },
},
  attributes[locale.disciplines.presence.awe] = {
    tags: [tags.Presence],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.presence.daunt] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.lingeringKiss] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.dreadGaze] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.entrancement] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.irresistibleVoice] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.summon] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.majesty] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.starMagnetism] = {
  tags: [tags.Presence],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.name] = {
  tags: [tags.Celerity],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "celerity",
    };
  },
},
  attributes[locale.disciplines.celerity.catsGrace] = {
    tags: [tags.Celerity],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.celerity.rapidReflexes] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.fleetness] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.blink] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.traversal] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.draughtOfElegance] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.unerringAim] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.lightningStrike] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.splitSecond] = {
  tags: [tags.Celerity],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.name] = {
  tags: [tags.Rituals],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "rituals",
    };
  },
},
  attributes[locale.disciplines.rituals.bloodWalk] = {
    tags: [tags.Rituals],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.rituals.clingingOfTheInsect] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.craftBloodstone] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wakeWithEveningsFreshness] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstGhouls] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.communicateWithKindredSire] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfBabel] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.illuminateTheTrailOfPrey] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.truthOfBlood] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstSpirits] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstGhouls] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.dagonsCall] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.deflectionOfWoodenDoom] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.essenceOfAir] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.firewalker] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstLupines] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstSpirits] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.defenseOfTheSacredHaven] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfTheNighthawk] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.incorporealPassage] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstCainites] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstLupines] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.escapeToTrueSanctuary] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.heartOfStone] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.shaftOfBelatedDissolution] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstCainites] = {
  tags: [tags.Rituals],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.name] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Section,
  context: () => {
    return <DisciplineContext> {
      generic: disciplineAttributeParse,
      key: "thinBloodAlchemy",
    };
  },
},
  attributes[locale.disciplines.thinBloodAlchemy.farReach] = {
    tags: [tags.ThinBloodAlchemy],
    type: AttributeType.Checkbox,
  };
attributes[locale.disciplines.thinBloodAlchemy.haze] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.profaneHierosGamos] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.envelop] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.defractionate] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.airborneMomentum] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.awakenTheSleeper] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Checkbox,
};
