type OptionsLocale = {
  name: string;
  options: string[];
};

type CommandOption = {
  name: string;
  description: string;
};

export type LocaleType = {
  app: string;
  none: string;
  value: string;
  type: string;
  standard: string;
  character: string;
  specialties: {
    name: string;
    skill: string;
    specialty: string;
  };
  characterLinks: string;
  details: string;
  name: string;
  image: string;
  player: string;
  resonance: OptionsLocale;
  ambition: string;
  desire: string;
  predator: OptionsLocale;
  clan: OptionsLocale;
  generation: {
    name: string;
    suffix: string;
  };
  physical: string;
  social: string;
  mental: string;
  attributes: {
    name: string;
    physical: {
      strength: string;
      dexterity: string;
      stamina: string;
    };
    social: {
      charisma: string;
      manipulation: string;
      composure: string;
    };
    mental: {
      intelligence: string;
      wits: string;
      resolve: string;
    };
  };
  skills: {
    name: string;
    physical: {
      athletics: string;
      brawl: string;
      craft: string;
      drive: string;
      firearms: string;
      melee: string;
      larceny: string;
      stealth: string;
      survival: string;
    };
    social: {
      animalKen: string;
      etiquette: string;
      insight: string;
      intimidation: string;
      leadership: string;
      performance: string;
      persuasion: string;
      streetwise: string;
      subterfuge: string;
    };
    mental: {
      academics: string;
      awareness: string;
      finance: string;
      investigation: string;
      medicine: string;
      occult: string;
      politics: string;
      science: string;
      technology: string;
    };
  };
  health: string;
  willpower: string;
  damage: {
    superficial: string;
    aggravated: string;
  };
  humanity: string;
  stains: string;
  bloodPotency: string;
  hunger: string;
  experience: {
    name: string;
    total: string;
    spent: string;
  };
  apply: string;
  advantages: string;
  flaws: string;
  disciplines: {
    name: string;
    animalism: {
      name: string;
      bondFamulus: string;
      senseTheBeast: string;
      feralWhispers: string;
      animalSucculence: string;
      quellTheBeast: string;
      unlivingHive: string;
      subsumeTheSpirit: string;
      animalDominion: string;
      drawingOutTheBeast: string;
    };
    auspex: {
      name: string;
      heightenedSenses: string;
      senseTheUnseen: string;
      obeah: string,
      premonition: string;
      scryTheSoul: string;
      shareTheSenses: string;
      spiritsTouch: string;
      clairvoyance: string;
      possession: string;
      telepathy: string;
      unburdeningTheBestialSoul: string;
    };
    dominate: {
      name: string;
      cloudMemory: string;
      compel: string;
      mesmerize: string;
      dementation: string;
      domitorsFavor: string;
      theForgetfulMind: string;
      submergedDirective: string;
      rationalize: string;
      massManipulation: string;
      terminalDecree: string;
    };
    bloodSorcery: {
      name: string;
      corrosiveVitae: string;
      aTasteForBlood: string;
      extinguishVitae: string;
      bloodOfPotency: string;
      scorpionsTouch: string;
      theftOfVitae: string;
      baalsCaress: string;
      cauldronOfBlood: string;
    };
    fortitude: {
      name: string;
      resilience: string;
      unswayableMind: string;
      toughness: string;
      enduringBeasts: string;
      valeren: string;
      defyBane: string;
      fortifyTheInnerFacade: string;
      draughtOfEndurance: string;
      fleshOfMarble: string;
      prowessFromPain: string;
    };
    protean: {
      name: string;
      eyesOfTheBeast: string;
      weightOfTheFeather: string;
      feralWeapons: string;
      vicissitude: string;
      earthMeld: string;
      shapechange: string;
      fleshcrafting: string;
      metamorphosis: string;
      horridForm: string;
      mistForm: string;
      theUnfetteredHeart: string;
      oneWithTheLand: string;
    };
    obfuscate: {
      name: string;
      cloakOfShadows: string;
      silenceOfDeath: string;
      unseenPassage: string;
      chimerstry: string;
      ghostInTheMachine: string;
      maskOfAThousandFaces: string;
      fataMorgana: string;
      conceal: string;
      vanish: string;
      cloakTheGathering: string;
      impostorsGuise: string;
    };
    potence: {
      name: string;
      lethalBody: string;
      soaringLeap: string;
      prowess: string;
      brutalFeed: string;
      sparkOfRage: string;
      uncannyGrip: string;
      draughtOfMight: string;
      earthshock: string;
      fistOfCaine: string;
    };
    presence: {
      name: string;
      awe: string;
      daunt: string;
      eyesOfTheSerpent: string;
      lingeringKiss: string;
      dreadGaze: string;
      entrancement: string;
      irresistibleVoice: string;
      summon: string;
      majesty: string;
      starMagnetism: string;
    };
    celerity: {
      name: string;
      catsGrace: string;
      rapidReflexes: string;
      fleetness: string;
      blink: string;
      traversal: string;
      draughtOfElegance: string;
      unerringAim: string;
      lightningStrike: string;
      splitSecond: string;
    };
    rituals: {
      name: string;
      bloodWalk: string;
      clingingOfTheInsect: string;
      craftBloodstone: string;
      wakeWithEveningsFreshness: string;
      wardAgainstGhouls: string;
      communicateWithKindredSire: string;
      eyesOfBabel: string;
      illuminateTheTrailOfPrey: string;
      ishtarsTouch: string;
      truthOfBlood: string;
      wardAgainstSpirits: string;
      wardingCircleAgainstGhouls: string;
      dagonsCall: string;
      deflectionOfWoodenDoom: string;
      essenceOfAir: string;
      firewalker: string;
      wardAgainstLupines: string;
      wardingCircleAgainstSpirits: string;
      oneWithTheBlade: string;
      defenseOfTheSacredHaven: string;
      eyesOfTheNighthawk: string;
      incorporealPassage: string;
      wardAgainstCainites: string;
      wardingCircleAgainstLupines: string;
      escapeToTrueSanctuary: string;
      heartOfStone: string;
      shaftOfBelatedDissolution: string;
      wardingCircleAgainstCainites: string;
    };
    thinBloodAlchemy: {
      name: string;
      farReach: string;
      haze: string;
      envelop: string;
      profaneHierosGamos: string;
      defractionate: string;
      airborneMomentum: string;
      awakenTheSleeper: string;
    };
  };
  reRollHelperText: string;
  unauthorized: string;
  characterUpdate: string;
  storytellerChangeDifficulty: string;
  storytellerChangeModifier: string;
  storytellerChangeCurrentCharacter: string;
  bestialFailure: string;
  failure: string;
  success: string;
  regularCritical: string;
  messyCritical: string;
  dices: string;
  difficulty: string;
  successes: string;
  status: string;
  modifier: string;
  commands: {
    roll: {
      dices: CommandOption;
      hunger: CommandOption;
      difficulty: CommandOption;
      descriptionField: CommandOption;
    } & CommandOption;
    dicePools: {
      attribute: CommandOption;
      secondaryAttribute: CommandOption;
      skillPhysical: CommandOption;
      skillSocial: CommandOption;
      skillMental: CommandOption;
      discipline: CommandOption;
    } & CommandOption;
    sheet: {
      description: string;
      link: CommandOption;
      create: CommandOption;
      edit: CommandOption;
      delete: CommandOption;
      name: CommandOption;
      index: CommandOption;
      value: CommandOption;
      common: CommandOption;
      wards: CommandOption;
      circles: CommandOption; 
    };
    actions: {
      action: CommandOption;
    } & CommandOption;
    setDifficulty: {
      difficulty: CommandOption;
    } & CommandOption;
    setModifier: {
      modifier: CommandOption;
    } & CommandOption;
    setCharacter: {
      character: CommandOption;
    } & CommandOption;
  };
  actions: string[];
  shortening: {
    [key: string]: string;
  }
};
