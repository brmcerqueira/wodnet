import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import {
  booleanChoices,
  calculateSpent,
  CommandOptionType,
  commands,
  option,
  treatKey,
} from "./common.ts";

type Value = boolean | Input;
type Input = { [key: string]: Value };

function getMultiplier(
  key: keyof Character["disciplines"],
  character: Character,
): number {
  const disciplines = locale.clan.options[character.clan];
  return disciplines
    ? (disciplines.indexOf((locale.disciplines as any)[key].name) > -1 ? 5 : 7)
    : (disciplines == null ? 6 : 7);
}

function updateDiscipline(input: Input, array: string[]) {
  for (const key in input) {
    const item = input[key];

    if (typeof item == "boolean") {
      const index = array.indexOf(key);

      if (item) {
        if (index == -1) {
          array.push(key);
        }
      } else if (index > -1) {
        array.splice(index, 1);
      }
    } else {
      updateDiscipline(item, array);
    }
  }
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

    updateDiscipline(input, array);

    if (array.length == 0) {
      delete c.disciplines[key];
    }

    return calculateSpent(old, array.length, multiplier(key, c));
  };
}

commands[treatKey(locale.disciplines.animalism.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.animalism.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("animalism", getMultiplier),
  ),
  options: option(locale.disciplines.animalism.bondFamulus, {
    property: "bondFamulus",
    description: locale.disciplines.animalism.bondFamulus,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.senseTheBeast, {
    property: "senseTheBeast",
    description: locale.disciplines.animalism.senseTheBeast,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.feralWhispers, {
    property: "feralWhispers",
    description: locale.disciplines.animalism.feralWhispers,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.animalSucculence, {
    property: "animalSucculence",
    description: locale.disciplines.animalism.animalSucculence,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.quellTheBeast, {
    property: "quellTheBeast",
    description: locale.disciplines.animalism.quellTheBeast,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.unlivingHive, {
    property: "unlivingHive",
    description: locale.disciplines.animalism.unlivingHive,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.subsumeTheSpirit, {
    property: "subsumeTheSpirit",
    description: locale.disciplines.animalism.subsumeTheSpirit,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.animalDominion, {
    property: "animalDominion",
    description: locale.disciplines.animalism.animalDominion,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.animalism.drawingOutTheBeast, {
    property: "drawingOutTheBeast",
    description: locale.disciplines.animalism.drawingOutTheBeast,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.auspex.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.auspex.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("auspex", getMultiplier)),
  options: option(locale.disciplines.auspex.heightenedSenses, {
    property: "heightenedSenses",
    description: locale.disciplines.auspex.heightenedSenses,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.senseTheUnseen, {
    property: "senseTheUnseen",
    description: locale.disciplines.auspex.senseTheUnseen,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.obeah, {
    property: "obeah",
    description: locale.disciplines.auspex.obeah,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.premonition, {
    property: "premonition",
    description: locale.disciplines.auspex.premonition,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.scryTheSoul, {
    property: "scryTheSoul",
    description: locale.disciplines.auspex.scryTheSoul,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.shareTheSenses, {
    property: "shareTheSenses",
    description: locale.disciplines.auspex.shareTheSenses,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.spiritsTouch, {
    property: "spiritsTouch",
    description: locale.disciplines.auspex.spiritsTouch,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.clairvoyance, {
    property: "clairvoyance",
    description: locale.disciplines.auspex.clairvoyance,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.possession, {
    property: "possession",
    description: locale.disciplines.auspex.possession,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.telepathy, {
    property: "telepathy",
    description: locale.disciplines.auspex.telepathy,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.auspex.unburdeningTheBestialSoul, {
    property: "unburdeningTheBestialSoul",
    description: locale.disciplines.auspex.unburdeningTheBestialSoul,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.dominate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.dominate.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("dominate", getMultiplier)),
  options: option(locale.disciplines.dominate.cloudMemory, {
    property: "cloudMemory",
    description: locale.disciplines.dominate.cloudMemory,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.compel, {
    property: "compel",
    description: locale.disciplines.dominate.compel,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.mesmerize, {
    property: "mesmerize",
    description: locale.disciplines.dominate.mesmerize,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.dementation, {
    property: "dementation",
    description: locale.disciplines.dominate.dementation,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.domitorsFavor, {
    property: "domitorsFavor",
    description: locale.disciplines.dominate.domitorsFavor,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.theForgetfulMind, {
    property: "theForgetfulMind",
    description: locale.disciplines.dominate.theForgetfulMind,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.submergedDirective, {
    property: "submergedDirective",
    description: locale.disciplines.dominate.submergedDirective,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.rationalize, {
    property: "rationalize",
    description: locale.disciplines.dominate.rationalize,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.massManipulation, {
    property: "massManipulation",
    description: locale.disciplines.dominate.massManipulation,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.dominate.terminalDecree, {
    property: "terminalDecree",
    description: locale.disciplines.dominate.terminalDecree,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.bloodSorcery.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.bloodSorcery.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("bloodSorcery", getMultiplier),
  ),
  options: option(locale.disciplines.bloodSorcery.corrosiveVitae, {
    property: "corrosiveVitae",
    description: locale.disciplines.bloodSorcery.corrosiveVitae,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.aTasteForBlood, {
    property: "aTasteForBlood",
    description: locale.disciplines.bloodSorcery.aTasteForBlood,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.extinguishVitae, {
    property: "extinguishVitae",
    description: locale.disciplines.bloodSorcery.extinguishVitae,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.bloodOfPotency, {
    property: "bloodOfPotency",
    description: locale.disciplines.bloodSorcery.bloodOfPotency,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.scorpionsTouch, {
    property: "scorpionsTouch",
    description: locale.disciplines.bloodSorcery.scorpionsTouch,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.theftOfVitae, {
    property: "theftOfVitae",
    description: locale.disciplines.bloodSorcery.theftOfVitae,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.baalsCaress, {
    property: "baalsCaress",
    description: locale.disciplines.bloodSorcery.baalsCaress,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.bloodSorcery.cauldronOfBlood, {
    property: "cauldronOfBlood",
    description: locale.disciplines.bloodSorcery.cauldronOfBlood,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.fortitude.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.fortitude.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("fortitude", getMultiplier),
  ),
  options: option(locale.disciplines.fortitude.resilience, {
    property: "resilience",
    description: locale.disciplines.fortitude.resilience,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.unswayableMind, {
    property: "unswayableMind",
    description: locale.disciplines.fortitude.unswayableMind,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.toughness, {
    property: "toughness",
    description: locale.disciplines.fortitude.toughness,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.enduringBeasts, {
    property: "enduringBeasts",
    description: locale.disciplines.fortitude.enduringBeasts,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.valeren, {
    property: "valeren",
    description: locale.disciplines.fortitude.valeren,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.defyBane, {
    property: "defyBane",
    description: locale.disciplines.fortitude.defyBane,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.fortifyTheInnerFacade, {
    property: "fortifyTheInnerFacade",
    description: locale.disciplines.fortitude.fortifyTheInnerFacade,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.draughtOfEndurance, {
    property: "draughtOfEndurance",
    description: locale.disciplines.fortitude.draughtOfEndurance,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.fleshOfMarble, {
    property: "fleshOfMarble",
    description: locale.disciplines.fortitude.fleshOfMarble,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.fortitude.prowessFromPain, {
    property: "prowessFromPain",
    description: locale.disciplines.fortitude.prowessFromPain,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.protean.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.protean.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("protean", getMultiplier)),
  options: option(locale.disciplines.protean.eyesOfTheBeast, {
    property: "eyesOfTheBeast",
    description: locale.disciplines.protean.eyesOfTheBeast,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.weightOfTheFeather, {
    property: "weightOfTheFeather",
    description: locale.disciplines.protean.weightOfTheFeather,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.feralWeapons, {
    property: "feralWeapons",
    description: locale.disciplines.protean.feralWeapons,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.vicissitude, {
    property: "vicissitude",
    description: locale.disciplines.protean.vicissitude,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.earthMeld, {
    property: "earthMeld",
    description: locale.disciplines.protean.earthMeld,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.shapechange, {
    property: "shapechange",
    description: locale.disciplines.protean.shapechange,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.fleshcrafting, {
    property: "fleshcrafting",
    description: locale.disciplines.protean.fleshcrafting,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.metamorphosis, {
    property: "metamorphosis",
    description: locale.disciplines.protean.metamorphosis,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.horridForm, {
    property: "horridForm",
    description: locale.disciplines.protean.horridForm,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.mistForm, {
    property: "mistForm",
    description: locale.disciplines.protean.mistForm,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.theUnfetteredHeart, {
    property: "theUnfetteredHeart",
    description: locale.disciplines.protean.theUnfetteredHeart,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.protean.oneWithTheLand, {
    property: "oneWithTheLand",
    description: locale.disciplines.protean.oneWithTheLand,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.obfuscate.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.obfuscate.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("obfuscate", getMultiplier),
  ),
  options: option(locale.disciplines.obfuscate.cloakOfShadows, {
    property: "cloakOfShadows",
    description: locale.disciplines.obfuscate.cloakOfShadows,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.silenceOfDeath, {
    property: "silenceOfDeath",
    description: locale.disciplines.obfuscate.silenceOfDeath,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.unseenPassage, {
    property: "unseenPassage",
    description: locale.disciplines.obfuscate.unseenPassage,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.chimerstry, {
    property: "chimerstry",
    description: locale.disciplines.obfuscate.chimerstry,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.ghostInTheMachine, {
    property: "ghostInTheMachine",
    description: locale.disciplines.obfuscate.ghostInTheMachine,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.maskOfAThousandFaces, {
    property: "maskOfAThousandFaces",
    description: locale.disciplines.obfuscate.maskOfAThousandFaces,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.fataMorgana, {
    property: "fataMorgana",
    description: locale.disciplines.obfuscate.fataMorgana,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.conceal, {
    property: "conceal",
    description: locale.disciplines.obfuscate.conceal,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.vanish, {
    property: "vanish",
    description: locale.disciplines.obfuscate.vanish,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.cloakTheGathering, {
    property: "cloakTheGathering",
    description: locale.disciplines.obfuscate.cloakTheGathering,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.obfuscate.impostorsGuise, {
    property: "impostorsGuise",
    description: locale.disciplines.obfuscate.impostorsGuise,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.potence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.potence.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("potence", getMultiplier)),
  options: option(locale.disciplines.potence.lethalBody, {
    property: "lethalBody",
    description: locale.disciplines.potence.lethalBody,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.soaringLeap, {
    property: "soaringLeap",
    description: locale.disciplines.potence.soaringLeap,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.prowess, {
    property: "prowess",
    description: locale.disciplines.potence.prowess,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.brutalFeed, {
    property: "brutalFeed",
    description: locale.disciplines.potence.brutalFeed,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.sparkOfRage, {
    property: "sparkOfRage",
    description: locale.disciplines.potence.sparkOfRage,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.uncannyGrip, {
    property: "uncannyGrip",
    description: locale.disciplines.potence.uncannyGrip,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.draughtOfMight, {
    property: "draughtOfMight",
    description: locale.disciplines.potence.draughtOfMight,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.earthshock, {
    property: "earthshock",
    description: locale.disciplines.potence.earthshock,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.potence.fistOfCaine, {
    property: "fistOfCaine",
    description: locale.disciplines.potence.fistOfCaine,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.presence.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.presence.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("presence", getMultiplier)),
  options: option(locale.disciplines.presence.awe, {
    property: "awe",
    description: locale.disciplines.presence.awe,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.daunt, {
    property: "daunt",
    description: locale.disciplines.presence.daunt,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.eyesOfTheSerpent, {
    property: "eyesOfTheSerpent",
    description: locale.disciplines.presence.eyesOfTheSerpent,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.lingeringKiss, {
    property: "lingeringKiss",
    description: locale.disciplines.presence.lingeringKiss,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.dreadGaze, {
    property: "dreadGaze",
    description: locale.disciplines.presence.dreadGaze,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.entrancement, {
    property: "entrancement",
    description: locale.disciplines.presence.entrancement,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.irresistibleVoice, {
    property: "irresistibleVoice",
    description: locale.disciplines.presence.irresistibleVoice,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.summon, {
    property: "summon",
    description: locale.disciplines.presence.summon,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.majesty, {
    property: "majesty",
    description: locale.disciplines.presence.majesty,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.presence.starMagnetism, {
    property: "starMagnetism",
    description: locale.disciplines.presence.starMagnetism,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.celerity.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.celerity.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("celerity", getMultiplier)),
  options: option(locale.disciplines.celerity.catsGrace, {
    property: "catsGrace",
    description: locale.disciplines.celerity.catsGrace,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.rapidReflexes, {
    property: "rapidReflexes",
    description: locale.disciplines.celerity.rapidReflexes,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.fleetness, {
    property: "fleetness",
    description: locale.disciplines.celerity.fleetness,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.blink, {
    property: "blink",
    description: locale.disciplines.celerity.blink,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.traversal, {
    property: "traversal",
    description: locale.disciplines.celerity.traversal,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.draughtOfElegance, {
    property: "draughtOfElegance",
    description: locale.disciplines.celerity.draughtOfElegance,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.unerringAim, {
    property: "unerringAim",
    description: locale.disciplines.celerity.unerringAim,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.lightningStrike, {
    property: "lightningStrike",
    description: locale.disciplines.celerity.lightningStrike,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.celerity.splitSecond, {
    property: "splitSecond",
    description: locale.disciplines.celerity.splitSecond,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
commands[treatKey(locale.disciplines.rituals.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.rituals.name}`,
  solve: buildCharacterUpdateSolver(disciplineParse("rituals", () => 3)),
  options: option(locale.commands.sheet.common.name, {
    property: "common",
    description: locale.commands.sheet.common.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.bloodWalk, {
      property: "bloodWalk",
      description: locale.disciplines.rituals.bloodWalk,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.clingingOfTheInsect, {
      property: "clingingOfTheInsect",
      description: locale.disciplines.rituals.clingingOfTheInsect,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.craftBloodstone, {
      property: "craftBloodstone",
      description: locale.disciplines.rituals.craftBloodstone,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wakeWithEveningsFreshness, {
      property: "wakeWithEveningsFreshness",
      description: locale.disciplines.rituals.wakeWithEveningsFreshness,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.communicateWithKindredSire, {
      property: "communicateWithKindredSire",
      description: locale.disciplines.rituals.communicateWithKindredSire,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.eyesOfBabel, {
      property: "eyesOfBabel",
      description: locale.disciplines.rituals.eyesOfBabel,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.illuminateTheTrailOfPrey, {
      property: "illuminateTheTrailOfPrey",
      description: locale.disciplines.rituals.illuminateTheTrailOfPrey,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.ishtarsTouch, {
      property: "ishtarsTouch",
      description: locale.disciplines.rituals.ishtarsTouch,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.truthOfBlood, {
      property: "truthOfBlood",
      description: locale.disciplines.rituals.truthOfBlood,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.dagonsCall, {
      property: "dagonsCall",
      description: locale.disciplines.rituals.dagonsCall,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.deflectionOfWoodenDoom, {
      property: "deflectionOfWoodenDoom",
      description: locale.disciplines.rituals.deflectionOfWoodenDoom,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.essenceOfAir, {
      property: "essenceOfAir",
      description: locale.disciplines.rituals.essenceOfAir,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.firewalker, {
      property: "firewalker",
      description: locale.disciplines.rituals.firewalker,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.oneWithTheBlade, {
      property: "oneWithTheBlade",
      description: locale.disciplines.rituals.oneWithTheBlade,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.defenseOfTheSacredHaven, {
      property: "defenseOfTheSacredHaven",
      description: locale.disciplines.rituals.defenseOfTheSacredHaven,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.eyesOfTheNighthawk, {
      property: "eyesOfTheNighthawk",
      description: locale.disciplines.rituals.eyesOfTheNighthawk,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.incorporealPassage, {
      property: "incorporealPassage",
      description: locale.disciplines.rituals.incorporealPassage,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.escapeToTrueSanctuary, {
      property: "escapeToTrueSanctuary",
      description: locale.disciplines.rituals.escapeToTrueSanctuary,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.heartOfStone, {
      property: "heartOfStone",
      description: locale.disciplines.rituals.heartOfStone,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.shaftOfBelatedDissolution, {
      property: "shaftOfBelatedDissolution",
      description: locale.disciplines.rituals.shaftOfBelatedDissolution,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).build,
  }).option(locale.commands.sheet.wards.name, {
    property: "wards",
    description: locale.commands.sheet.wards.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.wardAgainstGhouls, {
      property: "wardAgainstGhouls",
      description: locale.disciplines.rituals.wardAgainstGhouls,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardAgainstSpirits, {
      property: "wardAgainstSpirits",
      description: locale.disciplines.rituals.wardAgainstSpirits,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardAgainstLupines, {
      property: "wardAgainstLupines",
      description: locale.disciplines.rituals.wardAgainstLupines,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardAgainstCainites, {
      property: "wardAgainstCainites",
      description: locale.disciplines.rituals.wardAgainstCainites,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).build,
  }).option(locale.commands.sheet.circles.name, {
    property: "circles",
    description: locale.commands.sheet.circles.description,
    type: CommandOptionType.SUB_COMMAND,
    options: option(locale.disciplines.rituals.wardingCircleAgainstGhouls, {
      property: "wardingCircleAgainstGhouls",
      description: locale.disciplines.rituals.wardingCircleAgainstGhouls,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardingCircleAgainstSpirits, {
      property: "wardingCircleAgainstSpirits",
      description: locale.disciplines.rituals.wardingCircleAgainstSpirits,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardingCircleAgainstLupines, {
      property: "wardingCircleAgainstLupines",
      description: locale.disciplines.rituals.wardingCircleAgainstLupines,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).option(locale.disciplines.rituals.wardingCircleAgainstCainites, {
      property: "wardingCircleAgainstCainites",
      description: locale.disciplines.rituals.wardingCircleAgainstCainites,
      type: CommandOptionType.STRING,
      choices: booleanChoices(),
    }).build,
  }).build,
};
commands[treatKey(locale.disciplines.thinBloodAlchemy.name)] = {
  description:
    `${locale.commands.sheet.description} ${locale.disciplines.thinBloodAlchemy.name}`,
  solve: buildCharacterUpdateSolver(
    disciplineParse("thinBloodAlchemy", () => 3),
  ),
  options: option(locale.disciplines.thinBloodAlchemy.farReach, {
    property: "farReach",
    description: locale.disciplines.thinBloodAlchemy.farReach,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.haze, {
    property: "haze",
    description: locale.disciplines.thinBloodAlchemy.haze,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.envelop, {
    property: "envelop",
    description: locale.disciplines.thinBloodAlchemy.envelop,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.profaneHierosGamos, {
    property: "profaneHierosGamos",
    description: locale.disciplines.thinBloodAlchemy.profaneHierosGamos,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.defractionate, {
    property: "defractionate",
    description: locale.disciplines.thinBloodAlchemy.defractionate,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.airborneMomentum, {
    property: "airborneMomentum",
    description: locale.disciplines.thinBloodAlchemy.airborneMomentum,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).option(locale.disciplines.thinBloodAlchemy.awakenTheSleeper, {
    property: "awakenTheSleeper",
    description: locale.disciplines.thinBloodAlchemy.awakenTheSleeper,
    type: CommandOptionType.STRING,
    choices: booleanChoices(),
  }).build,
};
