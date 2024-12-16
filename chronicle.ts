import { Character, CharacterMode } from "./character.ts";
import { EmbedPayload } from "./deps.ts";
import { RollResult } from "./diceRollManager.ts";
import { logger } from "./logger.ts";

type LastRoll = {
  embed: EmbedPayload;
  result: RollResult;
}

const repository = await Deno.openKv();

const characterKey = "character";
const lastRollKey = "lastRoll";
const currentCharacterKey = "currentCharacter";
const difficultyKey = "difficulty";
const modifierKey = "modifier";
const storytellerKey = "storyteller";
const emojiKey = "emoji";

async function clearRepository() {
  for await (
    const entry of repository.list({
      prefix: [],
    })
  ) {
    logger.info("Delete %v", JSON.stringify(entry.key));
    await repository.delete(entry.key);
  }
}

export async function removeChronicle(id: string) {
  const array = [repository.list({
    prefix: [characterKey, id],
  }),repository.list({
    prefix: [lastRollKey, id],
  }),repository.list({
    prefix: [currentCharacterKey, id],
  }),repository.list({
    prefix: [difficultyKey, id],
  }),repository.list({
    prefix: [modifierKey, id],
  }),repository.list({
    prefix: [storytellerKey, id],
  }),repository.list({
    prefix: [emojiKey, id],
  })];

  for (const element of array) {
    for await (
      const entry of element
    ) {
      logger.info("Delete %v", JSON.stringify(entry.key));
      await repository.delete(entry.key);
    }
  }
}

//await clearRepository();

export class Chronicle {
  constructor(private chronicleId: string) {
  }

  public get id() : string {
    return this.chronicleId;
  }

  public async lastRoll(id: string): Promise<LastRoll | null> {
    const key = [lastRollKey, this.chronicleId, id];
    const entry = await repository.get<LastRoll>(key);
    if (entry.value != null) {
      await repository.delete(key);
    }
    return entry.value;
  }

  public async getLastRollByUserId(userId: string): Promise<LastRoll | null> {
    const currentCharacter = await this.currentCharacter();
    return await this.lastRoll(await this.isStoryteller(userId) && currentCharacter ? currentCharacter : userId);
  }
  
  public async setLastRoll(id: string, value: LastRoll) {
    await repository.set([lastRollKey, this.chronicleId, id], value);
  }

  public async difficulty(): Promise<number | null> {
    const key = [difficultyKey, this.chronicleId];
    const entry = await repository.get<number>(key);
    if (entry.value != null) {
      await repository.delete(key);
    }
    return entry.value;
  }
  
  public async setDifficulty(value: number) {
    await repository.set([difficultyKey, this.chronicleId], value);
  }

  public async modifier(): Promise<number | null> {
    const key = [modifierKey, this.chronicleId];
    const entry = await repository.get<number>(key);
    if (entry.value != null) {
      await repository.delete(key);
    }
    return entry.value;
  }
  
  public async setModifier(value: number) {
    await repository.set([modifierKey, this.chronicleId], value);
  } 

  public async currentCharacter(): Promise<string | null> {
    return (await repository.get<string>([currentCharacterKey, this.chronicleId])).value;
  }
  
  public async setCurrentCharacter(value: string | null) {
    const key = [currentCharacterKey, this.chronicleId];
    if (value != null) {
      await repository.set(key, value);
    }
    else {
      await repository.delete(key);
    }
  }

  public async storyteller(): Promise<string> {
    return (await repository.get<string>([storytellerKey, this.chronicleId])).value!;
  }

  public async isStoryteller(userId: string): Promise<boolean> {
    return (await this.storyteller()) == userId;
  }
  
  public async setStoryteller(value: string) {
    await repository.set([storytellerKey, this.chronicleId], value);
  }

  public penalty(left: number): number {
    return left <= 0 ? 3 : (left >= 1 && left <= 3 ? (3 - left) : 0);
  }

  public async getCharacterByUserId(userId: string): Promise<Character | undefined> {
    const currentCharacter = await this.currentCharacter();
    const character = (await this.isStoryteller(userId))
      ? (currentCharacter
        ? await this.getCharacter(currentCharacter, true)
        : undefined)
      : await this.getCharacter(userId, true);
    return character;
  }

  public async getOrCreateCharacterId(userId: string): Promise<string> {
    let id: string | null | undefined;
  
    if (await this.isStoryteller(userId)) {
      id = await this.currentCharacter();
      if (id == null) {
        id = crypto.randomUUID();
        await this.setCurrentCharacter(id);
      }
    } else {
      id = userId;
    }
  
    return id!;
  }

  public async getCharacter(
    id: string,
    ignorePersist?: boolean,
  ): Promise<Character> {
    const key = [characterKey, this.chronicleId, id];

    let character = (await repository.get<Character>(key)).value;

    if (character == null) {
      character = {
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
        mode: CharacterMode.Opened,
        versionstamp: crypto.randomUUID(),
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

      if (!ignorePersist) {
        await repository.set(key, character);
      }
    }

    logger.info("Get Character %v", JSON.stringify(character));

    return character;
  }

  public async updateCharacter(character: Character) {
    character.health.penalty = this.penalty(
      (character.attributes.physical.stamina + 3) -
        (character.health.superficial + character.health.aggravated),
    );

    character.willpower.penalty = this.penalty(
      (character.attributes.social.composure +
        character.attributes.mental.resolve) -
        (character.willpower.superficial + character.willpower.aggravated),
    );

    character.versionstamp = crypto.randomUUID();

    logger.info("Update Character %v", JSON.stringify(character));

    await repository.set(
      [characterKey, this.chronicleId, character.id],
      character,
    );
  }

  public async updateCharacterMode(mode: CharacterMode, id?: string) {
    const entries = id
      ? [repository.get<Character>([characterKey, this.chronicleId, id])]
        [Symbol.iterator]()
      : repository.list<Character>({
        prefix: [characterKey, this.chronicleId],
      });

    for await (
      const entry of entries
    ) {
      entry.value!.mode = mode;

      logger.info("Update Character Mode %v", JSON.stringify(entry.value));

      await repository.set(entry.key, entry.value);
    }
  }

  public async checkCharacter(
    id: string,
    versionstamp: string,
  ): Promise<boolean> {
    const entry = await repository.get<Character>([
      characterKey,
      this.chronicleId,
      id,
    ]);

    logger.info("Check: %v | %v | %v", id, JSON.stringify(versionstamp), JSON.stringify(entry.value?.versionstamp));

    return versionstamp !== entry.value?.versionstamp;
  }

  public async deleteCharacter(id: string) {
    logger.info("Delete Character %v", id);
    await repository.delete([characterKey, this.chronicleId, id]);
  }

  public async getCharactersByTerm(term: string): Promise<Character[]> {
    const result: Character[] = [];
    for await (
      const entry of repository.list<Character>({
        prefix: [characterKey, this.chronicleId],
      })
    ) {
      if (
        term == "" ||
        entry.value.name.toLowerCase().indexOf(term.toLowerCase()) > -1
      ) {
        result.push(entry.value);
      }
    }

    result.sort((r, l) => {
      if (r.name < l.name) {
        return -1;
      }
      if (r.name > l.name) {
        return 1;
      }
      return 0;
    });

    logger.info("Search: %v", JSON.stringify(result));

    return result;
  }
}
