
import { Character, CharacterMode } from "./character.ts";
import { config } from "./config.ts";
import { ApplicationCommandChoice, connect, EmbedPayload } from "./deps.ts";
import { RollResult } from "./diceRollManager.ts";
import { logger } from "./logger.ts";
import { Macro } from "./macroTranspiler.ts";

type LastRoll = {
  embed: EmbedPayload;
  result: RollResult;
}

const repository = await connect(config.redis);

const characterKey = "character";
const nameKey = "name";
const sheetKey = "sheet";
const chronicleKey = "chronicle";
const versionstampKey = "versionstamp";
const lastRollKey = "lastRoll";
const currentCharacterKey = "currentCharacter";
const difficultyKey = "difficulty";
const modifierKey = "modifier";
const storytellerKey = "storyteller";
const rollChannelKey = "rollChannel";
const macroKey = "macro";
const indexCharacter = "idx:character";

const indexes = await repository.sendCommand("FT._LIST") as string[];

if (indexes.indexOf(indexCharacter) == -1) {
  logger.info("Create index: %v", indexCharacter);
  await repository.sendCommand("FT.CREATE", [indexCharacter, "ON", "HASH", "PREFIX", 1, `${characterKey}:`, "SCHEMA", nameKey, "TEXT", chronicleKey, "TAG"]);
}

export async function removeChronicle(id: string) {
  for (const key of [...await repository.keys(`${characterKey}:${id}:*`),
    ...await repository.keys(`${lastRollKey}:${id}:*`),
    ...await repository.keys(`${macroKey}:${id}:*`),
    ...await repository.keys(`${currentCharacterKey}:${id}`),
    ...await repository.keys(`${difficultyKey}:${id}`),
    ...await repository.keys(`${modifierKey}:${id}`),
    ...await repository.keys(`${storytellerKey}:${id}`),
    ...await repository.keys(`${rollChannelKey}:${id}`)]) {
      logger.info("Delete %v", key);
      await repository.del(key);
  }
}

export class Chronicle {
  constructor(private chronicleId: string) {
  }

  public get id() : string {
    return this.chronicleId;
  }

  public async lastRoll(id: string): Promise<LastRoll | null> {
    const key = `${lastRollKey}:${this.chronicleId}:${id}`;
    const bulk = await repository.get(key);
    if (bulk != null) {
      await repository.del(key);
      return JSON.parse(bulk);
    }
    return null;
  }

  public async getLastRollByUserId(userId: string): Promise<LastRoll | null> {
    const currentCharacter = await this.currentCharacter();
    return await this.lastRoll(await this.isStoryteller(userId) && currentCharacter ? currentCharacter : userId);
  }
  
  public async setLastRoll(id: string, value: LastRoll) {
    await repository.set(`${lastRollKey}:${this.chronicleId}:${id}`, JSON.stringify(value));
  }

  public async difficulty(): Promise<number | null> {
    const key = `${difficultyKey}:${this.chronicleId}`;
    const bulk = await repository.get(key);
    if (bulk != null) {
      await repository.del(key);
      return Number(bulk);
    }
    return null;
  }
  
  public async setDifficulty(value: number) {
    await repository.set(`${difficultyKey}:${this.chronicleId}`, value);
  }

  public async modifier(): Promise<number | null> {
    const key = `${modifierKey}:${this.chronicleId}`;
    const bulk = await repository.get(key);
    if (bulk != null) {
      await repository.del(key);
      return Number(bulk);
    }
    return null;
  }
  
  public async setModifier(value: number) {
    await repository.set(`${modifierKey}:${this.chronicleId}`, value);
  } 

  public async rollChannel(): Promise<string | null> {
    return await repository.get(`${rollChannelKey}:${this.chronicleId}`);
  }

  public async setRollChannel(value: string | null) {
    const key = `${rollChannelKey}:${this.chronicleId}`;
    if (value != null) {
      await repository.set(key, value);
    }
    else {
      await repository.del(key);
    }
  }

  public async macro(id: string): Promise<Macro | null> {
    const key = `${macroKey}:${this.chronicleId}:${id}`;
    const bulk = await repository.get(key);
    return bulk != null ? JSON.parse(bulk) : null;
  }
  
  public async saveMacro(value: Macro) {
    await repository.set(`${macroKey}:${this.chronicleId}:${value.message.id}`, JSON.stringify(value));
  }

  public async removeMacro(id: string) {
    await repository.del(`${macroKey}:${this.chronicleId}:${id}`);
  }

  public async currentCharacter(): Promise<string | null> {
    return await repository.get(`${currentCharacterKey}:${this.chronicleId}`);
  }
  
  public async setCurrentCharacter(value: string | null) {
    const key = `${currentCharacterKey}:${this.chronicleId}`;
    if (value != null) {
      await repository.set(key, value);
    }
    else {
      await repository.del(key);
    }
  }

  public async storyteller(): Promise<string> {
    return (await repository.get(`${storytellerKey}:${this.chronicleId}`))!;
  }

  public async isStoryteller(userId: string): Promise<boolean> {
    return (await this.storyteller()) == userId;
  }
  
  public async setStoryteller(value: string) {
    await repository.set(`${storytellerKey}:${this.chronicleId}`, value);
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
    const key = `${characterKey}:${this.chronicleId}:${id}`;

    const bulk = await repository.hget(key, sheetKey);

    let character: Character | undefined;

    if (bulk == null) {
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
          start: 3,
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
        await this.saveCharacter(character);
      }
    }
    else {
      character = JSON.parse(bulk);
    }

    logger.info("Get Character %v", bulk);

    return character!;
  }

  private async saveCharacter(character: Character) {
    const json = JSON.stringify(character);

    logger.info("Save Character %v", json);

    await repository.hset(`${characterKey}:${this.chronicleId}:${character.id}`,
      [nameKey, character.name],
      [sheetKey, json],
      [chronicleKey, this.chronicleId],
      [versionstampKey, character.versionstamp]
    );
  }

  public async updateCharacter(character: Character) {
    character.health.penalty = this.penalty(
      (character.attributes.physical.stamina + character.health.start) -
        (character.health.superficial + character.health.aggravated),
    );

    character.willpower.penalty = this.penalty(
      (character.attributes.social.composure +
        character.attributes.mental.resolve) -
        (character.willpower.superficial + character.willpower.aggravated),
    );

    character.versionstamp = crypto.randomUUID();

    await this.saveCharacter(character);
  }

  public async updateCharacterMode(mode: CharacterMode, id?: string) {
    const entries = id
      ? [`${characterKey}:${this.chronicleId}:${id}`]
      : await repository.hkeys(`${characterKey}:${this.chronicleId}:*`);

    await repository.multi();

    for (const key of entries) {
      const character: Character = JSON.parse((await repository.hget(key, sheetKey))!);

      character.mode = mode;

      const json = JSON.stringify(character);

      logger.info("Update Character Mode %v", json);

      await repository.set(key, json);
    }

    await repository.exec();
  }

  public async checkCharacter(
    id: string,
    versionstamp: string,
  ): Promise<boolean> {
    const bulk = await repository.hget(`${characterKey}:${this.chronicleId}:${id}`, versionstampKey);
    return versionstamp !== bulk;
  }

  public async deleteCharacter(id: string) {
    logger.info("Delete Character %v", id);
    await repository.del(`${characterKey}:${this.chronicleId}:${id}`);
  }

  public async getCharacterChoicesByTerm(term: string | null): Promise<ApplicationCommandChoice[]> {
    const result: ApplicationCommandChoice[] = [];

    const [_, ...keys] = await repository.sendCommand("FT.SEARCH", 
      [indexCharacter,`@${chronicleKey}:{${this.chronicleId}}${term == null || term == "" ? "" : ` @${nameKey}:*${term.toLowerCase()}*`}`, "LIMIT", 0, 25]) as [number, ...(string | string[])[]];

    for (const array of keys) {
      if (Array.isArray(array)) {
        const character: Character = JSON.parse(array[3]);

        result.push({
          value: character.id,
          name: character.name.substring(0, 100),
        });
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

    logger.info("Search: %s", result);

    return result;
  }
}