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
  select: string;
  open: string;
  character: string;
  kind: string[];
  mode: string[];
  specialties: {
    name: string;
    skill: string;
    specialty: string;
  };
  characterLinkSent: string;
  details: string;
  name: string;
  image: string;
  player: string;
  auspice: OptionsLocale;
  tribe: OptionsLocale;
  renown: {
    glory: string;
    honor: string;
    wisdom: string;
  };
  harano: string;
  hauglosk: string;
  resonance: OptionsLocale;
  ambition: string;
  desire: string;
  predator: OptionsLocale;
  clan: {
    name: string;
    options: { [name: string]: string[] | null };
  };
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
  healthStart: string;
  willpower: string;
  damage: {
    superficial: string;
    aggravated: string;
    add: string;
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
      obeah: string;
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
      slavishDevotion: string;
      theForgetfulMind: string;
      submergedDirective: string;
      ancestralDominion: string;
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
      shatter: string;
      fleshOfMarble: string;
      prowessFromPain: string;
    };
    protean: {
      name: string;
      eyesOfTheBeast: string;
      weightOfTheFeather: string;
      feralWeapons: string;
      vicissitude: string;
      serpentsKiss: string;
      earthMeld: string;
      shapechange: string;
      fleshCrafting: string;
      metamorphosis: string;
      horridForm: string;
      mistForm: string;
      theUnfetteredHeart: string;
      oneWithTheLand: string;
      theHeartOfDarkness: string;
    };
    obfuscate: {
      name: string;
      cloakOfShadows: string;
      silenceOfDeath: string;
      unseenPassage: string;
      chimerstry: string;
      mentalMaze: string;
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
    oblivion: {
      name: string;
      ashesToAshes: string;
      oblivionsSight: string;
      shadowCloak: string;
      theBindingFeather: string;
      fatalPrecognition: string;
      shadowCast: string;
      armsOfAhriman: string;
      whereTheShroudThins: string;
      auraOfDecay: string;
      passionFeast: string;
      shadowPerspective: string;
      touchOfOblivion: string;
      necroticPlague: string;
      stygianShroud: string;
      shadowStep: string;
      skuldFulfilled: string;
      tenebrousAvatar: string;
      witheringSpirit: string;
    };
    presence: {
      name: string;
      awe: string;
      daunt: string;
      eyesOfTheSerpent: string;
      lingeringKiss: string;
      dreadGaze: string;
      entrancement: string;
      trueLovesFace: string;
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
  giftsAndRites: {
    name: string;
    native: {
      name: string;
      one: {
        catfeet: string;
        eyesOfTheOwl: string;
        haresLeap: string;
        penumbralSenses: string;
        ragingStrike: string;
        staredown: string;
      };
      four: {
        sharpenedSenses: string;
        spiritOfTheFray: string;
        thwartingTheArrow: string;
      };
      seven: {
        bodyShift: string;
        jamTechnology: string;
        tongueOfTheBeasts: string;
      };
    };
    ragabash: {
      name: string;
      two: {
        blissfulIgnorance: string;
        crowsLaughter: string;
        gremlins: string;
        spidersSong: string;
      };
      five: {
        blurOfTheMilkyEye: string;
        openSeal: string;
        pulseOfThePrey: string;
        scentOfRunningWater: string;
      };
      eight: {
        lunasBlessing: string;
        thievingTalonsOfTheMagpie: string;
        theThousandForms: string;
        whelpBody: string;
      };
    };
    theurge: {
      name: string;
      two: {
        ensnareSpirit: string;
        mothersTouch: string;
        shadowSense: string;
        sightFromBeyond: string;
      };
      five: {
        banishSpirit: string;
        graspFromBeyond: string;
        mindspeak: string;
        umbralTether: string;
      };
      eight: {
        commandSpirit: string;
        drainSpirit: string;
        feralRegression: string;
        livingWard: string;
      };
    };
    philodox: {
      name: string;
      two: {
        ancestralConviction: string;
        gaiasCandor: string;
        porcupinesReprisal: string;
        senseTheTrueForm: string;
      };
      five: {
        beastsFealty: string;
        commandTheGathering: string;
        fangsOfJudgement: string;
        scentOfThePast: string;
      };
      eight: {
        geas: string;
        oathbreakersBane: string;
        strengthOfPurpose: string;
        takeTheTrueForm: string;
      };
    };
    galliard: {
      name: string;
      two: {
        animalMagnetism: string;
        howlOfAssembly: string;
        songOfRage: string;
        songOfSerenity: string;
      };
      five: {
        callTheRidden: string;
        eyesOfTheCobra: string;
        songOfValor: string;
        songOfInspiration: string;
      };
      eight: {
        againstTheOdds: string;
        breakTheShackles: string;
        defyDeath: string;
        dreamwalk: string;
      };
    };
    ahroun: {
      name: string;
      two: {
        haltTheCowardsFlight: string;
        rapidShift: string;
        razorClaws: string;
        senseDanger: string;
      };
      five: {
        primalAnger: string;
        snarlOfChallenge: string;
        trueFear: string;
        windClaws: string;
      };
      eight: {
        closingTheGap: string;
        kissOfHelios: string;
        lunasArmor: string;
        silverClaws: string;
      };
    };
    blackFuries: {
      name: string;
      three: {
        curseOfAeolus: string;
        haltTheCowardsFlight: string;
        porcupinesReprisal: string;
      };
      six: { coupDeGrace: string; kalisScar: string; waspTalons: string };
      nine: {
        breakTheShackles: string;
        drainSpirit: string;
        gorgonsVisage: string;
        whelpBody: string;
      };
    };
    boneGnawers: {
      name: string;
      three: {
        blissfulIgnorance: string;
        rapidShift: string;
        sightFromBeyond: string;
        odiousAroma: string;
      };
      six: {
        faceInTheCrowd: string;
        scentOfThePast: string;
        streetsTellStories: string;
      };
      nine: {
        aThousandEyes: string;
        betweenTheCracks: string;
        defyDeath: string;
      };
    };
    childrenOfGaia: {
      name: string;
      three: {
        brothersScent: string;
        mothersTouch: string;
        senseTheTrueForm: string;
        songOfSerenity: string;
      };
      six: {
        calmTheFuriousBeast: string;
        openSeal: string;
        revealTrauma: string;
      };
      nine: { lunasArmor: string; lifesPresence: string; shareThePain: string };
    };
    galestalkers: {
      name: string;
      three: {
        camouflage: string;
        ensnareSpirit: string;
        laceratingWind: string;
      };
      six: {
        chillCloak: string;
        callTheRidden: string;
        pulseOfThePrey: string;
        windClaws: string;
      };
      nine: {
        bloodOfTheWastes: string;
        clawsOfFrozenDeath: string;
        oathbreakersBane: string;
      };
    };
    ghostCouncil: {
      name: string;
      three: { augur: string; senseDanger: string; blackout: string };
      six: { serpentsCoil: string; handsOfTheEarth: string; mindspeak: string };
      nine: {
        dreamwalk: string;
        shroudedAspect: string;
        takeTheTrueForm: string;
        thievingTalonsOfTheMagpie: string;
      };
    };
    glassWalkers: {
      name: string;
      three: {
        animalMagnetism: string;
        gaiasCandor: string;
        skinbind: string;
        spidersSong: string;
      };
      six: {
        graspFromBeyond: string;
        energize: string;
        snarlOfChallenge: string;
      };
      nine: {
        controlMachine: string;
        doppelganger: string;
        recoverMemory: string;
      };
    };
    hartWardens: {
      name: string;
      three: {
        crowsLaughter: string;
        sacredBoundary: string;
        blessedBrew: string;
      };
      six: {
        beastsFealty: string;
        songOfInspiration: string;
        territorialDominance: string;
      };
      nine: {
        balorsGaze: string;
        theLivingWood: string;
        kissOfHelios: string;
        livingWard: string;
      };
    };
    redTalons: {
      name: string;
      three: {
        hiddenKiller: string;
        razorClaws: string;
        renderDown: string;
        songOfRage: string;
      };
      six: {
        fangsOfJudgement: string;
        gaiasEmbrace: string;
        quicksand: string;
      };
      nine: {
        feralRegression: string;
        shieldOfTheWyld: string;
        theThousandForms: string;
      };
    };
    shadowLords: {
      name: string;
      three: {
        fatalFlaw: string;
        icyChillOfDespair: string;
        shadowSense: string;
      };
      six: {
        blurOfTheMilkyEye: string;
        direDistraction: string;
        eyesOfTheCobra: string;
        trueFear: string;
      };
      nine: {
        geas: string;
        thunderclap: string;
        underTheGun: string;
      };
    };
    silentStriders: {
      name: string;
      three: {
        fetchBounty: string;
        speechOfTheWorld: string;
        whisperedPassage: string;
      };
      six: {
        burrow: string;
        scentOfRunningWater: string;
        umbralTether: string;
      };
      nine: {
        againstTheOdds: string;
        closingTheGap: string;
        theGoldenPath: string;
        strengthOfPurpose: string;
      };
    };
    silverFangs: {
      name: string;
      three: {
        howlOfAssembly: string;
        packInstinct: string;
        theSilverCompact: string;
      };
      six: {
        bloodOfThePack: string;
        commandTheGathering: string;
        unityOfThePack: string;
      };
      nine: {
        commandSpirit: string;
        lunasAvenger: string;
        lunasBlessing: string;
        silverClaws: string;
      };
    };
    rites: {
      common: {
        riteOfAbjuration: string;
        riteOfRage: string;
        riteOfTranquility: string;
        riteOfContrition: string;
        riteOfForgetfulRecord: string;
        riteOfTheLivingCaern: string;
        riteOfShadowPassage: string;
        riteOfDedication: string;
        riteOfKinseeking: string;
        riteOfSpiritSummoning: string;
        riteOfBinding: string;
        riteOfShame: string;
        riteOfPatronage: string;
        riteOfCelebration: string;
        riteOfCaernBuilding: string;
        riteOfTheWolfReborn: string;
        riteOfTheWhisperingField: string;
        riteOfTheShroudedGlen: string;
      };
      social: {
        riteOfPassage: string;
        satireRite: string;
        riteOfAccomplishment: string;
        gatheringForTheDeparted: string;
        riteOfTheWinterWolf: string;
      };
    };
  };
  reRollHelperText: string;
  unauthorized: string;
  notFound: string;
  rollChannel: string;
  characterUpdate: string;
  characterCheck: string;
  characterCheckFailed: string;
  characterExport: string;
  storyteller: string;
  storytellerUpdate: string;
  storytellerChangeDifficulty: string;
  storytellerChangeModifier: string;
  storytellerChangeRollChannel: string;
  storytellerDeleteCharacter: string;
  storytellerClearCurrentCharacter: string;
  storytellerClearRollChannel: string;
  storytellerChangeCharacterMode: string;
  storytellerChangeAllCharacterMode: string;
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
  rollExecuted: string;
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
      difficulty: CommandOption;
      modifier: CommandOption;
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
      level: CommandOption;
      wards: CommandOption;
      circles: CommandOption;
    };
    import: {
      json: CommandOption;
    } & CommandOption;
    export: CommandOption;
    panel: {
      health: CommandOption;
      willpower: CommandOption;
      hunger: CommandOption;
      macro: {
        title: CommandOption;
        descriptionField: CommandOption;
        character: CommandOption;
        image: CommandOption;
        thumbnail: CommandOption;
      } & CommandOption;
    } & CommandOption;
    macro: {
      name: string;
      buttons: string;
      code: string;
      saved: string;
      loading: string;
      error: string;
    };
    actions: {
      action: CommandOption;
    } & CommandOption;
    check: {
      dices: CommandOption;
    } & CommandOption;
    setStoryteller: {
      user: CommandOption;
    } & CommandOption;
    setDifficulty: {
      difficulty: CommandOption;
    } & CommandOption;
    setModifier: {
      modifier: CommandOption;
    } & CommandOption;
    rollChannel: {
      channel: CommandOption;
    } & CommandOption;
    editModal: {
      title: string;
    } & CommandOption;
    character: {
      characterArg: CommandOption;
      choose: {
        buttons: CommandOption;
      } & CommandOption;
      mode: CommandOption;
      remove: CommandOption;
      clear: CommandOption;
    } & CommandOption;
  };
  actions: string[];
};
