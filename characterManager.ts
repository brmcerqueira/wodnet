import { Character } from "./character.ts";
import { characterLinksRender } from "./views/characterLinksRender.tsx";
import { locale } from "./i18n/locale.ts";
import * as kanka from "./kanka.ts";
import { attributes } from "./attributes.ts";

const percent = 0;

const cache: {
  [id: string]: Character
} = {}

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
          stamina: 0
        },
        social: {
          charisma: 0,
          manipulation: 0,
          composure: 0
        },
        mental: {
          intelligence: 0,
          wits: 0,
          resolve: 0
        }
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
          survival: 0
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
          subterfuge: 0
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
          technology: 0
        }
      },
      disciplines: {
          animalism: 0,
          auspex: 0,
          bloodSorcery: 0,
          celerity: 0,
          dominate: 0,
          fortitude: 0,
          obfuscate: 0,
          oblivion: 0,
          potence: 0,
          presence: 0,
          protean: 0,
          thinBloodAlchemy: 0
      },
      health: {
        superficial: 0,
        aggravated: 0,
        penalty: 0
      },
      willpower: {
        superficial: 0,
        aggravated: 0,
        penalty: 0
      },
      humanity: {
        total: 0,
        stains: 0
      },
      bloodPotency: 0,
      hunger: 0,
      experience: {
        total: 0,
        spent: 0
      }
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
    const kankaAttributes = await kanka.getCharacterAttributes(campaignId, character.entityId, character.sync);
    if (kankaAttributes.sync) {
      character.sync = kankaAttributes.sync;
      for (let index = 0; index < attributes.length; index++) {
        const attribute = attributes[index];
        for (let kankaIndex = 0; index < kankaAttributes.data.length; kankaIndex++) {
          const kankaAttribute = kankaAttributes.data[kankaIndex];
          if (kankaAttribute.name == attribute.name) {
            attribute.parse(character, kankaAttribute.value);
            break;
          }
        }
      }
    } 
  }
}

export async function start(campaignId: number, type?: string, templateId?: number): Promise<{
  players: number,
  percent: number
}> {
  const result = {
    players: 0,
    percent: percent
  }

  if (type) {
    const players = await kanka.getCharactersByType(campaignId, type);

    const note: kanka.KankaNoteBody = {
      name: locale.characterLinks,
      entry: await characterLinksRender(players.data, campaignId).render()
    }
  
    const notes = await kanka.getNotesByName(campaignId, note.name);
  
    if (notes.data.length > 0) {
      await kanka.updateNote(campaignId, notes.data[0].id, note);
    } 
    else {
      await kanka.createNote(campaignId, note);
    }

    result.players = players.data.length;
  }

  if (templateId && percent == 0) {
    for (let index = 0; index < attributes.length; index++) {
      const attribute = attributes[index];
      await kanka.createAttribute(campaignId, templateId, {
        entity_id: templateId,
        name: attribute.name,
        value: attribute.value
      });
    }
  }

  return result;
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