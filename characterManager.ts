import { Character } from "./character.ts";
import * as kanka from "./kanka.ts";
import { attributes, AttributeType } from "./attributes.ts";

const cache: {
  [id: string]: Character;
} = {};

function hashCode(data: any): number {
  const text = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      hash = ((hash << 5)- hash) + code;
      hash = hash & hash;
  }
  return hash;
}

function getFromCache(key: string): Character {
  if (cache[key] == undefined) {
    cache[key] = {
      hashCode: undefined,
      image: "",
      name: "",
      player: "",
      sire: "",
      resonance: "",
      ambition: "",
      desire: "",
      predator: "",
      clan: "",
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
      },
      willpower: {
        superficial: 0,
        aggravated: 0,
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
      disciplines: {},
    };
  }

  return cache[key];
}

async function tryUpdate(character: Character, campaignId: number, id: number) {
  const kankaCharacter = await kanka.getEntityRelated(campaignId, id);

  if (kankaCharacter.data) {
    character.name = kankaCharacter.data.name;
    character.image = kankaCharacter.data.child.image_full;
    for (
      let index = 0; index < kankaCharacter.data.attributes.length; index++
    ) {
      const kankaAttribute = kankaCharacter.data.attributes[index];
      const attribute = attributes[kankaAttribute.name];
      if (attribute && attribute.parse) {
        let value;
        switch (attribute.type) {
          case AttributeType.Checkbox:
            value = kankaAttribute.value == "1" || kankaAttribute.value == "on";
            break;
          case AttributeType.RandomNumber:
          case AttributeType.Number:
            value = parseInt(kankaAttribute.value) || 0;
            break;
          case AttributeType.Standard:
          case AttributeType.MultilineTextBlock:
            default:
            value = kankaAttribute.value;
            break;
        }
        attribute.parse(character, value);
      }
    }
    character.hashCode = undefined;
    character.hashCode = hashCode(character);
  }
}

export async function check(campaignId: number, id: number): Promise<boolean> {
  const character = getFromCache(id.toString());
  const hashCode = character.hashCode;
  await tryUpdate(character, campaignId, id);
  return character.hashCode != hashCode;
}

export async function get(campaignId: number, id: number): Promise<Character> {
  const character = getFromCache(id.toString());
  if (character.hashCode == undefined) {
    await tryUpdate(character, campaignId, id);
  }
  return character;
}
