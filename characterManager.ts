import { Character } from "./character.ts";
import * as kanka from "./kanka.ts";
import * as tags from "./tags.ts";
import { attributes, AttributeType, Context } from "./attributes.ts";
import { locale } from "./i18n/locale.ts";
import { keys } from "./utils.ts";
import { Batch } from "./batch.ts";
import { logger } from "./logger.ts";

export const batch = new Batch();

const cache: {
  [id: number]: Character;
} = {};

export enum ApplyType {
  SpecialtyPhysical,
  SpecialtySocial,
  SpecialtyMental,
  Advantage,
  Flaw,
}

function penalty(left: number): number {
  return left <= 0 ? 3 : (left >= 1 && left <= 3 ? (3 - left) : 0);
}

function hashCode(data: any): number {
  const text = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + code;
    hash = hash & hash;
  }
  return hash;
}

export function getFromCache(key: number): Character {
  if (cache[key] == undefined) {
    cache[key] = {
      hashCode: undefined,
      id: key,
      discordId: "",
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
  }

  return cache[key];
}

async function tryUpdate(character: Character, id: number): Promise<boolean> {
  const kankaCharacter = await kanka.getEntityRelated(id);

  if (kankaCharacter.data) {
    character.id = id;
    character.name = kankaCharacter.data.name;
    character.image = kankaCharacter.data.child.image_full;

    let context: Context | undefined;

    kankaCharacter.data.attributes.sort(sortAttribute).forEach(
      (kankaAttribute) => {
        const attribute = attributes[kankaAttribute.name] ||
          (context && context.generic);
        if (attribute) {
          if (attribute.type == AttributeType.Section) {
            if (attribute.context) {
              context = attribute.context(character);
            }
          } else {
            const parse = attribute.parse || context?.generic.parse;
            if (parse) {
              let value;
              switch (attribute.type) {
                case AttributeType.Checkbox:
                  value = kankaAttribute.value == "1" ||
                    kankaAttribute.value == "on";
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
              parse(character, kankaAttribute.name, value, context);
            }
          }
        }
      },
    );

    character.health.penalty = penalty(
      (character.attributes.physical.stamina + 3) -
        (character.health.superficial + character.health.aggravated),
    );

    character.willpower.penalty = penalty(
      (character.attributes.social.composure +
        character.attributes.mental.resolve) -
        (character.willpower.superficial + character.willpower.aggravated),
    );

    character.hashCode = hashCode(character);

    return true;
  }

  return false;
}

function sortAttribute(
  r: kanka.KankaAttribute,
  l: kanka.KankaAttribute,
): number {
  if (r.default_order < l.default_order) {
    return -1;
  }
  if (r.default_order > l.default_order) {
    return 1;
  }
  return 0;
}

export async function getCharacters(): Promise<kanka.KankaEntity[]> {
  const entities: kanka.KankaEntity[] = [];

  const kankaTags = await kanka.getTagsByName(tags.Player.name);

  if (kankaTags.data.length > 0) {
    for (let index = 0; index < kankaTags.data[0].entities.length; index++) {
      const entity = await kanka.getEntity(
        kankaTags.data[0].entities[index],
      );
      if (entity.data) {
        entities.push(entity.data);
      }
    }
  }

  return entities;
}

export function check(id: number, hashCode: number): boolean {
  return getFromCache(id).hashCode != hashCode;
}

export async function get(id: number): Promise<Character> {
  const character = getFromCache(id);
  if (character.hashCode == undefined) {
    await tryUpdate(character, id);
  }
  return character;
}

export async function loadAll(): Promise<void> {
  const kankaTags = await kanka.getTagsByName(
    tags.Player.name,
  );

  if (kankaTags.data && kankaTags.data.length > 0) {
    const tag = kankaTags.data[0];
    for (let index = 0; index < tag.entities.length; index++) {
      await get(tag.entities[index]);
    }
  }
}

export function updateCronJob() {
  Deno.cron("Characters cron job", "*/1 * * * *", async () => {
    try {
      batch.total = Object.keys(cache).length;

      for (const key in cache) {
        await batch.run(async () => await tryUpdate(cache[key], key as unknown as number));
      }
    } catch (error) {
      logger.error(error);
    }
  });
}

export function search(term: string): Character[] {
  return keys(cache).map((key) => cache[key]).filter((c) =>
    c.name.toLowerCase().indexOf(term.toLowerCase()) > -1
  ).sort((r, l) => {
    if (r.name < l.name) {
      return -1;
    }
    if (r.name > l.name) {
      return 1;
    }
    return 0;
  });
}

export function getByDiscordId(id: string): Character | undefined {
  for (const key in cache) {
    const character = cache[key];
    if (character.discordId == id) {
      return character;
    }
  }
  return undefined;
}

export async function apply(
  id: number,
  type: ApplyType,
): Promise<boolean> {
  const result = await kanka.getCharacterAttributes(id);

  if (result.data) {
    const attributes = result.data.sort(sortAttribute);
    const body: kanka.KankaAttributeBody = {
      entity_id: id,
      name: "",
      type_id: 1,
    };

    switch (type) {
      case ApplyType.SpecialtyPhysical:
        buildSpecialtyAttribute(
          locale.skills.physical,
          body,
          attributes,
        );
        break;
      case ApplyType.SpecialtySocial:
        buildSpecialtyAttribute(
          locale.skills.social,
          body,
          attributes,
        );
        break;
      case ApplyType.SpecialtyMental:
        buildSpecialtyAttribute(
          locale.skills.mental,
          body,
          attributes,
        );
        break;
      case ApplyType.Advantage:
        {
          const order = getAttributeOrder(
            attributes,
            locale.advantages,
          );
          body.name = `${locale.advantages}${generateAttributeHash()}[range:1,5]`;
          body.type_id = 6;
          body.default_order = order;
        }
        break;
      case ApplyType.Flaw:
        {
          const order = getAttributeOrder(
            attributes,
            locale.flaws,
          );
          body.name = `${locale.flaws}${generateAttributeHash()}[range:1,5]`;
          body.type_id = 6;
          body.default_order = order;
        }
        break;
    }

    if (body.default_order == -1) {
      return false;
    }

    const resultAttribute = await kanka.createAttribute(
      id,
      body,
    );

    return resultAttribute.data ? true : false;
  }

  return false;
}

function generateAttributeHash(): string {
  return Math.abs(hashCode(new Date())).toString();
}

function buildSpecialtyAttribute(
  o: object,
  body: kanka.KankaAttributeBody,
  attributes: kanka.KankaAttribute[],
) {
  const order = getAttributeOrder(attributes, locale.specialties.name);
  body.name = `${locale.specialties.specialty}${generateAttributeHash()}[range:${Object.values(o).join(",")}]`;
  body.default_order = order;
}

function getAttributeOrder(
  attributes: kanka.KankaAttribute[],
  section: string,
): number {
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    if (attribute.name == section) {
      return attribute.default_order + 1;
    }
  }

  return -1;
}
