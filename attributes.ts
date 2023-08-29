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

export const attributes: {
  [name: string]: Attribute;
} = {};

function treatDisciplineArray(array: string[], label: string, value: boolean) {
  const index = array.indexOf(label);
  if (value && index == -1) {
    array.push(label);
  } else if (!value && index > -1) {
    array.splice(index, 1);
  }
}

const advantageFlawAttributeParse: Attribute = {
  parse: (_c, o, v: number, context: AdvantageFlawContext) =>
    context.object[o] = v,
  type: AttributeType.Number,
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
attributes[locale.advantages] = {
  type: AttributeType.Section,
};
attributes[locale.flaws] = {
  type: AttributeType.Section,
};
attributes[locale.disciplines.animalism.name] = {
  tags: [tags.Animalism],
  type: AttributeType.Section,
};
attributes[locale.disciplines.animalism.bondFamulus] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.bondFamulus,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.senseTheBeast] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.senseTheBeast,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.feralWhispers] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.feralWhispers,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalSucculence] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.animalSucculence,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.quellTheBeast] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.quellTheBeast,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.unlivingHive] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.unlivingHive,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.subsumeTheSpirit] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.subsumeTheSpirit,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalDominion] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.animalDominion,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.drawingOutTheBeast] = {
  tags: [tags.Animalism],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.animalism == undefined) c.disciplines.animalism = [];
    treatDisciplineArray(
      c.disciplines.animalism,
      locale.disciplines.animalism.drawingOutTheBeast,
      v,
    );
    if (c.disciplines.animalism.length == 0) {
      c.disciplines.animalism = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.name] = {
  tags: [tags.Auspex],
  type: AttributeType.Section,
};
attributes[locale.disciplines.auspex.heightenedSenses] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.heightenedSenses,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.senseTheUnseen] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.senseTheUnseen,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.premonition] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.premonition,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.scryTheSoul] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.scryTheSoul,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.shareTheSenses] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.shareTheSenses,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.spiritsTouch] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.spiritsTouch,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.clairvoyance] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.clairvoyance,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.possession] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.possession,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.telepathy] = {
  tags: [tags.Auspex],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.auspex == undefined) c.disciplines.auspex = [];
    treatDisciplineArray(
      c.disciplines.auspex,
      locale.disciplines.auspex.telepathy,
      v,
    );
    if (c.disciplines.auspex.length == 0) c.disciplines.auspex = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.name] = {
  tags: [tags.Dominate],
  type: AttributeType.Section,
};
attributes[locale.disciplines.dominate.cloudMemory] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.cloudMemory,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.compel] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.compel,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.mesmerize] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.mesmerize,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.dementation] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.dementation,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.theForgetfulMind] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.theForgetfulMind,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.submergedDirective] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.submergedDirective,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.rationalize] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.rationalize,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.massManipulation] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.massManipulation,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.terminalDecree] = {
  tags: [tags.Dominate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.dominate == undefined) c.disciplines.dominate = [];
    treatDisciplineArray(
      c.disciplines.dominate,
      locale.disciplines.dominate.terminalDecree,
      v,
    );
    if (c.disciplines.dominate.length == 0) c.disciplines.dominate = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.name] = {
  tags: [tags.BloodSorcery],
  type: AttributeType.Section,
};
attributes[locale.disciplines.bloodSorcery.corrosiveVitae] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.corrosiveVitae,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.aTasteForBlood] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.aTasteForBlood,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.extinguishVitae] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.extinguishVitae,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.bloodOfPotency] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.bloodOfPotency,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.scorpionsTouch] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.scorpionsTouch,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.theftOfVitae] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.theftOfVitae,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.baalsCaress] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.baalsCaress,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.cauldronOfBlood] = {
  tags: [tags.BloodSorcery],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.bloodSorcery == undefined) {
      c.disciplines.bloodSorcery = [];
    }
    treatDisciplineArray(
      c.disciplines.bloodSorcery,
      locale.disciplines.bloodSorcery.cauldronOfBlood,
      v,
    );
    if (c.disciplines.bloodSorcery.length == 0) {
      c.disciplines.bloodSorcery = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.name] = {
  tags: [tags.Fortitude],
  type: AttributeType.Section,
};
attributes[locale.disciplines.fortitude.resilience] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.resilience,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.unswayableMind] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.unswayableMind,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.toughness] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.toughness,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.enduringBeasts] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.enduringBeasts,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.defyBane] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.defyBane,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fortifyTheInnerFacade] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.fortifyTheInnerFacade,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.draughtOfEndurance] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.draughtOfEndurance,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fleshOfMarble] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.fleshOfMarble,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.prowessFromPain] = {
  tags: [tags.Fortitude],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.fortitude == undefined) c.disciplines.fortitude = [];
    treatDisciplineArray(
      c.disciplines.fortitude,
      locale.disciplines.fortitude.prowessFromPain,
      v,
    );
    if (c.disciplines.fortitude.length == 0) {
      c.disciplines.fortitude = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.name] = {
  tags: [tags.Protean],
  type: AttributeType.Section,
};
attributes[locale.disciplines.protean.eyesOfTheBeast] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.eyesOfTheBeast,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.weightOfTheFeather] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.weightOfTheFeather,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.feralWeapons] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.feralWeapons,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.earthMeld] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.earthMeld,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.shapechange] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.shapechange,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.metamorphosis] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.metamorphosis,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.mistForm] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.mistForm,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.theUnfetteredHeart] = {
  tags: [tags.Protean],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.protean == undefined) c.disciplines.protean = [];
    treatDisciplineArray(
      c.disciplines.protean,
      locale.disciplines.protean.theUnfetteredHeart,
      v,
    );
    if (c.disciplines.protean.length == 0) c.disciplines.protean = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.name] = {
  tags: [tags.Obfuscate],
  type: AttributeType.Section,
};
attributes[locale.disciplines.obfuscate.cloakOfShadows] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.cloakOfShadows,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.silenceOfDeath] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.silenceOfDeath,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.unseenPassage] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.unseenPassage,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.ghostInTheMachine] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.ghostInTheMachine,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.maskOfAThousandFaces] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.maskOfAThousandFaces,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.conceal] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.conceal,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.vanish] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.vanish,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.cloakTheGathering] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.cloakTheGathering,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.impostorsGuise] = {
  tags: [tags.Obfuscate],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.obfuscate == undefined) c.disciplines.obfuscate = [];
    treatDisciplineArray(
      c.disciplines.obfuscate,
      locale.disciplines.obfuscate.impostorsGuise,
      v,
    );
    if (c.disciplines.obfuscate.length == 0) {
      c.disciplines.obfuscate = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.name] = {
  tags: [tags.Potence],
  type: AttributeType.Section,
};
attributes[locale.disciplines.potence.lethalBody] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.lethalBody,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.soaringLeap] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.soaringLeap,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.prowess] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.prowess,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.brutalFeed] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.brutalFeed,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.sparkOfRage] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.sparkOfRage,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.uncannyGrip] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.uncannyGrip,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.draughtOfMight] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.draughtOfMight,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.earthshock] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.earthshock,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.fistOfCaine] = {
  tags: [tags.Potence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.potence == undefined) c.disciplines.potence = [];
    treatDisciplineArray(
      c.disciplines.potence,
      locale.disciplines.potence.fistOfCaine,
      v,
    );
    if (c.disciplines.potence.length == 0) c.disciplines.potence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.name] = {
  tags: [tags.Presence],
  type: AttributeType.Section,
};
attributes[locale.disciplines.presence.awe] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.awe,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.daunt] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.daunt,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.lingeringKiss] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.lingeringKiss,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.dreadGaze] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.dreadGaze,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.entrancement] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.entrancement,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.irresistibleVoice] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.irresistibleVoice,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.summon] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.summon,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.majesty] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.majesty,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.starMagnetism] = {
  tags: [tags.Presence],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.presence == undefined) c.disciplines.presence = [];
    treatDisciplineArray(
      c.disciplines.presence,
      locale.disciplines.presence.starMagnetism,
      v,
    );
    if (c.disciplines.presence.length == 0) c.disciplines.presence = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.name] = {
  tags: [tags.Celerity],
  type: AttributeType.Section,
};
attributes[locale.disciplines.celerity.catsGrace] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.catsGrace,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.rapidReflexes] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.rapidReflexes,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.fleetness] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.fleetness,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.blink] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.blink,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.traversal] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.traversal,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.draughtOfElegance] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.draughtOfElegance,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.unerringAim] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.unerringAim,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.lightningStrike] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.lightningStrike,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.splitSecond] = {
  tags: [tags.Celerity],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.celerity == undefined) c.disciplines.celerity = [];
    treatDisciplineArray(
      c.disciplines.celerity,
      locale.disciplines.celerity.splitSecond,
      v,
    );
    if (c.disciplines.celerity.length == 0) c.disciplines.celerity = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.name] = {
  tags: [tags.Rituals],
  type: AttributeType.Section,
};
attributes[locale.disciplines.rituals.bloodWalk] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.bloodWalk,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.clingingOfTheInsect] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.clingingOfTheInsect,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.craftBloodstone] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.craftBloodstone,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wakeWithEveningsFreshness] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wakeWithEveningsFreshness,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstGhouls] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardAgainstGhouls,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.communicateWithKindredSire] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.communicateWithKindredSire,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfBabel] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.eyesOfBabel,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.illuminateTheTrailOfPrey] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.illuminateTheTrailOfPrey,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.truthOfBlood] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.truthOfBlood,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstSpirits] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardAgainstSpirits,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstGhouls] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardingCircleAgainstGhouls,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.dagonsCall] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.dagonsCall,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.deflectionOfWoodenDoom] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.deflectionOfWoodenDoom,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.essenceOfAir] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.essenceOfAir,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.firewalker] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.firewalker,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstLupines] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardAgainstLupines,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstSpirits] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardingCircleAgainstSpirits,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.defenseOfTheSacredHaven] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.defenseOfTheSacredHaven,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfTheNighthawk] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.eyesOfTheNighthawk,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.incorporealPassage] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.incorporealPassage,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstCainites] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardAgainstCainites,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstLupines] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardingCircleAgainstLupines,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.escapeToTrueSanctuary] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.escapeToTrueSanctuary,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.heartOfStone] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.heartOfStone,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.shaftOfBelatedDissolution] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.shaftOfBelatedDissolution,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstCainites] = {
  tags: [tags.Rituals],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.rituals == undefined) c.disciplines.rituals = [];
    treatDisciplineArray(
      c.disciplines.rituals,
      locale.disciplines.rituals.wardingCircleAgainstCainites,
      v,
    );
    if (c.disciplines.rituals.length == 0) c.disciplines.rituals = undefined;
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.name] = {
  tags: [tags.ThinBloodAlchemy],
  type: AttributeType.Section,
};
attributes[locale.disciplines.thinBloodAlchemy.farReach] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.farReach,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.haze] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.haze,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.profaneHierosGamos] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.profaneHierosGamos,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.envelop] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.envelop,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.defractionate] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.defractionate,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.airborneMomentum] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.airborneMomentum,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.awakenTheSleeper] = {
  tags: [tags.ThinBloodAlchemy],
  parse: (c, _o, v: boolean) => {
    if (c.disciplines.thinBloodAlchemy == undefined) {
      c.disciplines.thinBloodAlchemy = [];
    }
    treatDisciplineArray(
      c.disciplines.thinBloodAlchemy,
      locale.disciplines.thinBloodAlchemy.awakenTheSleeper,
      v,
    );
    if (c.disciplines.thinBloodAlchemy.length == 0) {
      c.disciplines.thinBloodAlchemy = undefined;
    }
  },
  type: AttributeType.Checkbox,
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
