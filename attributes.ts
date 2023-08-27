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
  }
  else if (!value && index > -1) {
    array.splice(index, 1);
  }
}

attributes[`${locale.clan}[range:${locale.clanOptions.join(",")}]`] = {
  parse: (c, v: string) => c.clan = v,
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
  },
  type: AttributeType.Checkbox,
};
