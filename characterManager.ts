import { Character } from "./character.ts";
import * as kanka from "./kanka.ts";
import { attributes } from "./attributes.ts";

const cache: {
  [id: string]: Character;
} = {};

function getFromCache(key: string): Character {
  if (cache[key] == undefined) {
    cache[key] = {
      sync: undefined,
      name: "",
      clan: "",
      entityId: 0,
      player: "",
      generation: 0,
      attributes: {
        physical: {
          strength: 0,
          dexterity: 0,
          stamina: 0,
        },
        social: {
          charisma: 0,
          manipulation: 0,
          composure: 0,
        },
        mental: {
          intelligence: 0,
          wits: 0,
          resolve: 0,
        },
      },
      skills: {
        physical: {
          athletics: 0,
          brawl: 0,
          craft: 0,
          drive: 0,
          firearms: 0,
          melee: 0,
          larceny: 0,
          stealth: 0,
          survival: 0,
        },
        social: {
          animalKen: 0,
          etiquette: 0,
          insight: 0,
          intimidation: 0,
          leadership: 0,
          performance: 0,
          persuasion: 0,
          streetwise: 0,
          subterfuge: 0,
        },
        mental: {
          academics: 0,
          awareness: 0,
          finance: 0,
          investigation: 0,
          medicine: 0,
          occult: 0,
          politics: 0,
          science: 0,
          technology: 0,
        },
      },
      health: {
        superficial: 0,
        aggravated: 0,
        penalty: 0,
      },
      willpower: {
        superficial: 0,
        aggravated: 0,
        penalty: 0,
      },
      humanity: {
        total: 0,
        stains: 0,
      },
      bloodPotency: 0,
      hunger: 0,
      experience: {
        total: 0,
        spent: 0,
      },
      disciplines: {
        animalism: {
          bondFamulus: false,
          senseTheBeast: false,
          feralWhispers: false,
          animalSucculence: false,
          quellTheBeast: false,
          unlivingHive: false,
          subsumeTheSpirit: false,
          animalDominion: false,
          drawingOutTheBeast: false,
        },
        auspex: {
          heightenedSenses: false,
          senseTheUnseen: false,
          premonition: false,
          scryTheSoul: false,
          shareTheSenses: false,
          spiritsTouch: false,
          clairvoyance: false,
          possession: false,
          telepathy: false,
        },
        dominate: {
          cloudMemory: false,
          compel: false,
          mesmerize: false,
          dementation: false,
          theForgetfulMind: false,
          submergedDirective: false,
          rationalize: false,
          massManipulation: false,
          terminalDecree: false,
        },
        bloodSorcery: {
          corrosiveVitae: false,
          aTasteForBlood: false,
          extinguishVitae: false,
          bloodOfPotency: false,
          scorpionsTouch: false,
          theftOfVitae: false,
          baalsCaress: false,
          cauldronOfBlood: false,
        },
        fortitude: {
          resilience: false,
          unswayableMind: false,
          toughness: false,
          enduringBeasts: false,
          defyBane: false,
          fortifyTheInnerFacade: false,
          draughtOfEndurance: false,
          fleshOfMarble: false,
          prowessFromPain: false,
        },
        protean: {
          eyesOfTheBeast: false,
          weightOfTheFeather: false,
          feralWeapons: false,
          earthMeld: false,
          shapechange: false,
          metamorphosis: false,
          mistForm: false,
          theUnfetteredHeart: false,
        },
        obfuscate: {
          cloakOfShadows: false,
          silenceOfDeath: false,
          unseenPassage: false,
          ghostInTheMachine: false,
          maskOfAThousandFaces: false,
          conceal: false,
          vanish: false,
          cloakTheGathering: false,
          impostorsGuise: false,
        },
        potence: {
          lethalBody: false,
          soaringLeap: false,
          prowess: false,
          brutalFeed: false,
          sparkOfRage: false,
          uncannyGrip: false,
          draughtOfMight: false,
          earthshock: false,
          fistOfCaine: false,
        },
        presence: {
          awe: false,
          daunt: false,
          lingeringKiss: false,
          dreadGaze: false,
          entrancement: false,
          irresistibleVoice: false,
          summon: false,
          majesty: false,
          starMagnetism: false,
        },
        celerity: {
          catsGrace: false,
          rapidReflexes: false,
          fleetness: false,
          blink: false,
          traversal: false,
          draughtOfElegance: false,
          unerringAim: false,
          lightningStrike: false,
          splitSecond: false,
        },
        rituals: {
          bloodWalk: false,
          clingingOfTheInsect: false,
          craftBloodstone: false,
          wakeWithEveningsFreshness: false,
          wardAgainstGhouls: false,
          communicateWithKindredSire: false,
          eyesOfBabel: false,
          illuminateTheTrailOfPrey: false,
          truthOfBlood: false,
          wardAgainstSpirits: false,
          wardingCircleAgainstGhouls: false,
          dagonsCall: false,
          deflectionOfWoodenDoom: false,
          essenceOfAir: false,
          firewalker: false,
          wardAgainstLupines: false,
          wardingCircleAgainstSpirits: false,
          defenseOfTheSacredHaven: false,
          eyesOfTheNighthawk: false,
          incorporealPassage: false,
          wardAgainstCainites: false,
          wardingCircleAgainstLupines: false,
          escapeToTrueSanctuary: false,
          heartOfStone: false,
          shaftOfBelatedDissolution: false,
          wardingCircleAgainstCainites: false,
        },
        thinBloodAlchemy: {
          farReach: false,
          haze: false,
          profaneHierosGamos: false,
          envelop: false,
          defractionate: false,
          airborneMomentum: false,
          awakenTheSleeper: false,
        },
      },
    };
  }

  return cache[key];
}

async function tryUpdate(character: Character, campaignId: number, id: number) {
  if (character.sync == undefined) {
    const kankaCharacter = await kanka.getCharacter(campaignId, id);

    if (kankaCharacter.data) {
      character.entityId = kankaCharacter.data.entity_id;
      character.name = kankaCharacter.data.name;
    }
  }

  if (character.entityId > 0) {
    const kankaAttributes = await kanka.getCharacterAttributes(
      campaignId,
      character.entityId,
      character.sync,
    );
    if (kankaAttributes.sync) {
      character.sync = kankaAttributes.sync;
      for (let index = 0; index < kankaAttributes.data.length; index++) {
        const kankaAttribute = kankaAttributes.data[index];
        const attribute = attributes[kankaAttribute.name];
        if (attribute && attribute.parse) {
          attribute.parse(character, kankaAttribute.value);
        }
      }
    }
  }
}

export async function check(campaignId: number, id: number): Promise<boolean> {
  const character = getFromCache(id.toString());
  const sync = character.sync;
  await tryUpdate(character, campaignId, id);
  return character.sync != sync;
}

export async function get(campaignId: number, id: number): Promise<Character> {
  const character = getFromCache(id.toString());
  if (character.sync == undefined) {
    await tryUpdate(character, campaignId, id);
  }
  return character;
}
