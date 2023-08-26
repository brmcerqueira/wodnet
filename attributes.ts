import { Character } from "./character.ts";
import { locale } from "./i18n/locale.ts";

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
  };
} = {};

attributes[`${locale.clan}[range:${locale.clanOptions.join(",")}]`] = {
  parse: (c, v) => c.clan = v,
};
attributes[locale.disciplines.animalism.name] = { type: AttributeType.Section };
attributes[locale.disciplines.animalism.bondFamulus] = {
  parse: (c, v) => c.disciplines.animalism.bondFamulus = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.senseTheBeast] = {
  parse: (c, v) => c.disciplines.animalism.senseTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.feralWhispers] = {
  parse: (c, v) => c.disciplines.animalism.feralWhispers = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalSucculence] = {
  parse: (c, v) => c.disciplines.animalism.animalSucculence = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.quellTheBeast] = {
  parse: (c, v) => c.disciplines.animalism.quellTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.unlivingHive] = {
  parse: (c, v) => c.disciplines.animalism.unlivingHive = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.subsumeTheSpirit] = {
  parse: (c, v) => c.disciplines.animalism.subsumeTheSpirit = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.animalDominion] = {
  parse: (c, v) => c.disciplines.animalism.animalDominion = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.animalism.drawingOutTheBeast] = {
  parse: (c, v) => c.disciplines.animalism.drawingOutTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.name] = { type: AttributeType.Section };
attributes[locale.disciplines.auspex.heightenedSenses] = {
  parse: (c, v) => c.disciplines.auspex.heightenedSenses = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.senseTheUnseen] = {
  parse: (c, v) => c.disciplines.auspex.senseTheUnseen = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.premonition] = {
  parse: (c, v) => c.disciplines.auspex.premonition = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.scryTheSoul] = {
  parse: (c, v) => c.disciplines.auspex.scryTheSoul = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.shareTheSenses] = {
  parse: (c, v) => c.disciplines.auspex.shareTheSenses = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.spiritsTouch] = {
  parse: (c, v) => c.disciplines.auspex.spiritsTouch = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.clairvoyance] = {
  parse: (c, v) => c.disciplines.auspex.clairvoyance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.possession] = {
  parse: (c, v) => c.disciplines.auspex.possession = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.auspex.telepathy] = {
  parse: (c, v) => c.disciplines.auspex.telepathy = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.name] = { type: AttributeType.Section };
attributes[locale.disciplines.dominate.cloudMemory] = {
  parse: (c, v) => c.disciplines.dominate.cloudMemory = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.compel] = {
  parse: (c, v) => c.disciplines.dominate.compel = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.mesmerize] = {
  parse: (c, v) => c.disciplines.dominate.mesmerize = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.dementation] = {
  parse: (c, v) => c.disciplines.dominate.dementation = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.theForgetfulMind] = {
  parse: (c, v) => c.disciplines.dominate.theForgetfulMind = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.submergedDirective] = {
  parse: (c, v) => c.disciplines.dominate.submergedDirective = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.rationalize] = {
  parse: (c, v) => c.disciplines.dominate.rationalize = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.massManipulation] = {
  parse: (c, v) => c.disciplines.dominate.massManipulation = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.dominate.terminalDecree] = {
  parse: (c, v) => c.disciplines.dominate.terminalDecree = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.name] = {
  type: AttributeType.Section,
};
attributes[locale.disciplines.bloodSorcery.corrosiveVitae] = {
  parse: (c, v) => c.disciplines.bloodSorcery.corrosiveVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.aTasteForBlood] = {
  parse: (c, v) => c.disciplines.bloodSorcery.aTasteForBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.extinguishVitae] = {
  parse: (c, v) => c.disciplines.bloodSorcery.extinguishVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.bloodOfPotency] = {
  parse: (c, v) => c.disciplines.bloodSorcery.bloodOfPotency = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.scorpionsTouch] = {
  parse: (c, v) => c.disciplines.bloodSorcery.scorpionsTouch = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.theftOfVitae] = {
  parse: (c, v) => c.disciplines.bloodSorcery.theftOfVitae = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.baalsCaress] = {
  parse: (c, v) => c.disciplines.bloodSorcery.baalsCaress = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.bloodSorcery.cauldronOfBlood] = {
  parse: (c, v) => c.disciplines.bloodSorcery.cauldronOfBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.name] = { type: AttributeType.Section };
attributes[locale.disciplines.fortitude.resilience] = {
  parse: (c, v) => c.disciplines.fortitude.resilience = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.unswayableMind] = {
  parse: (c, v) => c.disciplines.fortitude.unswayableMind = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.toughness] = {
  parse: (c, v) => c.disciplines.fortitude.toughness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.enduringBeasts] = {
  parse: (c, v) => c.disciplines.fortitude.enduringBeasts = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.defyBane] = {
  parse: (c, v) => c.disciplines.fortitude.defyBane = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fortifyTheInnerFacade] = {
  parse: (c, v) => c.disciplines.fortitude.fortifyTheInnerFacade = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.draughtOfEndurance] = {
  parse: (c, v) => c.disciplines.fortitude.draughtOfEndurance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.fleshOfMarble] = {
  parse: (c, v) => c.disciplines.fortitude.fleshOfMarble = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.fortitude.prowessFromPain] = {
  parse: (c, v) => c.disciplines.fortitude.prowessFromPain = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.name] = { type: AttributeType.Section };
attributes[locale.disciplines.protean.eyesOfTheBeast] = {
  parse: (c, v) => c.disciplines.protean.eyesOfTheBeast = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.weightOfTheFeather] = {
  parse: (c, v) => c.disciplines.protean.weightOfTheFeather = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.feralWeapons] = {
  parse: (c, v) => c.disciplines.protean.feralWeapons = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.earthMeld] = {
  parse: (c, v) => c.disciplines.protean.earthMeld = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.shapechange] = {
  parse: (c, v) => c.disciplines.protean.shapechange = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.metamorphosis] = {
  parse: (c, v) => c.disciplines.protean.metamorphosis = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.mistForm] = {
  parse: (c, v) => c.disciplines.protean.mistForm = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.protean.theUnfetteredHeart] = {
  parse: (c, v) => c.disciplines.protean.theUnfetteredHeart = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.name] = { type: AttributeType.Section };
attributes[locale.disciplines.obfuscate.cloakOfShadows] = {
  parse: (c, v) => c.disciplines.obfuscate.cloakOfShadows = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.silenceOfDeath] = {
  parse: (c, v) => c.disciplines.obfuscate.silenceOfDeath = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.unseenPassage] = {
  parse: (c, v) => c.disciplines.obfuscate.unseenPassage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.ghostInTheMachine] = {
  parse: (c, v) => c.disciplines.obfuscate.ghostInTheMachine = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.maskOfAThousandFaces] = {
  parse: (c, v) => c.disciplines.obfuscate.maskOfAThousandFaces = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.conceal] = {
  parse: (c, v) => c.disciplines.obfuscate.conceal = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.vanish] = {
  parse: (c, v) => c.disciplines.obfuscate.vanish = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.cloakTheGathering] = {
  parse: (c, v) => c.disciplines.obfuscate.cloakTheGathering = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.obfuscate.impostorsGuise] = {
  parse: (c, v) => c.disciplines.obfuscate.impostorsGuise = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.name] = { type: AttributeType.Section };
attributes[locale.disciplines.potence.lethalBody] = {
  parse: (c, v) => c.disciplines.potence.lethalBody = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.soaringLeap] = {
  parse: (c, v) => c.disciplines.potence.soaringLeap = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.prowess] = {
  parse: (c, v) => c.disciplines.potence.prowess = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.brutalFeed] = {
  parse: (c, v) => c.disciplines.potence.brutalFeed = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.sparkOfRage] = {
  parse: (c, v) => c.disciplines.potence.sparkOfRage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.uncannyGrip] = {
  parse: (c, v) => c.disciplines.potence.uncannyGrip = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.draughtOfMight] = {
  parse: (c, v) => c.disciplines.potence.draughtOfMight = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.earthshock] = {
  parse: (c, v) => c.disciplines.potence.earthshock = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.potence.fistOfCaine] = {
  parse: (c, v) => c.disciplines.potence.fistOfCaine = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.name] = { type: AttributeType.Section };
attributes[locale.disciplines.presence.awe] = {
  parse: (c, v) => c.disciplines.presence.awe = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.daunt] = {
  parse: (c, v) => c.disciplines.presence.daunt = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.lingeringKiss] = {
  parse: (c, v) => c.disciplines.presence.lingeringKiss = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.dreadGaze] = {
  parse: (c, v) => c.disciplines.presence.dreadGaze = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.entrancement] = {
  parse: (c, v) => c.disciplines.presence.entrancement = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.irresistibleVoice] = {
  parse: (c, v) => c.disciplines.presence.irresistibleVoice = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.summon] = {
  parse: (c, v) => c.disciplines.presence.summon = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.majesty] = {
  parse: (c, v) => c.disciplines.presence.majesty = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.presence.starMagnetism] = {
  parse: (c, v) => c.disciplines.presence.starMagnetism = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.name] = { type: AttributeType.Section };
attributes[locale.disciplines.celerity.catsGrace] = {
  parse: (c, v) => c.disciplines.celerity.catsGrace = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.rapidReflexes] = {
  parse: (c, v) => c.disciplines.celerity.rapidReflexes = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.fleetness] = {
  parse: (c, v) => c.disciplines.celerity.fleetness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.blink] = {
  parse: (c, v) => c.disciplines.celerity.blink = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.traversal] = {
  parse: (c, v) => c.disciplines.celerity.traversal = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.draughtOfElegance] = {
  parse: (c, v) => c.disciplines.celerity.draughtOfElegance = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.unerringAim] = {
  parse: (c, v) => c.disciplines.celerity.unerringAim = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.lightningStrike] = {
  parse: (c, v) => c.disciplines.celerity.lightningStrike = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.celerity.splitSecond] = {
  parse: (c, v) => c.disciplines.celerity.splitSecond = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.name] = { type: AttributeType.Section };
attributes[locale.disciplines.rituals.bloodWalk] = {
  parse: (c, v) => c.disciplines.rituals.bloodWalk = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.clingingOfTheInsect] = {
  parse: (c, v) => c.disciplines.rituals.clingingOfTheInsect = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.craftBloodstone] = {
  parse: (c, v) => c.disciplines.rituals.craftBloodstone = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wakeWithEveningsFreshness] = {
  parse: (c, v) => c.disciplines.rituals.wakeWithEveningsFreshness = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstGhouls] = {
  parse: (c, v) => c.disciplines.rituals.wardAgainstGhouls = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.communicateWithKindredSire] = {
  parse: (c, v) =>
    c.disciplines.rituals.communicateWithKindredSire = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfBabel] = {
  parse: (c, v) => c.disciplines.rituals.eyesOfBabel = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.illuminateTheTrailOfPrey] = {
  parse: (c, v) => c.disciplines.rituals.illuminateTheTrailOfPrey = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.truthOfBlood] = {
  parse: (c, v) => c.disciplines.rituals.truthOfBlood = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstSpirits] = {
  parse: (c, v) => c.disciplines.rituals.wardAgainstSpirits = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstGhouls] = {
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstGhouls = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.dagonsCall] = {
  parse: (c, v) => c.disciplines.rituals.dagonsCall = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.deflectionOfWoodenDoom] = {
  parse: (c, v) => c.disciplines.rituals.deflectionOfWoodenDoom = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.essenceOfAir] = {
  parse: (c, v) => c.disciplines.rituals.essenceOfAir = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.firewalker] = {
  parse: (c, v) => c.disciplines.rituals.firewalker = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstLupines] = {
  parse: (c, v) => c.disciplines.rituals.wardAgainstLupines = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstSpirits] = {
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstSpirits = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.defenseOfTheSacredHaven] = {
  parse: (c, v) => c.disciplines.rituals.defenseOfTheSacredHaven = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.eyesOfTheNighthawk] = {
  parse: (c, v) => c.disciplines.rituals.eyesOfTheNighthawk = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.incorporealPassage] = {
  parse: (c, v) => c.disciplines.rituals.incorporealPassage = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardAgainstCainites] = {
  parse: (c, v) => c.disciplines.rituals.wardAgainstCainites = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstLupines] = {
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstLupines = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.escapeToTrueSanctuary] = {
  parse: (c, v) => c.disciplines.rituals.escapeToTrueSanctuary = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.heartOfStone] = {
  parse: (c, v) => c.disciplines.rituals.heartOfStone = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.shaftOfBelatedDissolution] = {
  parse: (c, v) => c.disciplines.rituals.shaftOfBelatedDissolution = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.rituals.wardingCircleAgainstCainites] = {
  parse: (c, v) =>
    c.disciplines.rituals.wardingCircleAgainstCainites = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.name] = {
  type: AttributeType.Section,
};
attributes[locale.disciplines.thinBloodAlchemy.farReach] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.farReach = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.haze] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.haze = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.profaneHierosGamos] = {
  parse: (c, v) =>
    c.disciplines.thinBloodAlchemy.profaneHierosGamos = Boolean(v),
  type: AttributeType.Checkbox,
};
attributes[locale.disciplines.thinBloodAlchemy.envelop] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.envelop = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.defractionate] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.defractionate = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.airborneMomentum] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.airborneMomentum = Boolean(v),
  type: AttributeType.Checkbox,
};

attributes[locale.disciplines.thinBloodAlchemy.awakenTheSleeper] = {
  parse: (c, v) => c.disciplines.thinBloodAlchemy.awakenTheSleeper = Boolean(v),
  type: AttributeType.Checkbox,
};