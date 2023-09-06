import { Attribute, attributes } from "./attributes.ts";
import * as kanka from "./kanka.ts";
import * as tags from "./tags.ts";
import { batch } from "./batch.ts";

export function setup(): number {
  if (batch.percent == 0) {
    buildTemplates();
  }

  return batch.percent;
}

async function buildTemplates() {
  const map: {
    [name: string]: number;
  } = {};

  const kankaTags = await kanka.getTagsByType(tags.Templates);

  for (let index = 0; index < kankaTags.data.length; index++) {
    const tag = kankaTags.data[index];
    if (tag.entities.length > 0) {
      map[tag.name] = tag.entities[0];
    }
  }

  const array: { 
    name: string, 
    templateId: number, 
    attribute: Attribute 
  }[] = [];

  for (const name in attributes) {
    const attribute = attributes[name];
    const arrayTags: tags.Tag[] = attribute.tags
      ? attribute.tags
      : [tags.Character];
    for (let index = 0; index < arrayTags.length; index++) {
      const templateId = map[arrayTags[index].name];
      if (templateId) {
        array.push({
          name: name,
          attribute: attribute,
          templateId: templateId
        })
      }
    }
  }

  batch.total = array.length;

  for (const data of array) {
    await batch.run(() =>
      kanka.createAttribute(
        data.templateId,
        {
          entity_id: data.templateId,
          name: data.name,
          value: data.attribute.value,
          type_id: data.attribute.type ? data.attribute.type : 1,
        },
      )
    );
  }
}
