type OptionsLocale = {
  name: string;
  options: string[];
};

export type LocaleType = {
  app: string;
  standard: string;
  character: string;
  specialties: {
    name: string;
    skill: string;
    specialty: string;
  };
  template: string;
  characterLinks: string;
  change: string;
  name: string;
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
  apply: {
    specialtyPhysical: string;
    specialtySocial: string;
    specialtyMental: string;
    advantage: string;
    flaw: string;
  };
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
      premonition: string;
      scryTheSoul: string;
      shareTheSenses: string;
      spiritsTouch: string;
      clairvoyance: string;
      possession: string;
      telepathy: string;
    };
    dominate: {
      name: string;
      cloudMemory: string;
      compel: string;
      mesmerize: string;
      dementation: string;
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
      earthMeld: string;
      shapechange: string;
      metamorphosis: string;
      mistForm: string;
      theUnfetteredHeart: string;
    };
    obfuscate: {
      name: string;
      cloakOfShadows: string;
      silenceOfDeath: string;
      unseenPassage: string;
      ghostInTheMachine: string;
      maskOfAThousandFaces: string;
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
      truthOfBlood: string;
      wardAgainstSpirits: string;
      wardingCircleAgainstGhouls: string;
      dagonsCall: string;
      deflectionOfWoodenDoom: string;
      essenceOfAir: string;
      firewalker: string;
      wardAgainstLupines: string;
      wardingCircleAgainstSpirits: string;
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
      profaneHierosGamos: string;
      envelop: string;
      defractionate: string;
      airborneMomentum: string;
      awakenTheSleeper: string;
    };
  };
  loading: string;
  welcome: string;
  reRollHelperText: string;
  roll: {
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
  };
  commands: {
    roll: {
      name: string;
      description: string;
      dices: {
        name: string;
        description: string;
      };
      hunger: {
        name: string;
        description: string;
      };
      difficulty: {
        name: string;
        description: string;
      };
      descriptionField: {
        name: string;
        description: string;
      };
    };
  };
};
