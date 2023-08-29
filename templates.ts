import { attributes } from "./attributes.ts";
import { delay } from "./deps.ts";
import { logger } from "./logger.ts";
import * as kanka from "./kanka.ts";
import * as tags from "./tags.ts";

let percent = 0;

export function setup(
  campaignId: number,
): number {
  if (percent == 0) {
    buildTemplate(campaignId);
  }

  return percent;
}

async function buildTemplate(campaignId: number) {
  const total = Object.keys(attributes).length;
  let current = 1;

  const map: {
    [name: string]: number
  } = {};

  const kankaTags = await kanka.getTagsByType(campaignId, tags.Templates);

  for (let index = 0; index < kankaTags.data.length; index++) {
    const tag = kankaTags.data[index];
    if (tag.entities.length > 0) {
      map[tag.name] = tag.entities[0];  
    }
  }

  for (const name in attributes) {
    const attribute = attributes[name];
    const array: tags.Tag[] = attribute.tags ? attribute.tags : [tags.Character];
    for (let index = 0; index < array.length; index++) {
      const templateId = map[array[index].name];
      if (templateId) {
          await createAttribute(
            campaignId,
            templateId,
            {
              entity_id: templateId,
              name: name,
              value: attribute.value,
              type_id: attribute.type ? attribute.type : 1,
            },
            current,
            total,
          );
      }
    }
    current++;
  }
  percent = 0;
}

async function createAttribute(
  campaignId: number,
  templateId: number,
  attribute: kanka.KankaAttributeBody,
  current: number,
  total: number,
) {
  const kankaAttribute = await kanka.createAttribute(
    campaignId,
    templateId,
    attribute,
  );

  if (kankaAttribute.data) {
    percent = current * 100 / total;
    logger.info(`template: ${percent}%`);
  } else {
    const next = new Date();
    next.setMinutes(next.getMinutes() + 1);
    next.setSeconds(5);
    next.setMilliseconds(0);
    await delay(next.getTime() - new Date().getTime());
    await createAttribute(campaignId, templateId, attribute, current, total);
  }
}
