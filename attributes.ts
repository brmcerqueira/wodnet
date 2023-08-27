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
    parse?: (character: Character, value: string) => void;
    value?: string;
    type?: AttributeType;
    tag?: tags.Tag;
  };
} = {};

attributes[`${locale.clan}[range:${locale.clanOptions.join(",")}]`] = {
  parse: (c, v) => c.clan = v,
};
attributes[locale.disciplines.animalism.name] = {
  tag: tags.Animalism,
  type: AttributeType.Section,
};
attributes[locale.disciplines.animalism.bondFamulus] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.bondFamulus = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.senseTheBeast] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.senseTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.feralWhispers] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.feralWhispers = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalSucculence] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.animalSucculence = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.quellTheBeast] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.quellTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.unlivingHive] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.unlivingHive = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.subsumeTheSpirit] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.subsumeTheSpirit = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalDominion] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.animalDominion = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.drawingOutTheBeast] = {
  tag: tags.Animalism,
  parse: (c, v) => c.disciplines.animalism.drawingOutTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.name] = {
  tag: tags.Auspex,
  type: AttributeType.Section,
};
attributes[locale.disciplines.auspex.heightenedSenses] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.heightenedSenses = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.senseTheUnseen] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.senseTheUnseen = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.premonition] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.premonition = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.scryTheSoul] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.scryTheSoul = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.shareTheSenses] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.shareTheSenses = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.spiritsTouch] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.spiritsTouch = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.clairvoyance] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.clairvoyance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.possession] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.possession = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.telepathy] = {
  tag: tags.Auspex,
  parse: (c, v) => c.disciplines.auspex.telepathy = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.name] = {
  tag: tags.Dominate,
  type: AttributeType.Section,
};
attributes[locale.disciplines.dominate.cloudMemory] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.cloudMemory = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.compel] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.compel = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.mesmerize] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.mesmerize = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.dementation] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.dementation = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.theForgetfulMind] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.theForgetfulMind = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.submergedDirective] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.submergedDirective = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.rationalize] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.rationalize = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.massManipulation] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.massManipulation = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.terminalDecree] = {
  tag: tags.Dominate,
  parse: (c, v) => c.disciplines.dominate.terminalDecree = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.name] = {
  tag: tags.BloodSorcery,
  type: AttributeType.Section,
};
attributes[locale.disciplines.bloodSorcery.corrosiveVitae] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.corrosiveVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.aTasteForBlood] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.aTasteForBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.extinguishVitae] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.extinguishVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.bloodOfPotency] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.bloodOfPotency = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.scorpionsTouch] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.scorpionsTouch = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.theftOfVitae] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.theftOfVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.baalsCaress] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.baalsCaress = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.cauldronOfBlood] = {
  tag: tags.BloodSorcery,
  parse: (c, v) => c.disciplines.bloodSorcery.cauldronOfBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.name] = {
  tag: tags.Fortitude,
  type: AttributeType.Section,
};
attributes[locale.disciplines.fortitude.resilience] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.resilience = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.unswayableMind] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.unswayableMind = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.toughness] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.toughness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.enduringBeasts] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.enduringBeasts = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.defyBane] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.defyBane = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fortifyTheInnerFacade] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.fortifyTheInnerFacade = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.draughtOfEndurance] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.draughtOfEndurance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fleshOfMarble] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.fleshOfMarble = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.prowessFromPain] = {
  tag: tags.Fortitude,
  parse: (c, v) => c.disciplines.fortitude.prowessFromPain = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.name] = {
  tag: tags.Protean,
  type: AttributeType.Section,
};
attributes[locale.disciplines.protean.eyesOfTheBeast] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.eyesOfTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.weightOfTheFeather] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.weightOfTheFeather = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.feralWeapons] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.feralWeapons = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.earthMeld] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.earthMeld = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.shapechange] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.shapechange = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.metamorphosis] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.metamorphosis = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.mistForm] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.mistForm = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.theUnfetteredHeart] = {
  tag: tags.Protean,
  parse: (c, v) => c.disciplines.protean.theUnfetteredHeart = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.name] = {
  tag: tags.Obfuscate,
  type: AttributeType.Section,
};
attributes[locale.disciplines.obfuscate.cloakOfShadows] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.cloakOfShadows = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.silenceOfDeath] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.silenceOfDeath = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.unseenPassage] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.unseenPassage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.ghostInTheMachine] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.ghostInTheMachine = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.maskOfAThousandFaces] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.maskOfAThousandFaces = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.conceal] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.conceal = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.vanish] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.vanish = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.cloakTheGathering] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.cloakTheGathering = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.impostorsGuise] = {
  tag: tags.Obfuscate,
  parse: (c, v) => c.disciplines.obfuscate.impostorsGuise = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.name] = {
  tag: tags.Potence,
  type: AttributeType.Section,
};
attributes[locale.disciplines.potence.lethalBody] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.lethalBody = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.soaringLeap] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.soaringLeap = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.prowess] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.prowess = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.brutalFeed] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.brutalFeed = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.sparkOfRage] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.sparkOfRage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.uncannyGrip] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.uncannyGrip = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.draughtOfMight] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.draughtOfMight = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.earthshock] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.earthshock = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.fistOfCaine] = {
  tag: tags.Potence,
  parse: (c, v) => c.disciplines.potence.fistOfCaine = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.name] = {
  tag: tags.Presence,
  type: AttributeType.Section,
};
attributes[locale.disciplines.presence.awe] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.awe = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.daunt] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.daunt = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.lingeringKiss] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.lingeringKiss = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.dreadGaze] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.dreadGaze = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.entrancement] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.entrancement = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.irresistibleVoice] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.irresistibleVoice = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.summon] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.summon = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.majesty] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.majesty = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.starMagnetism] = {
  tag: tags.Presence,
  parse: (c, v) => c.disciplines.presence.starMagnetism = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.name] = {
  tag: tags.Celerity,
  type: AttributeType.Section,
};
attributes[locale.disciplines.celerity.catsGrace] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.catsGrace = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.rapidReflexes] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.rapidReflexes = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.fleetness] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.fleetness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.blink] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.blink = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.traversal] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.traversal = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.draughtOfElegance] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.draughtOfElegance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.unerringAim] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.unerringAim = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.lightningStrike] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.lightningStrike = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.splitSecond] = {
  tag: tags.Celerity,
  parse: (c, v) => c.disciplines.celerity.splitSecond = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.name] = {
  tag: tags.Rituals,
  type: AttributeType.Section,
};
attributes[locale.disciplines.rituals.bloodWalk] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.bloodWalk = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.clingingOfTheInsect] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.clingingOfTheInsect = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.craftBloodstone] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.craftBloodstone = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wakeWithEveningsFreshness] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.wakeWithEveningsFreshness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstGhouls] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.wardAgainstGhouls = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.communicateWithKindredSire] = {
  tag: tags.Rituals,
  parse: (c, v) =>
    c.disciplines.rituals.communicateWithKindredSire = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfBabel] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.eyesOfBabel = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.illuminateTheTrailOfPrey] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.illuminateTheTrailOfPrey = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.truthOfBlood] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.truthOfBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstSpirits] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.wardAgainstSpirits = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstGhouls] = {
  tag: tags.Rituals,
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstGhouls = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.dagonsCall] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.dagonsCall = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.deflectionOfWoodenDoom] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.deflectionOfWoodenDoom = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.essenceOfAir] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.essenceOfAir = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.firewalker] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.firewalker = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstLupines] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.wardAgainstLupines = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstSpirits] = {
  tag: tags.Rituals,
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstSpirits = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.defenseOfTheSacredHaven] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.defenseOfTheSacredHaven = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfTheNighthawk] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.eyesOfTheNighthawk = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.incorporealPassage] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.incorporealPassage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstCainites] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.wardAgainstCainites = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstLupines] = {
  tag: tags.Rituals,
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstLupines = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.escapeToTrueSanctuary] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.escapeToTrueSanctuary = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.heartOfStone] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.heartOfStone = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.shaftOfBelatedDissolution] = {
  tag: tags.Rituals,
  parse: (c, v) => c.disciplines.rituals.shaftOfBelatedDissolution = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstCainites] = {
  tag: tags.Rituals,
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstCainites = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.name] = {
  tag: tags.ThinBloodAlchemy,
  type: AttributeType.Section,
};
attributes[locale.disciplines.thinBloodAlchemy.farReach] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.farReach = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.haze] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.haze = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.profaneHierosGamos] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) =>
    c.disciplines.thinBloodAlchemy.profaneHierosGamos = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.envelop] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.envelop = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.defractionate] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.defractionate = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.airborneMomentum] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.airborneMomentum = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.awakenTheSleeper] = {
  tag: tags.ThinBloodAlchemy,
  parse: (c, v) => c.disciplines.thinBloodAlchemy.awakenTheSleeper = Boolean(v),
  type: AttributeType.Checkbox,
};
