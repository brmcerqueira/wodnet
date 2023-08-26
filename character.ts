export type Damage = {
  superficial: number;
  aggravated: number;
  penalty: number;
};

export type Character = {
  sync: Date | undefined;
  entityId: number;
  name: string;
  clan: string;
  player: string;
  generation: number;
  attributes: {
    physical: {
      strength: number;
      dexterity: number;
      stamina: number;
    };
    social: {
      charisma: number;
      manipulation: number;
      composure: number;
    };
    mental: {
      intelligence: number;
      wits: number;
      resolve: number;
    };
  };
  skills: {
    physical: {
      athletics: number;
      brawl: number;
      craft: number;
      drive: number;
      firearms: number;
      melee: number;
      larceny: number;
      stealth: number;
      survival: number;
    };
    social: {
      animalKen: number;
      etiquette: number;
      insight: number;
      intimidation: number;
      leadership: number;
      performance: number;
      persuasion: number;
      streetwise: number;
      subterfuge: number;
    };
    mental: {
      academics: number;
      awareness: number;
      finance: number;
      investigation: number;
      medicine: number;
      occult: number;
      politics: number;
      science: number;
      technology: number;
    };
  };
  health: Damage;
  willpower: Damage;
  humanity: {
    total: number;
    stains: number;
  };
  bloodPotency: number;
  hunger: number;
  experience: {
    total: number;
    spent: number;
  };
  disciplines: {
    animalism: {
      bondFamulus: boolean;
      senseTheBeast: boolean;
      feralWhispers: boolean;
      animalSucculence: boolean;
      quellTheBeast: boolean;
      unlivingHive: boolean;
      subsumeTheSpirit: boolean;
      animalDominion: boolean;
      drawingOutTheBeast: boolean;
    };
    auspex: {
      heightenedSenses: boolean;
      senseTheUnseen: boolean;
      premonition: boolean;
      scryTheSoul: boolean;
      shareTheSenses: boolean;
      spiritsTouch: boolean;
      clairvoyance: boolean;
      possession: boolean;
      telepathy: boolean;
    };
    dominate: {
      cloudMemory: boolean;
      compel: boolean;
      mesmerize: boolean;
      dementation: boolean;
      theForgetfulMind: boolean;
      submergedDirective: boolean;
      rationalize: boolean;
      massManipulation: boolean;
      terminalDecree: boolean;
    };
    bloodSorcery: {
      corrosiveVitae: boolean;
      aTasteForBlood: boolean;
      extinguishVitae: boolean;
      bloodOfPotency: boolean;
      scorpionsTouch: boolean;
      theftOfVitae: boolean;
      baalsCaress: boolean;
      cauldronOfBlood: boolean;
    };
    fortitude: {
      resilience: boolean;
      unswayableMind: boolean;
      toughness: boolean;
      enduringBeasts: boolean;
      defyBane: boolean;
      fortifyTheInnerFacade: boolean;
      draughtOfEndurance: boolean;
      fleshOfMarble: boolean;
      prowessFromPain: boolean;
    };
    protean: {
      eyesOfTheBeast: boolean;
      weightOfTheFeather: boolean;
      feralWeapons: boolean;
      earthMeld: boolean;
      shapechange: boolean;
      metamorphosis: boolean;
      mistForm: boolean;
      theUnfetteredHeart: boolean;
    };
    obfuscate: {
      cloakOfShadows: boolean;
      silenceOfDeath: boolean;
      unseenPassage: boolean;
      ghostInTheMachine: boolean;
      maskOfAThousandFaces: boolean;
      conceal: boolean;
      vanish: boolean;
      cloakTheGathering: boolean;
      impostorsGuise: boolean;
    };
    potence: {
      lethalBody: boolean;
      soaringLeap: boolean;
      prowess: boolean;
      brutalFeed: boolean;
      sparkOfRage: boolean;
      uncannyGrip: boolean;
      draughtOfMight: boolean;
      earthshock: boolean;
      fistOfCaine: boolean;
    };
    presence: {
      awe: boolean;
      daunt: boolean;
      lingeringKiss: boolean;
      dreadGaze: boolean;
      entrancement: boolean;
      irresistibleVoice: boolean;
      summon: boolean;
      majesty: boolean;
      starMagnetism: boolean;
    };
    celerity: {
      catsGrace: boolean;
      rapidReflexes: boolean;
      fleetness: boolean;
      blink: boolean;
      traversal: boolean;
      draughtOfElegance: boolean;
      unerringAim: boolean;
      lightningStrike: boolean;
      splitSecond: boolean;
    };
    rituals: {
      bloodWalk: boolean;
      clingingOfTheInsect: boolean;
      craftBloodstone: boolean;
      wakeWithEveningsFreshness: boolean;
      wardAgainstGhouls: boolean;
      communicateWithKindredSire: boolean;
      eyesOfBabel: boolean;
      illuminateTheTrailOfPrey: boolean;
      truthOfBlood: boolean;
      wardAgainstSpirits: boolean;
      wardingCircleAgainstGhouls: boolean;
      dagonsCall: boolean;
      deflectionOfWoodenDoom: boolean;
      essenceOfAir: boolean;
      firewalker: boolean;
      wardAgainstLupines: boolean;
      wardingCircleAgainstSpirits: boolean;
      defenseOfTheSacredHaven: boolean;
      eyesOfTheNighthawk: boolean;
      incorporealPassage: boolean;
      wardAgainstCainites: boolean;
      wardingCircleAgainstLupines: boolean;
      escapeToTrueSanctuary: boolean;
      heartOfStone: boolean;
      shaftOfBelatedDissolution: boolean;
      wardingCircleAgainstCainites: boolean;
    };
    thinBloodAlchemy: {
      farReach: boolean;
      haze: boolean;
      profaneHierosGamos: boolean;
      envelop: boolean;
      defractionate: boolean;
      airborneMomentum: boolean;
      awakenTheSleeper: boolean;
    };
  };
};
