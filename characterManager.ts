import { Character } from "./character.ts";
import * as kanka from "./kanka.ts";
import { attributes, AttributeType, Context } from "./attributes.ts";
import { locale } from "./i18n/locale.ts";

const cache: {
  [id: string]: Character;
} = {};

export enum ApplyType {
  SpecialtyPhysical,
  SpecialtySocial,
  SpecialtyMental,
  Advantage,
  Flaw,
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

function getFromCache(key: string): Character {
  if (cache[key] == undefined) {
    cache[key] = {
      hashCode: undefined,
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
      specialties: {},
      advantages: {},
      flaws: {},
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

    let context: Context | undefined;

    kankaCharacter.data.attributes.sort(sortAttribute).forEach(kankaAttribute => {
      const attribute = attributes[kankaAttribute.name] ||
        (context && context.generic);
      if (attribute) {
        if (attribute.type == AttributeType.Section) {
          if (attribute.context) {
            context = attribute.context(character);
          }
        } else if (attribute.parse) {
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
          attribute.parse(character, kankaAttribute.name, value, context);
        }
      }
    });
    character.hashCode = undefined;
    character.hashCode = hashCode(character);
  }
}

function sortAttribute(r: kanka.KankaAttribute, l: kanka.KankaAttribute): number {
  if(r.default_order < l.default_order) {
    return -1;
  }
  if(r.default_order > l.default_order) {
    return 1;
  }
  return 0;
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

export async function apply(
  campaignId: number,
  id: number,
  type: ApplyType,
): Promise<boolean> {
  const result = await kanka.getCharacterAttributes(campaignId, id);

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
            attributes,locale.advantages,
          );
          body.name =
            `${generateAttributeName()}[range:1,5]`;
          body.type_id = 6;
          body.default_order = order;
        }
        break;
      case ApplyType.Flaw:
        {
          const order = getAttributeOrder(
            attributes, locale.flaws,          
          );
          body.name =
            `${generateAttributeName()}[range:1,5]`;
          body.type_id = 6;
          body.default_order = order;
        }
        break;
    }

    if (body.default_order == -1) {
      return false;
    }

    const resultAttribute = await kanka.createAttribute(
      campaignId,
      id,
      body,
    );

    return resultAttribute.data ? true : false;
  }

  return false;
}

function generateAttributeName(): string {
  return `<${locale.change}${Math.abs(hashCode(new Date()))}>`;
}

function buildSpecialtyAttribute(
  o: object,
  body: kanka.KankaAttributeBody,
  attributes: kanka.KankaAttribute[],
) {
  const order = getAttributeOrder(attributes, locale.specialties.name);
  body.name = `${generateAttributeName()}[range:${
    Object.values(o).join(",")
  }]`;
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