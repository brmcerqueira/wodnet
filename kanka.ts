import { config } from "./config.ts";
import { logger } from "./logger.ts";

export type KankaResult<T> = {
  data: T;
};

export type KankaSyncResult = {
  sync: Date;
};

export type KankaCharacterEntityRelated<T> = {
  id: number;
  name: string;
  attributes: KankaAttribute[];
  child: T;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
};

export type KankaTag = {
  id: number;
  name: string;
  entry: string;
  image: string;
  image_full: string;
  image_thumb: string;
  has_custom_image: boolean;
  is_private: boolean;
  entity_id: number;
  tags: number[];
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
  type: string;
  tag_id: number;
  colour: string;
  entities: number[];
  is_auto_applied: boolean;
  is_hidden: boolean;
};

export type KankaEntity = {
  id: number;
  name: string;
  type: string;
  child_id: number;
  tags: number[];
  is_private: boolean;
  campaign_id: number;
  is_attributes_private: boolean;
  tooltip: string;
  header_image: string;
  image_uuid: string;
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
  path: string,
  body?: any,
): Promise<T> {
  const fullpath =
    `https://api.kanka.io/1.0/campaigns/${config.campaignId}/${path}`;
  logger.info(
    "kanka-request: %v %v %v",
    method,
    fullpath,
    body ? JSON.stringify(body) : "",
  );
  const jsonResponse = await fetch(fullpath, {
    method: method,
    headers: {
      Authorization: `Bearer ${config.kankaToken}`,
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const jsonData = await jsonResponse.json();
  logger.debug("kanka-response: %v", JSON.stringify(jsonData));
  return jsonData;
}

export async function createNote(
  note: KankaNoteBody,
): Promise<KankaResult<KankaNote>> {
  return await go("POST", "notes", note);
}

export async function createTag(
  tag: KankaTagBody,
): Promise<KankaResult<KankaTag>> {
  return await go("POST", "tags", tag);
}

export async function createAttribute(
  entityId: number,
  attribute: KankaAttributeBody,
): Promise<KankaResult<KankaAttribute>> {
  return await go(
    "POST",
    `entities/${entityId}/attributes`,
    attribute,
  );
}

export async function updateNote(
  id: number,
  note: KankaNoteBody,
): Promise<KankaResult<KankaNote>> {
  return await go("PUT", `notes/${id}`, note);
}

export async function updateTag(
  id: number,
  tag: KankaTagBody,
): Promise<KankaResult<KankaTag>> {
  return await go("PUT", `tags/${id}`, tag);
}

export async function getNotesByName(
  name: string,
): Promise<KankaResult<KankaNote[]>> {
  return await go("GET", `notes/?name=${name}`);
}

export async function getTagsByName(
  name: string,
): Promise<KankaResult<KankaTag[]>> {
  return await go("GET", `tags/?name=${name}`);
}

export async function getTagsByType(
  type: string,
): Promise<KankaResult<KankaTag[]>> {
  return await go("GET", `tags/?type=${type}`);
}

export async function getCharacter(
  id: number,
): Promise<KankaResult<KankaCharacter>> {
  return await go("GET", `characters/${id}`);
}

export async function getEntity(
  id: number,
): Promise<KankaResult<KankaEntity>> {
  return await go("GET", `entities/${id}`);
}

export async function getEntityRelated(
  id: number,
): Promise<KankaResult<KankaCharacterEntityRelated<KankaCharacter>>> {
  return await go("GET", `entities/${id}?related=1`);
}

export async function getCharacterAttributes(
  id: number,
  date?: Date,
): Promise<KankaResult<KankaAttribute[]> & KankaSyncResult> {
  return await go(
    "GET",
    `entities/${id}/attributes${date ? `/?lastSync=${date.toISOString()}` : ""}`,
  );
}
