import { LocaleType } from "./localeType.ts";

export const pt: LocaleType = {
  app: "Wodnet",
  none: "(Nenhum)",
  select: "Selecionar",
  open: "Abrir",
  character: "Personagem",
  storyteller: "Narrador",
  storytellerUpdate: "O narrador foi alterado...",
  mode: [
    "Aberto",
    "Rastreado",
    "Fechado",
  ],
  characterUpdate: "O personagem foi atualizado...",
  characterCheck: "O personagem está tranquilo por enquanto...",
  characterCheckFailed: "O personagem está com mais fome!",
  characterExport: "O personagem foi exportado!",
  specialties: {
    name: "Especializações",
    skill: "Habilidade",
    specialty: "Especialização",
  },
  characterLinkSent:
    "O link da ficha do seu personagem foi enviado no seu chat privado!",
  details: "Detalhes",
  name: "Nome",
  image: "Imagem",
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
    options: {
      "Banu Haqim": ["Celeridade", "Ofuscação", "Feitiçaria do Sangue"],
      "Brujah": ["Potência", "Celeridade", "Presença"],
      "Caitiff": null,
      "Gangrel": ["Animalismo", "Fortitude", "Proteanismo"],
      "Hecata": ["Auspícios", "Fortitude", "Oblívio"],
      "Lasombra": ["Dominação", "Potência", "Oblívio"],
      "Malkaviano": ["Auspícios", "Dominação", "Ofuscação"],
      "Nosferatu": ["Animalismo", "Potência", "Ofuscação"],
      "O Ministério": ["Presença", "Ofuscação", "Proteanismo"],
      "Ravnos": ["Animalismo", "Presença", "Ofuscação"],
      "Salubri": ["Auspícios", "Fortitude", "Dominação"],
      "Sangue-Ralo": null,
      "Toreador": ["Auspícios", "Celeridade", "Presença"],
      "Tremere": ["Auspícios", "Feitiçaria do Sangue"],
      "Tzimisce": ["Animalismo", "Dominação", "Proteanismo"],
      "Ventrue": ["Dominação", "Fortitude", "Presença"],
    },
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
    add: "somar",
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
  apply: "Aplicar",
  advantages: "Vantagens",
  flaws: "Defeitos",
  disciplines: {
    name: "Disciplinas",
    animalism: {
      name: "Animalismo",
      bondFamulus: "● Famulus Enlaçado",
      senseTheBeast: "● Sentir a Besta",
      feralWhispers: "●● Sussurros Selvagens",
      animalSucculence: "●●● Suculência Animal",
      quellTheBeast: "●●● Subjugar a Besta",
      unlivingHive: "●●● Enxame Não Vivo",
      subsumeTheSpirit: "●●●● Comunhão de Espíritos",
      animalDominion: "●●●●● Controle Animal",
      drawingOutTheBeast: "●●●●● Expulsar a Besta",
    },
    auspex: {
      name: "Auspícios",
      heightenedSenses: "● Sentidos Aguçados",
      senseTheUnseen: "● Sentir o Invisível",
      obeah: "●● Obeah",
      premonition: "●● Premonição",
      scryTheSoul: "●●● Perscrutar a Alma",
      shareTheSenses: "●●● Compartilhar os Sentidos",
      spiritsTouch: "●●●● Toque do Espírito",
      clairvoyance: "●●●●● Clarividência",
      possession: "●●●●● Possessão",
      telepathy: "●●●●● Telepatia",
      unburdeningTheBestialSoul: "●●●●● Aliviando a Alma Bestial",
    },
    dominate: {
      name: "Dominação",
      cloudMemory: "● Nublar Memória",
      compel: "● Compelir",
      mesmerize: "●● Mesmerismo",
      dementation: "●● Dementação",
      domitorsFavor: "●● Favor do Domitor",
      slavishDevotion: "●● Devoção Servil",
      theForgetfulMind: "●●● A Mente Esquecida",
      submergedDirective: "●●● Diretriz Submersa",
      ancestralDominion: "●●● Domínio Ancestral",
      rationalize: "●●●● Racionalizar",
      massManipulation: "●●●●● Manipulação em Massa",
      terminalDecree: "●●●●● Decreto Terminal",
    },
    bloodSorcery: {
      name: "Feitiçaria do Sangue",
      corrosiveVitae: "● Vitae Corrosivo",
      aTasteForBlood: "● Um Gosto por Sangue",
      extinguishVitae: "●● Extinguir Vitae",
      bloodOfPotency: "●●● Sangue Potente",
      scorpionsTouch: "●●● Picada de Escorpião",
      theftOfVitae: "●●●● Roubo de Vitae",
      baalsCaress: "●●●●● Carícia de Baal",
      cauldronOfBlood: "●●●●● Caldeirão de Sangue",
    },
    fortitude: {
      name: "Fortitude",
      resilience: "● Resiliência",
      unswayableMind: "● Mente Inescrutável",
      toughness: "●● Tenacidade",
      enduringBeasts: "●● Feras Tenazes",
      valeren: "●● Valeren",
      defyBane: "●●● Desafio à Perdição",
      fortifyTheInnerFacade: "●●● Fortificar a Fachada Interior",
      draughtOfEndurance: "●●●● Resistência Direto da Fonte",
      shatter: "●●●● Estilhaçar",
      fleshOfMarble: "●●●●● Pele de Mármore",
      prowessFromPain: "●●●●● Poder Vindo da Dor",
    },
    protean: {
      name: "Proteanismo",
      eyesOfTheBeast: "● Olhos da Besta",
      weightOfTheFeather: "● Peso Pena",
      feralWeapons: "●● Armas Ferais",
      vicissitude: "●● Vicissitude",
      earthMeld: "●●● Fusão com a Terra",
      shapechange: "●●● Mudança de Forma",
      fleshCrafting: "●●● Modelagem de Carne",
      metamorphosis: "●●●● Metamorfose",
      horridForm: "●●●● Forma Hedionda",
      mistForm: "●●●●● Forma de Névoa",
      theUnfetteredHeart: "●●●●● Coração Vagante",
      oneWithTheLand: "●●●●● Um com a Terra",
      theHeartOfDarkness: "●●●●● Coração das Trevas",
    },
    obfuscate: {
      name: "Ofuscação",
      cloakOfShadows: "● Manto de Sombras",
      silenceOfDeath: "● Silêncio da Morte",
      unseenPassage: "●● Passagem Invisível",
      chimerstry: "●● Quimerismo",
      mentalMaze: "●● Labirinto Mental",
      ghostInTheMachine: "●●● Fantasma na Máquina",
      maskOfAThousandFaces: "●●● Máscara de Mil Faces",
      fataMorgana: "●●● Fata Morgana",
      conceal: "●●●● Ocultar",
      vanish: "●●●● Desaparecer",
      cloakTheGathering: "●●●●● Ocultar o Grupo",
      impostorsGuise: "●●●●● Disfarce do Impostor",
    },
    potence: {
      name: "Potência",
      lethalBody: "● Corpo Letal",
      soaringLeap: "● Salto Vertiginoso",
      prowess: "●● Poderio",
      brutalFeed: "●●● Alimentação Brutal",
      sparkOfRage: "●●● Centelha de Fúria",
      uncannyGrip: "●●● Pegada Sobrenatural",
      draughtOfMight: "●●●● Força Direto da Fonte",
      earthshock: "●●●●● Terremoto",
      fistOfCaine: "●●●●● Punho de Caim",
    },
    oblivion: {
      name: "Oblívio",
      ashesToAshes: "● Do Pó ao Pó",
      oblivionsSight: "● Visão do Oblívio",
      shadowCloak: "● Manto Obscuro",
      theBindingFeather: "● Grilhões que Vinculam",
      fatalPrecognition: "●● Precognição Fatal",
      shadowCast: "●● Projetar Sombra",
      armsOfAhriman: "●● Braços de Arimã",
      whereTheShroudThins: "●● Onde a Mortalha Afina",
      auraOfDecay: "●●● Aura de Decadência",
      passionFeast: "●●● Banquete de Paixões",
      shadowPerspective: "●●● Perspectiva Sombria",
      touchOfOblivion: "●●● Toque do Oblívio",
      necroticPlague: "●●●● Praga Necrótica",
      stygianShroud: "●●●● A Mortalha Estígia",
      shadowStep: "●●●●● Passo Sombrio",
      skuldFulfilled: "●●●●● Crânio Realizado",
      tenebrousAvatar: "●●●●● Avatar Tenebroso",
      witheringSpirit: "●●●●● Espírito em Declínio",
    },
    presence: {
      name: "Presença",
      awe: "● Fascínio",
      daunt: "● Amedontrar",
      eyesOfTheSerpent: "● Olhos da Serpente",
      lingeringKiss: "●● Beijo Indelével",
      dreadGaze: "●●● Olhar Aterrorizante",
      entrancement: "●●● Transe",
      trueLovesFace: "●●● Face do Amor Verdadeiro",
      irresistibleVoice: "●●●● Voz Irresistível",
      summon: "●●●● Convocar",
      majesty: "●●●●● Majestade",
      starMagnetism: "●●●●● Magnetismo de Estrela",
    },
    celerity: {
      name: "Celeridade",
      catsGrace: "● Graça Felina",
      rapidReflexes: "● Reflexos Rápidos",
      fleetness: "●● Rapidez",
      blink: "●●● Piscadela",
      traversal: "●●● Travessia",
      draughtOfElegance: "●●●● Elegância Direto da Fonte",
      unerringAim: "●●●● Mira Infalível",
      lightningStrike: "●●●●● Golpe Relâmpago",
      splitSecond: "●●●●● Fração de Segundo",
    },
    rituals: {
      name: "Rituais",
      bloodWalk: "● Caminho do Sangue",
      clingingOfTheInsect: "● Aderência do Inseto",
      craftBloodstone: "● Criar Pedra de Sangue",
      wakeWithEveningsFreshness: "● Despertar com o Frescor do Anoitecer",
      communicateWithKindredSire: "●● Comunicação com o Senhor do Membro",
      eyesOfBabel: "●● Olhos de Babel",
      illuminateTheTrailOfPrey: "●● Iluminar o Rastro da Presa",
      ishtarsTouch: "●● Toque de Ishtar",
      truthOfBlood: "●● Verdade do Sangue",
      dagonsCall: "●●● O Chamado de Dagon",
      deflectionOfWoodenDoom: "●●● Deflecção da Ruína de Madeira",
      essenceOfAir: "●●● Essência do Ar",
      firewalker: "●●● Andarilho do Fogo",
      oneWithTheBlade: "●●● Um com a Lâmina",
      defenseOfTheSacredHaven: "●●●● Defesa do Refúgio Sagrado",
      eyesOfTheNighthawk: "●●●● Olhos do Falcão Noturno",
      incorporealPassage: "●●●● Passagem Incorpórea",
      escapeToTrueSanctuary: "●●●●● Fuga Para o Verdadeiro Santuário",
      heartOfStone: "●●●●● Coração de Pedra",
      shaftOfBelatedDissolution: "●●●●● Fuste de Extinção Tardia",
      wards: {
        name: "proteção",
        description: "Proteção",
        wardAgainstGhouls: "● Proteção Contra Carniçais",
        wardAgainstSpirits: "●● Proteção Contra Espíritos",
        wardAgainstLupines: "●●● Proteção Contra Lupinos",
        wardAgainstCainites: "●●●● Proteção Contra Cainitas",
      },
      circles: {
        name: "círculos",
        description: "Círculos",
        wardingCircleAgainstGhouls: "●● Círculo de Proteção Contra Carniçais",
        wardingCircleAgainstSpirits: "●●● Círculo de Proteção Contra Espíritos",
        wardingCircleAgainstLupines: "●●●● Círculo de Proteção Contra Lupinos",
        wardingCircleAgainstCainites:
          "●●●●● Círculo de Proteção Contra Cainitas",
      },
    },
    thinBloodAlchemy: {
      name: "Alquimia de Sangue-Ralo",
      farReach: "● Longo Alcance",
      haze: "● Neblina",
      envelop: "●● Envolver",
      profaneHierosGamos: "●●● Hieros Gamos Profano",
      defractionate: "●●● Defracionar",
      airborneMomentum: "●●●● Ímpeto Aéreo",
      awakenTheSleeper: "●●●●● Despertar Adormecido",
    },
  },
  reRollHelperText: "Re-rolando %v dado(s) da última jogada...",
  unauthorized: "Função não autorizada!",
  notFound: "Personagem não encontrado!",
  storytellerChangeDifficulty: "O narrador mudou a dificuldade.",
  storytellerChangeModifier: "O narrador mudou o modificador.",
  storytellerDeleteCharacter: "O personagem foi excluído!",
  storytellerClearCurrentCharacter: "O narrador limpou a seleção.",
  storytellerChangeCharacterMode: "O modo do personagem foi alterado!",
  storytellerChangeAllCharacterMode:
    "O modo de todos os personagens foi alterado!",
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
    dicePools: {
      name: "parada-de-dados",
      description: "O jogador joga uma parada de dados de acordo com sua ficha",
      attribute: {
        name: "atributo",
        description: "Nome do atributo",
      },
      secondaryAttribute: {
        name: "atributo-2",
        description: "Nome do segundo atributo",
      },
      skillPhysical: {
        name: "habilidade-física",
        description: "Nome da habilidade física",
      },
      skillSocial: {
        name: "habilidade-social",
        description: "Nome da habilidade social",
      },
      skillMental: {
        name: "habilidade-mental",
        description: "Nome da habilidade mental",
      },
      discipline: {
        name: "disciplina",
        description: "Nome da disciplina",
      },
    },
    import: {
      name: "importar",
      description: "O narrador importa o personagem no formato JSON",
      json: {
        name: "json",
        description: "JSON do personagem",
      },
    },
    export: {
      name: "exportar",
      description: "O narrador exporta o personagem no formato JSON",
    },
    actions: {
      name: "ação",
      description: "O jogador executa uma ação de acordo com sua ficha",
      action: {
        name: "nome",
        description: "Nome da ação",
      },
    },
    check: {
      name: "checagem",
      description: "O jogador executa uma ou mais checagens",
      dices: {
        name: "dados",
        description: "Quantidade de dados",
      },
    },
    setStoryteller: {
      name: "narrador",
      description: "Define quem será o narrador",
      user: {
        name: "usuário",
        description: "Usuário a ser escolhido",
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
    sheet: {
      description: "Atualizar valor do campo:",
      link: {
        name: "link",
        description: "Link",
      },
      create: {
        name: "criar",
        description: "Criar",
      },
      edit: {
        name: "editar",
        description: "Editar",
      },
      delete: {
        name: "excluir",
        description: "Excluir",
      },
      name: {
        name: "nome",
        description: "Nome",
      },
      index: {
        name: "índice",
        description: "Índice",
      },
      value: {
        name: "valor",
        description: "Valor",
      },
      common: {
        name: "comuns",
        description: "Comuns",
      },
    },
    editModal: {
      name: "editar",
      description: "Modal para edição dos campos textos do personagem",
      title: "Modal para edição",
    },
    character: {
      name: "personagem",
      description: "Para o narrador gerenciar personagens",
      characterArg: {
        name: "nome",
        description: "Nome do personagem",
      },
      choose: {
        name: "escolher",
        description:
          "O narrador escolhe o personagem corrente para ser usado na parada de dados",
        link: {
          name: "link",
          description: "Gerar link do personagem",
        },
      },
      mode: {
        name: "modo",
        description:
          "O narrador escolhe o modo para um personagem ou para todos os personagens",
        value: {
          name: "valor",
          description: "Valor",
        },
      },
      remove: {
        name: "excluir",
        description: "O narrador escolhe o personagem para excluir",
      },
      clear: {
        name: "limpar",
        description: "O narrador limpa a escolha de personagem",
      },
    },
  },
  shortening: {
    "Círculo de Proteção Contra": "Círculo P",
    "Proteção Contra": "Proteção",
    "Despertar com o Frescor do Anoitecer": "Despertar Anoitecer",
    "Comunicação com o Senhor do Membro": "Comunicação Senhor",
    "Iluminar o Rastro da Presa": "Iluminar Rastro Presa",
    "Deflecção da Ruína de Madeira": "Deflecção Madeira",
    "Fuga Para o Verdadeiro Santuário": "Fuga Santuário",
    "Fuste de Extinção Tardia": "Fuste Tardia",
    "Defesa do Refúgio Sagrado": "Defesa Refúgio",
    "Olhos do Falcão Noturno": "Olhos Falcão",
  },
  actions: [
    "Ataque com os punhos [Força + Briga]",
    "Cantar [Carisma + Performance]",
    "Conduzir suas ações com perfeição em um jantar formal [Destreza + Etiqueta]",
    "Corrida prolongada [Vigor + Atletismo]",
    "Decifrar uma ameaça velada [Raciocínio + Intimidação]",
    "Descobrir o nível de segurança de um local [Inteligência + Ladroagem]",
    "Descobrir informações sobre uma gangue [Carisma + Manha]",
    "Desviar de um obstáculo enquanto dirigi [Raciocínio + Condução]",
    "Distrair cães de guarda enquanto se infiltra [Manipulação + Empatia com Animais]",
    "Emparelhar um veículo enquanto dirigi [Raciocínio + Condução]",
    "Encontrar abrigo para passar o dia [Raciocínio + Sobrevivência]",
    "Fazer uma tocaia [Vigor + Furtividade]",
    "Ler um livro esotérico [Inteligência + Ocultismo]",
    "Reforçar uma porta de refúgio [Raciocínio + Ofícios]",
    "Sacar uma arma de forma velada [Destreza + Subterfúgio]",
    "Verificar credibilidade de uma história [Manipulação + Persuasão]",
    "Performance Artística [Carisma + Performance]",
    "Farrear [Carisma + Sagacidade]",
    "Credibilidade [Manipulação + Subterfúgio]",
    "(Resistido) Credibilidade [Raciocínio + Sagacidade]",
    "Conversa Fiada [Carisma + Subterfúgio]",
    "(Resistido) Conversa Fiada [Autocontrole + Sagacidade]",
    "Interrogatório pacífico [Manipulação + Sagacidade]",
    "(Resistido) Interrogatório pacífico [Autocontrole + Raciocínio]",
    "Interrogatório agressivo [Manipulação + Intimidação]",
    "(Resistido) Interrogatório agressivo [Autocontrole + Determinação]",
    "Intimidação - Coerção sutil [Manipulação + Intimidação]",
    "(Resistido) Intimidação - Coerção sutil [Autocontrole + Determinação]",
    "Intimidação - Ameaça descarada [Força + Intimidação]",
    "(Resistido) Intimidação - Ameaça descarada [Autocontrole + Determinação]",
    "(Resistido) Intimidação - Ameaça descarada [Força + Intimidação]",
    "Discurso [Carisma + Performance]",
    "Preparar um discurso [Inteligência + Sagacidade]",
    "Sedução em um baile [Autocontrole + Etiqueta]",
    "Sedução em um bar [Carisma + Sagacidade]",
    "Sedução em uma academia [Manipulação + Atletismo]",
    "Sedução em uma cafeteria [Raciocínio + Subterfúgio]",
    "(Resistido) Sedução [Carisma + Subterfúgio]",
    "Escalar [Destreza + Atletismo]",
    "Pousar com os pés depois de uma queda [Destreza + Atletismo]",
    "Dirigir [Destreza + Condução]",
    "Dirigir com pouca visibilidade [Raciocínio + Condução]",
    "Levantar ou esmagar coisas [Força + Atletismo]",
    "Arremessar [Força + Atletismo]",
    "Arremessar [Destreza + Atletismo]",
    "Intrusão [Força + Ladroagem]",
    "Estabelecer um sistema de segurança [Inteligência + Ladroagem]",
    "Penetrar sistemas se segurança puramente eletrônicos [Inteligência + Tecnologia]",
    "Perseguição via veículos [Raciocínio + Condução]",
    "Perseguição à pé em uma corrida longa [Vigor + Atletismo]",
    "Perseguição à pé em uma corrida de velocidade [Força + Atletismo]",
    "Perseguição à pé usando parkour [Destreza + Atletismo]",
    "Seguir [Raciocínio + Percepção]",
    "(Resistido) Seguir [Determinação + Manha]",
    "(Resistido) Seguir [Raciocínio + Furtividade]",
    "(Resistido) Seguir [Raciocínio + Manha]",
    "Roubar carteira [Destreza + Ladroagem]",
    "(Resistido) Roubar carteira [Raciocínio + Ladroagem]",
    "(Resistido) Roubar carteira [Raciocínio + Percepção]",
    "Atividade oculta [Destreza + Furtividade]",
    "(Resistido) Atividade oculta [Raciocínio + Percepção]",
    "Nadar [Vigor + Atletismo]",
    "{Animalismo} ● Famulus Enlaçado [Carisma + Empatia com Animais]",
    "{Animalismo} ● Sentir a Besta [Determinação + Animalismo]",
    "{Animalismo}(Resistido) ● Sentir a Besta [Autocontrole + Subterfúgio]",
    "{Animalismo} ●● Sussurros Selvagens [Manipulação + Animalismo]",
    "{Animalismo} ●● Sussurros Selvagens [Carisma + Animalismo]",
    "{Animalismo} ●●● Subjugar a Besta [Carisma + Animalismo]",
    "{Animalismo}(Resistido) ●●● Subjugar a Besta [Vigor + Determinação]",
    "{Animalismo} ●●●● Comunhão de Espíritos [Manipulação + Animalismo]",
    "{Animalismo} ●●●●● Controle Animal [Carisma + Animalismo]",
    "{Animalismo} ●●●●● Expulsar a Besta [Raciocínio + Animalismo]",
    "{Animalismo}(Resistido) ●●●●● Expulsar a Besta [Autocontrole + Determinação]",
    "{Auspícios} ● Sentidos Aguçados [Raciocínio + Determinação]",
    "{Auspícios} ● Sentir o Invisível [Raciocínio + Auspícios]",
    "{Auspícios} ● Sentir o Invisível [Determinação + Auspícios]",
    "{Auspícios} ●● Obeah [Autocontrole + Auspícios]",
    "{Auspícios} ●● Premonição [Determinação + Auspícios]",
    "{Auspícios} ●●● Perscrutar a Alma [Inteligência + Auspícios]",
    "{Auspícios}(Resistido) ●●● Perscrutar a Alma [Autocontrole + Subterfúgio]",
    "{Auspícios} ●●● Compartilhar os Sentidos [Determinação + Auspícios]",
    "{Auspícios} ●●●● Toque do Espírito [Inteligência + Auspícios]",
    "{Auspícios} ●●●●● Clarividência [Inteligência + Auspícios]",
    "{Auspícios} ●●●●● Possessão [Determinação + Auspícios]",
    "{Auspícios}(Resistido) ●●●●● Possessão [Determinação + Inteligência]",
    "{Auspícios} ●●●●● Telepatia [Determinação + Auspícios]",
    "{Auspícios}(Resistido) ●●●●● Telepatia [Raciocínio + Subterfúgio]",
    "{Auspícios} ●●●●● Aliviando a Alma Bestial [Autocontrole + Auspícios]",
    "{Auspícios}(Resistido) ●●●●● Aliviando a Alma Bestial [Humanidade]",
    "{Feitiçaria do Sangue} ● Um Gosto por Sangue [Determinação + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue} ●● Extinguir Vitae [Inteligência + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue}(Resistido) ●● Extinguir Vitae [Vigor + Autocontrole]",
    "{Feitiçaria do Sangue} ●●● Sangue Potente [Determinação + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue} ●●● Picada de Escorpião [Força + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue}(Resistido) ●●● Picada de Escorpião [Vigor + Ocultismo]",
    "{Feitiçaria do Sangue}(Resistido) ●●● Picada de Escorpião [Vigor + Fortitude]",
    "{Feitiçaria do Sangue} ●●●● Roubo de Vitae [Raciocínio + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue}(Resistido) ●●●● Roubo de Vitae [Raciocínio + Ocultismo]",
    "{Feitiçaria do Sangue} ●●●●● Carícia de Baal [Força + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue}(Resistido) ●●●●● Carícia de Baal [Vigor + Ocultismo]",
    "{Feitiçaria do Sangue}(Resistido) ●●●●● Carícia de Baal [Vigor + Fortitude]",
    "{Feitiçaria do Sangue} ●●●●● Caldeirão de Sangue [Determinação + Feitiçaria do Sangue]",
    "{Feitiçaria do Sangue}(Resistido) ●●●●● Caldeirão de Sangue [Autocontrole + Ocultismo]",
    "{Feitiçaria do Sangue}(Resistido) ●●●●● Caldeirão de Sangue [Autocontrole + Fortitude]",
    "{Celeridade} ●● Rapidez [Destreza + Atletismo]",
    "{Celeridade} ●●● Piscadela [Destreza + Atletismo]",
    "{Celeridade} ●●● Travessia [Destreza + Atletismo]",
    "{Dominação} ● Nublar Memória [Carisma + Dominação]",
    "{Dominação}(Resistido) ● Nublar Memória [Raciocínio + Determinação]",
    "{Dominação} ● Compelir [Carisma + Dominação]",
    "{Dominação}(Resistido) ● Compelir [Inteligência + Determinação]",
    "{Dominação} ●● Dementação [Manipulação + Dominação]",
    "{Dominação}(Resistido) ●● Dementação [Autocontrole + Inteligência]",
    "{Dominação} ●● Mesmerismo [Manipulação + Dominação]",
    "{Dominação}(Resistido) ●● Mesmerismo [Inteligência + Determinação]",
    "{Dominação} ●●● A Mente Esquecida [Manipulação + Dominação]",
    "{Dominação}(Resistido) ●●● A Mente Esquecida [Inteligência + Determinação]",
    "{Dominação} ●●● Domínio Ancestral [Manipulação + Dominação]",
    "{Dominação}(Resistido) ●●● Domínio Ancestral [Inteligência + Determinação]",
    "{Fortitude} ●● Feras Tenazes [Vigor + Animalismo]",
    "{Fortitude} ●● Valeren [Inteligência + Fortitude]",
    "{Fortitude} ●●● Desafio à Perdição [Raciocínio + Sobrevivência]",
    "{Fortitude} ●●●● Estilhaçar [Vigor + Fortitude]",
    "{Fortitude}(Resistido) ●●●● Estilhaçar [Vigor]",
    "{Fortitude}(Resistido) ●●●● Estilhaçar [Vigor + Fortitude]",
    "{Oblívio} ● Do Pó ao Pó [Vigor + Oblívio]",
    "{Oblívio}(Resistido) ● Do Pó ao Pó [Vigor + Medicina]",
    "{Oblívio}(Resistido) ● Do Pó ao Pó [Vigor + Fortitude]",
    "{Oblívio} ● Grilhões que Vinculam [Raciocínio + Oblívio]",
    "{Oblívio} ●● Precognição Fatal [Determinação + Oblívio]",
    "{Oblívio} ●● Braços de Arimã [Raciocínio + Oblívio]",
    "{Oblívio} ●● Onde a Mortalha Afina [Raciocínio + Oblívio]",
    "{Oblívio} ●●● Aura de Decadência [Vigor + Oblívio]",
    "{Oblívio}(Resistido) ●●● Aura de Decadência [Vigor + Medicina]",
    "{Oblívio}(Resistido) ●●● Aura de Decadência [Vigor + Fortitude]",
    "{Oblívio} ●●● Toque do Oblívio [Força + Briga]",
    "{Oblívio} ●●●● Praga Necrótica [Inteligência + Oblívio]",
    "{Oblívio}(Resistido) ●●●● Praga Necrótica [Vigor + Medicina]",
    "{Oblívio}(Resistido) ●●●● Praga Necrótica [Vigor + Fortitude]",
    "{Oblívio} ●●●●● Crânio Realizado [Vigor + Oblívio]",
    "{Oblívio}(Resistido) ●●●●● Crânio Realizado [Vigor + Medicina + Fortitude]",
    "{Oblívio} ●●●●● Espírito em Declínio [Determinação + Oblívio]",
    "{Oblívio}(Resistido) ●●●●● Espírito em Declínio [Determinação + Ocultismo + Fortitude]",
    "{Ofuscação} ●● Quimerismo [Manipulação + Ofuscação]",
    "{Ofuscação}(Resistido) ●● Quimerismo [Autocontrole + Raciocínio]",
    "{Ofuscação} ●● Labirinto Mental [Carisma + Ofuscação]",
    "{Ofuscação}(Resistido) ●● Labirinto Mental [Raciocínio + Determinação]",
    "{Ofuscação} ●●● Fata Morgana [Manipulação + Ofuscação]",
    "{Ofuscação} ●●●● Ocultar [Inteligência + Ofuscação]",
    "{Ofuscação} ●●●● Desaparecer [Raciocínio + Ofuscação]",
    "{Ofuscação}(Resistido) ●●●● Desaparecer [Raciocínio + Percepção]",
    "{Ofuscação} ●●●●● Disfarce do Impostor [Raciocínio + Ofuscação]",
    "{Ofuscação}(Resistido) ●●●●● Disfarce do Impostor [Manipulação + Performance]",
    "{Potência} ●●● Centelha de Fúria [Manipulação + Potência]",
    "{Presença} ● Fascínio [Manipulação + Presença]",
    "{Presença}(Resistido) ● Fascínio [Autocontrole + Inteligência]",
    "{Presença} ● Olhos da Serpente [Carisma + Presença]",
    "{Presença}(Resistido) ● Olhos da Serpente [Raciocínio + Autocontrole]",
    "{Presença} ●● Beijo Indelével [Carisma + Presença]",
    "{Presença}(Resistido) ●● Beijo Indelével [Raciocínio + Autocontrole]",
    "{Presença} ●●● Olhar Aterrorizante [Carisma + Presença]",
    "{Presença}(Resistido) ●●● Olhar Aterrorizante [Autocontrole + Determinação]",
    "{Presença} ●●● Transe [Carisma + Presença]",
    "{Presença}(Resistido) ●●● Transe [Raciocínio + Autocontrole]",
    "{Presença} ●●● Face do Amor Verdadeiro [Carisma + Ofuscação]",
    "{Presença}(Resistido) ●●● Face do Amor Verdadeiro [Raciocínio + Autocontrole]",
    "{Presença} ●●●● Convocar [Manipulação + Presença]",
    "{Presença}(Resistido) ●●●● Convocar [Autocontrole + Inteligência]",
    "{Presença} ●●●●● Majestade [Carisma + Presença]",
    "{Presença}(Resistido) ●●●●● Majestade [Autocontrole + Determinação]",
    "{Proteanismo} ● Peso Pena [Raciocínio + Sobrevivência]",
    "{Proteanismo} ●● Vicissitude [Determinação + Proteanismo]",
    "{Proteanismo} ●●● Modelagem de Carne [Determinação + Proteanismo]",
    "{Proteanismo}(Resistido) ●●● Modelagem de Carne [Vigor + Determinação]",
  ],
};
