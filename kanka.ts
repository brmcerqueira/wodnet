import { config } from "./config.ts";
import { logger } from "./logger.ts";

export type KankaResult<T> = {
  data: T;
};

export type KankaSyncResult = {
  sync: Date;
};

export type KankaTag = {
  id: number;
  name: string;
  entry: string,
  image: string,
  image_full: string,
  image_thumb: string,
  has_custom_image: boolean,
  is_private: boolean,
  entity_id: number,
  tags: number[],
  created_at: Date,
  created_by: number,
  updated_at: Date,
  updated_by: number,
  type: string,
  tag_id: number,
  colour: string,
  entities: number[],
  is_auto_applied: boolean,
  is_hidden: boolean
}

export type KankaEntity = {
  id: number;
  name: string;
  type: string,
  child_id: number,
  tags: number[];
  is_private: boolean;
  campaign_id: number,
  is_attributes_private: boolean,
  tooltip: string,
  header_image: string,
  image_uuid: string,
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
};

export type KankaCharacter = {
  id: number;
  name: string;
  entry: string;
  image: string;
  image_full: string;
  image_thumb: string;
  has_custom_image: boolean;
  is_private: boolean;
  is_personality_visible: boolean;
  is_template: boolean;
  entity_id: number;
  tags: number[];
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
  location_id: number;
  title: string;
  age: string;
  sex: string;
  pronouns: string;
  races: number[];
  type: string;
  family_id: number;
  families: number[];
  is_dead: boolean;
  traits: {
    id: number;
    name: string;
    entry: string;
    section: string;
    section_id: number;
    is_private: boolean;
    default_order: number;
  }[];
};

export type KankaAttributeBody = {
  name: string;
  entity_id: number;
  value?: string;
  default_order?: number;
  type_id?: number;
  is_private?: boolean;
  is_pinned?: boolean;
  api_key?: string;
};

export type KankaAttribute = {
  api_key: string;
  created_at: Date;
  created_by: number;
  default_order: number;
  entity_id: number;
  id: number;
  is_pinned: boolean;
  is_private: boolean;
  is_star: boolean;
  name: string;
  parsed: string;
  type: number;
  updated_at: Date;
  updated_by: number;
  value: string;
};

export type KankaNoteBody = {
  name: string;
  entry?: string;
  type?: string;
  note_id?: number;
  tags?: number[];
  image_url?: string;
  entity_image_uuid?: string;
  entity_header_uuid?: string;
  is_private?: boolean;
};

export type KankaTagBody = {
  name: string;
  entry?: string;
  type?: string;
  colour?: string;
  tag_id?: number;
  image_url?: string;
  entity_image_uuid?: string;
  entity_header_uuid?: string;
  is_private?: boolean;
  is_auto_applied?: boolean;
  is_hidden?: boolean;
};

export type KankaNote = {
  id: number;
  name: string;
  entry: string;
  image: string;
  image_full: string;
  image_thumb: string;
  has_custom_image: boolean;
  is_private: boolean;
  entity_id: number;
  note_id: number;
  tags: number[];
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
  type: string;
  is_pinned: number;
};

async function go<T>(
  method: string,
  campaignId: number,
  path: string,
  body?: any,
): Promise<T> {
  const fullpath = `https://kanka.io/api/1.0/campaigns/${campaignId}/${path}`;
  logger.info(`${method} ${fullpath}`);
  if (body) {
    logger.info(body);
  }
  const jsonResponse = await fetch(fullpath, {
    method: method,
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const jsonData = await jsonResponse.json();
  logger.info(jsonData);
  return jsonData;
}

export async function createNote(
  campaignId: number,
  note: KankaNoteBody,
): Promise<KankaResult<KankaNote>> {
  return await go("POST", campaignId, "notes", note);
}

export async function createTag(
  campaignId: number,
  tag: KankaTagBody,
): Promise<KankaResult<KankaTag>> {
  return await go("POST", campaignId, "tags", tag);
}

export async function createAttribute(
  campaignId: number,
  entityId: number,
  attribute: KankaAttributeBody,
): Promise<KankaResult<KankaAttribute>> {
  return await go("POST", campaignId, `entities/${entityId}/attributes`, attribute);
}

export async function updateNote(
  campaignId: number,
  id: number,
  note: KankaNoteBody,
): Promise<KankaResult<KankaNote>> {
  return await go("PUT", campaignId, `notes/${id}`, note);
}

export async function updateTag(
  campaignId: number,
  id: number,
  tag: KankaTagBody,
): Promise<KankaResult<KankaTag>> {
  return await go("PUT", campaignId, `tags/${id}`, tag);
}

export async function getNotesByName(
  campaignId: number,
  name: string,
): Promise<KankaResult<KankaNote[]>> {
  return await go("GET", campaignId, `notes/?name=${name}`);
}

export async function getTagsByName(
  campaignId: number,
  name: string,
): Promise<KankaResult<KankaTag[]>> {
  return await go("GET", campaignId,`tags/?name=${name}`);
}

export async function getTagsByType(
  campaignId: number,
  type: string,
): Promise<KankaResult<KankaTag[]>> {
  return await go("GET", campaignId,`tags/?type=${type}`);
}

export async function getCharacter(
  campaignId: number,
  id: number,
): Promise<KankaResult<KankaCharacter>> {
  return await go("GET", campaignId, `characters/${id}`);
}

export async function getEntity(
  campaignId: number,
  id: number,
): Promise<KankaResult<KankaEntity>> {
  return await go("GET", campaignId, `entities/${id}`);
}

export async function getCharacterAttributes(
  campaignId: number,
  id: number,
  date?: Date,
): Promise<KankaResult<KankaAttribute[]> & KankaSyncResult> {
  return await go(
    "GET",
    campaignId,
    `entities/${id}/attributes${date ? `/?sync=${date.toString()}` : ""}`,
  );
}
