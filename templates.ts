import { attributes } from "./attributes.ts";
import { delay } from "./deps.ts";
import { logger } from "./logger.ts";
import * as kanka from "./kanka.ts";

let percent = 0;

export function setup(
  campaignId: number,
): number {
  if (percent == 0) {
    /*TODO templateId */
    buildTemplate(campaignId, 0);
  }

  return percent;
}

async function buildTemplate(campaignId: number, templateId: number) {
  const total = Object.keys(attributes).length;
  let current = 1;
  for (const name in attributes) {
    const attribute = attributes[name];
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
