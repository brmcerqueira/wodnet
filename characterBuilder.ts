import { Character } from "./character.ts";
import * as kanka from "./kanka.ts";

export async function characterBuilder(id: number, encodeId: string): Promise<Character> {
    const character = await kanka.getCharacter(id);
    const characterAttributes = await kanka.getCharacterAttributes(character.entity_id);
    
    return {
        id: encodeId,
        name: character.name,
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