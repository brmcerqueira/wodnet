import { config } from "./config.ts";
import { logger } from "./logger.ts";

export type KankaResult<T> = {
    data: T
}

export type KankaCharacter = {
    id: number,
    name: string,
    entry: string,
    image: string,
    image_full: string,
    image_thumb: string,
    has_custom_image: boolean,
    is_private: boolean,
    is_personality_visible: boolean,
    is_template: boolean,
    entity_id: number,
    tags: string[],
    created_at: Date,
    created_by: number,
    updated_at: Date,
    updated_by: number,
    location_id: number,
    title: string,
    age: string,
    sex: string,
    pronouns: string,
    races: number[],
    type: string,
    family_id: number,
    families: number[],
    is_dead: boolean,
    traits: {
        id: number,
        name: string,
        entry: string,
        section: string,
        section_id: number,
        is_private: boolean,
        default_order: number
    }[]
}

export type KankaAttribute = {
    api_key: string,
    created_at: Date,
    created_by: number,
    default_order: number,
    entity_id: number,
    id: number,
    is_pinned: boolean,
    is_private: boolean,
    is_star: boolean,
    name: string,
    parsed: string,
    type: number,
    updated_at: Date,
    updated_by: number,
    value: string
}

async function go<T>(method: string, path: string): Promise<T> {
    const jsonResponse = await fetch(`https://kanka.io/api/1.0/campaigns/${config.id}/${path}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${config.token}`,
            "Content-type": "application/json"
        }
    });
    const jsonData: KankaResult<T> = await jsonResponse.json();
    logger.info(jsonData);
    return jsonData.data;
}

export async function getCharacter(id: number): Promise<KankaCharacter> {
    return await go("GET", `characters/${id}`);
}

export async function getCharacterAttributes(id: number): Promise<KankaAttribute[]> {
    return await go("GET", `entities/${id}/attributes`);
}