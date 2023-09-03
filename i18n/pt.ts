import { LocaleType } from "./localeType.ts";

export const pt: LocaleType = {
  app: "KC",
  standard: "Padrão",
  character: "Personagem",
  specialties: {
    name: "Especializações",
    skill: "Habilidade",
    specialty: "Especialização",
  },
  template: "Modelo",
  characterLinks: "Fichas",
  change: "Trocar",
  name: "Nome",
  player: "Jogador",
  resonance: {
    name: "Ressonância",
    options: [
      "Colérica",
      "Melancólica",
      "Fleumática",
      "Sanguínea",
      "Sangue Animal",
    ],
  },
  ambition: "Ambição",
  desire: "Desejo",
  predator: {
    name: "Predador",
    options: [
      "Consensualista",
      "Fazendeiro",
      "Osíris",
      "Sacoleiro",
      "Sandman",
      "Sanguessuga",
      "Scene Queen",
      "Sereia",
      "Trinchador",
      "Vira-lata",
    ],
  },
  clan: {
    name: "Clã",
    options: [
      "Banu Haqim",
      "Brujah",
      "Caitiff",
      "Gangrel",
      "Hecata",
      "Lasombra",
      "Malkaviano",
      "Nosferatu",
      "O Ministério",
      "Ravnos",
      "Salubri",
      "Sangue-Ralo",
      "Toreador",
      "Tremere",
      "Tzimisce",
      "Ventrue",
    ],
  },
  generation: {
    name: "Geração",
    suffix: "ª",
  },
  physical: "Físicos",
  social: "Sociais",
  mental: "Mentais",
  attributes: {
    name: "Atributos",
    physical: {
      strength: "Força",
      dexterity: "Destreza",
      stamina: "Vigor",
    },
    social: {
      charisma: "Carisma",
      manipulation: "Manipulação",
      composure: "Autocontrole",
    },
    mental: {
      intelligence: "Inteligência",
      wits: "Raciocínio",
      resolve: "Determinação",
    },
  },
  skills: {
    name: "Habilidades",
    physical: {
      athletics: "Atletismo",
      brawl: "Briga",
      craft: "Ofícios",
      drive: "Condução",
      firearms: "Armas de Fogo",
      melee: "Armas Brancas",
      larceny: "Ladroagem",
      stealth: "Furtividade",
      survival: "Sobrevivência",
    },
    social: {
      animalKen: "Empatia com Animais",
      etiquette: "Etiqueta",
      insight: "Sagacidade",
      intimidation: "Intimidação",
      leadership: "Liderança",
      performance: "Performance",
      persuasion: "Persuasão",
      streetwise: "Manha",
      subterfuge: "Subterfúgio",
    },
    mental: {
      academics: "Erudição",
      awareness: "Percepção",
      finance: "Finanças",
      investigation: "Investigação",
      medicine: "Medicina",
      occult: "Ocultismo",
      politics: "Política",
      science: "Ciência",
      technology: "Tecnologia",
    },
  },
  health: "Vitalidade",
  willpower: "Força de Vontade",
  damage: {
    superficial: "Superficial",
    aggravated: "Agravado",
  },
  humanity: "Humanidade",
  stains: "Máculas",
  bloodPotency: "Potência de Sangue",
  hunger: "Fome",
  experience: {
    name: "Experiência",
    total: "Total",
    spent: "Gasta",
  },
  apply: {
    specialtyPhysical: "Especialização - Físicos",
    specialtySocial: "Especialização - Sociais",
    specialtyMental: "Especialização - Mentais",
    advantage: "Vantagem",
    flaw: "Defeito",
  },
  advantages: "Vantagens",
  flaws: "Defeitos",
  disciplines: {
    name: "Disciplinas",
    animalism: {
      name: "Animalismo",
      bondFamulus: "● Vínculo de Servo",
      senseTheBeast: "● Sentir a Besta",
      feralWhispers: "●● Sussurros Selvagens",
      animalSucculence: "●●● Suculência Animal",
      quellTheBeast: "●●● Acalmar a Besta",
      unlivingHive: "●●● Colmeia Zumbi",
      subsumeTheSpirit: "●●●● Subordinar o Espírito",
      animalDominion: "●●●●● Domínação Animal",
      drawingOutTheBeast: "●●●●● Expulsar a Besta",
    },
    auspex: {
      name: "Auspício",
      heightenedSenses: "● Sentidos Aguçados",
      senseTheUnseen: "● Sentir o Invisível",
      premonition: "●● Premonição",
      scryTheSoul: "●●● Percepção da Aura",
      shareTheSenses: "●●● Compartilhar os Sentidos",
      spiritsTouch: "●●●● Toque do Espírito",
      clairvoyance: "●●●●● Clarividência",
      possession: "●●●●● Possessão",
      telepathy: "●●●●● Telepatia",
    },
    dominate: {
      name: "Dominação",
      cloudMemory: "● Memória na Nuvem",
      compel: "● Obrigar",
      mesmerize: "●● Hipnotizar",
      dementation: "●● Demência",
      theForgetfulMind: "●●● Ordenar Esquecimento",
      submergedDirective: "●●● Diretiva Submersa",
      rationalize: "●●●● Racionalizar",
      massManipulation: "●●●●● Manipulação em Massa",
      terminalDecree: "●●●●● Decreto Terminal",
    },
    bloodSorcery: {
      name: "Feitiçaria do Sangue",
      corrosiveVitae: "● Vitae Corrosivo",
      aTasteForBlood: "● Um Gosto por Sangue",
      extinguishVitae: "●● Extinguir Vitae",
      bloodOfPotency: "●●● Aprimorar o Sangue",
      scorpionsTouch: "●●● Toque do Escorpião",
      theftOfVitae: "●●●● Furto do Vitae",
      baalsCaress: "●●●●● Carícia de Faal",
      cauldronOfBlood: "●●●●● Caldeirão de Sangue",
    },
    fortitude: {
      name: "Fortitude",
      resilience: "● Resiliência",
      unswayableMind: "● Mente Indestrutível",
      toughness: "●● Dureza",
      enduringBeasts: "●● Bestas Duradouras",
      defyBane: "●●● Desafiar o Banimento",
      fortifyTheInnerFacade: "●●● Fortificar a Fachada Interna",
      draughtOfEndurance: "●●●● Rascunho da Resistência",
      fleshOfMarble: "●●●●● Pele de Mármore",
      prowessFromPain: "●●●●● Proeza da Dor",
    },
    protean: {
      name: "Proteanismo",
      eyesOfTheBeast: "● Olhos da Besta",
      weightOfTheFeather: "● Peso da Pena",
      feralWeapons: "●● Garras da Besta",
      earthMeld: "●●● Fusão com a Terra",
      shapechange: "●●● Mudança de Forma",
      metamorphosis: "●●●● Forma da Besta",
      mistForm: "●●●●● Forma de Névoa",
      theUnfetteredHeart: "●●●●● Coração sem Restrições",
    },
    obfuscate: {
      name: "Ofuscação",
      cloakOfShadows: "● Manto das Sombras",
      silenceOfDeath: "● Silêncio Mortal",
      unseenPassage: "●● Presença Invisível",
      ghostInTheMachine: "●●● Fantasma na Máquina",
      maskOfAThousandFaces: "●●● Máscara das Mil Faces",
      conceal: "●●●● Esconder",
      vanish: "●●●● Desaparecer",
      cloakTheGathering: "●●●●● Cobrindo o Grupo",
      impostorsGuise: "●●●●● Disfarce do Impostor",
    },
    potence: {
      name: "Potência",
      lethalBody: "● Corpo Letal",
      soaringLeap: "● Salto Alto",
      prowess: "●● Façanha",
      brutalFeed: "●●● Alimentação Brutal",
      sparkOfRage: "●●● Centelha da Raiva",
      uncannyGrip: "●●● Aderência Estranha",
      draughtOfMight: "●●●● Rascunho do Poder",
      earthshock: "●●●●● Terremoto",
      fistOfCaine: "●●●●● Punho de Cain",
    },
    presence: {
      name: "Presença",
      awe: "● Fascínio",
      daunt: "● Assustar",
      lingeringKiss: "●● Beijo Prolongado",
      dreadGaze: "●●● Olhar Aterrorizante",
      entrancement: "●●● Transe",
      irresistibleVoice: "●●●● Voz Irresistível",
      summon: "●●●● Convocação",
      majesty: "●●●●● Majestade",
      starMagnetism: "●●●●● Magnetismo da Fama",
    },
    celerity: {
      name: "Celeridade",
      catsGrace: "● Graça do Gato",
      rapidReflexes: "● Reflexos Rápidos",
      fleetness: "●● Pressa",
      blink: "●●● Piscar",
      traversal: "●●● Travessia",
      draughtOfElegance: "●●●● Rascunho da Elegância",
      unerringAim: "●●●● Mira Certeira",
      lightningStrike: "●●●●● Relâmpago",
      splitSecond: "●●●●● Fração de Segundo",
    },
    rituals: {
      name: "Rituais",
      bloodWalk: "● Caminhada do Sangue",
      clingingOfTheInsect: "● Apego do Inseto",
      craftBloodstone: "● Criar Pedra de Sangue",
      wakeWithEveningsFreshness: "● Acordar com o Frescor da Noite",
      wardAgainstGhouls: "● Proteção contra Carniçais",
      communicateWithKindredSire: "●● Comunicação com os Parentes",
      eyesOfBabel: "●● Olhos de Babel",
      illuminateTheTrailOfPrey: "●● Iluminar a Trilha das Presas",
      truthOfBlood: "●● Verdade do Sangue",
      wardAgainstSpirits: "●● Proteção Contra Espíritos",
      wardingCircleAgainstGhouls: "●● Círculo de Proteção Contra Carniçais",
      dagonsCall: "●●● O Chamado de Dagon",
      deflectionOfWoodenDoom: "●●● Deflexão Contra o Mau da Madeira",
      essenceOfAir: "●●● Essência do Ar",
      firewalker: "●●● Caminhar Sobre o Fogo",
      wardAgainstLupines: "●●● Proteção Contra Lupinos",
      wardingCircleAgainstSpirits: "●●● Círculo de Proteção contra Espíritos",
      defenseOfTheSacredHaven: "●●●● Defesa do Refúgio Sagrado",
      eyesOfTheNighthawk: "●●●● Olhos do Falcão da Noite",
      incorporealPassage: "●●●● Travessia Incorpórea",
      wardAgainstCainites: "●●●● Proteção contra os Cainitas",
      wardingCircleAgainstLupines: "●●●● Círculo de proteção contra Lupinos",
      escapeToTrueSanctuary: "●●●●● Fuga para o Verdadeiro Santuário",
      heartOfStone: "●●●●● Coração de Pedra",
      shaftOfBelatedDissolution: "●●●●● Eixo de Dissolução Tardia",
      wardingCircleAgainstCainites: "●●●●● Círculo de Proteção contra Cainitas",
    },
    thinBloodAlchemy: {
      name: "Alquimia de Sangue-Fraco",
      farReach: "● Longo Alcance",
      haze: "● Neblina",
      profaneHierosGamos: "● Profano Hieros-Gamos",
      envelop: "●● Envolver",
      defractionate: "●●● Defracionar",
      airborneMomentum: "●●●● Impulso no Ar",
      awakenTheSleeper: "●●●●● Acordar o Dorminhoco",
    },
  },
  loading: "Carregando...",
  welcome: "Wodbot 5.0 entrou!",
  reRollHelperText: "Re-rolando %v dado(s) da última jogada...",
  unauthorized: "Função não autorizada!",
  storytellerChangeDifficulty: "O narrador mudou a dificuldade.",
  storytellerChangeModifier: "O narrador mudou o modificador.",
  roll: {
    bestialFailure: "Falha Bestial",
    failure: "Falha",
    success: "Sucesso",
    regularCritical: "Crítico",
    messyCritical: "Crítico Bestial",
    dices: "Dados",
    difficulty: "Dificuldade",
    successes: "Sucessos",
    status: "Status",
    modifier: "Modificador",
  },
  commands: {
    roll: {
      name: "jogar",
      description: "Jogue dados de dez faces",
      dices: {
        name: "dados",
        description: "Quantidade de dados",
      },
      hunger: {
        name: "fome",
        description: "Quantidade de fome do vampiro",
      },
      difficulty: {
        name: "dificuldade",
        description: "Dificuldade da jogada",
      },
      descriptionField: {
        name: "descrição",
        description: "Descrição da jogada",
      },
    },
    setDifficulty: {
      name: "dificuldade",
      description: "Dificuldade determinada pelo narrador",
      difficulty: {
        name: "valor",
        description: "Valor da nova dificuldade",
      },
    },
    setModifier: {
      name: "modificador",
      description: "Modificador determinado pelo narrador",
      modifier: {
        name: "valor",
        description: "Valor do novo modificador",
      },
    },
  },
};
