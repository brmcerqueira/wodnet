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

export const attributes: {
  [name: string]: {
    parse?: (character: Character, value: any) => void;
    value?: string;
    type?: AttributeType;
    tag?: tags.Tag;
  };
} = {};

function treatDisciplineArray(array: string[], label: string, value: boolean) {
  const index = array.indexOf(label);
  if (value && index == -1) {
    array.push(label);
  } else if (!value && index > -1) {
    array.splice(index, 1);
  }
}

attributes[locale.player] = {
  parse: (c, v: string) => c.player = v,
};
attributes[locale.sire] = {
  parse: (c, v: string) => c.sire = v,
};
attributes[
  `${locale.resonance.name}[range:,${locale.resonance.options.join(",")}]`
] = {
  parse: (c, v: string) => c.resonance = v,
};
attributes[locale.ambition] = {
  parse: (c, v: string) => c.ambition = v,
};
attributes[locale.desire] = {
  parse: (c, v: string) => c.desire = v,
};
attributes[
  `${locale.predator.name}[range:${locale.predator.options.join(",")}]`
] = {
  parse: (c, v: string) => c.predator = v,
};
attributes[`${locale.clan.name}[range:${locale.clan.options.join(",")}]`] = {
  parse: (c, v: string) => c.clan = v,
};
attributes[`${locale.generation.name}[range:4-16]`] = {
  parse: (c, v: number) => c.generation = v || 13,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.physical}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.physical.strength}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.physical.strength = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.physical.dexterity}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.physical.dexterity = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.physical.stamina}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.physical.stamina = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.social}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.social.charisma}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.social.charisma = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.social.manipulation}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.social.manipulation = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.social.composure}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.social.composure = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.name} - ${locale.mental}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.attributes.mental.intelligence}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.mental.intelligence = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.mental.wits}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.mental.wits = v,
  type: AttributeType.Number,
};
attributes[`${locale.attributes.mental.resolve}[range:1-5]`] = {
  parse: (c, v: number) => c.attributes.mental.resolve = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.physical}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.physical.melee}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.melee = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.firearms}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.firearms = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.athletics}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.athletics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.brawl}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.brawl = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.drive}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.drive = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.stealth}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.stealth = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.larceny}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.larceny = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.craft}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.craft = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.physical.survival}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.physical.survival = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.social}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.social.animalKen}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.animalKen = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.etiquette}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.etiquette = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.intimidation}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.intimidation = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.leadership}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.leadership = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.streetwise}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.streetwise = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.performance}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.performance = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.persuasion}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.persuasion = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.insight}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.insight = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.social.subterfuge}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.social.subterfuge = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.name} - ${locale.mental}`] = {
  type: AttributeType.Section,
};
attributes[`${locale.skills.mental.science}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.science = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.academics}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.academics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.finance}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.finance = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.investigation}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.investigation = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.medicine}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.medicine = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.occult}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.occult = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.awareness}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.awareness = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.politics}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.politics = v,
  type: AttributeType.Number,
};
attributes[`${locale.skills.mental.technology}[range:0-5]`] = {
  parse: (c, v: number) => c.skills.mental.technology = v,
  type: AttributeType.Number,
};
attributes[locale.advantages] = {
  type: AttributeType.Section,
};
attributes[locale.flaws] = {
  type: AttributeType.Section,
};
attributes[locale.disciplines.animalism.name] = {
  tag: tags.Animalism,
  type: AttributeType.Section,
};
attributes[locale.disciplines.animalism.bondFamulus] = {
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Animalism,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  type: AttributeType.Section,
};
attributes[locale.disciplines.auspex.heightenedSenses] = {
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Auspex,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  type: AttributeType.Section,
};
attributes[locale.disciplines.dominate.cloudMemory] = {
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.Dominate,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  type: AttributeType.Section,
};
attributes[locale.disciplines.bloodSorcery.corrosiveVitae] = {
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.BloodSorcery,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  type: AttributeType.Section,
};
attributes[locale.disciplines.fortitude.resilience] = {
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Fortitude,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  type: AttributeType.Section,
};
attributes[locale.disciplines.protean.eyesOfTheBeast] = {
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Protean,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  type: AttributeType.Section,
};
attributes[locale.disciplines.obfuscate.cloakOfShadows] = {
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Obfuscate,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  type: AttributeType.Section,
};
attributes[locale.disciplines.potence.lethalBody] = {
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Potence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  type: AttributeType.Section,
};
attributes[locale.disciplines.presence.awe] = {
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Presence,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  type: AttributeType.Section,
};
attributes[locale.disciplines.celerity.catsGrace] = {
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Celerity,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  type: AttributeType.Section,
};
attributes[locale.disciplines.rituals.bloodWalk] = {
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.Rituals,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  type: AttributeType.Section,
};
attributes[locale.disciplines.thinBloodAlchemy.farReach] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
  tag: tags.ThinBloodAlchemy,
  parse: (c, v: boolean) => {
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
