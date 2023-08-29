import { attributes } from "./attributes.ts";
import * as kanka from "./kanka.ts";
import * as tags from "./tags.ts";
import { batch } from "./batch.ts";

export function setup(
  campaignId: number,
): number {
  if (batch.percent == 0) {
    buildTemplates(campaignId);
  }

  return batch.percent;
}

async function buildTemplates(campaignId: number) {
  batch.total = Object.keys(attributes).length;

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
        await batch.run(() => kanka.createAttribute(
          campaignId,
          templateId,
          {
            entity_id: templateId,
            name: name,
            value: attribute.value,
            type_id: attribute.type ? attribute.type : 1,
          },
        ));
      }
    }
  }
}
