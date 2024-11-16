import { Character } from "./character.ts";

const database = await Deno.openKv();

const character = "character";

export async function get(id: string): Promise<Character> {
  const keys = [character, id];
  let data = (await database.get<Character>(keys)).value;

  if (data == null) {
    data = {
      hashCode: undefined,
      id: id,
      details: "",
      image: "",
      name: "",
      player: "",
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
      specialties: {},
      advantages: {},
      flaws: {},
      disciplines: {},
    };

    await database.set(keys, data);
  }

  return data;
}

export async function check(id: string, hashCode: number): Promise<boolean> {
  return (await get(id)).hashCode != hashCode;
}

export async function search(term: string): Promise<Character[]> {
  const result: Character[] = [];
  for await (const key of database.list<Character>({ prefix: [character] })) {
    if (key.value.name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
      result.push(key.value);
    }
  }

  return result.sort((r, l) => {
    if (r.name < l.name) {
      return -1;
    }
    if (r.name > l.name) {
      return 1;
    }
    return 0;
  });
}