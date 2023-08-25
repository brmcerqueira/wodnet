import { config } from "./config.ts";
import { logger } from "./logger.ts";

export type KankaResult<T> = {
    data: T
}

export type KankaSyncResult = {
    sync: Date
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

async function go<T>(method: string, campaignId: number, path: string): Promise<T> {
    const fullpath = `https://kanka.io/api/1.0/campaigns/${campaignId}/${path}`; 
    logger.info(`${method} ${fullpath}`);
    const jsonResponse = await fetch(fullpath, {
        method: method,
        headers: {
            Authorization: `Bearer ${config.token}`,
            "Content-type": "application/json"
        }
    });
    const jsonData = await jsonResponse.json();
    logger.info(jsonData);
    return jsonData;
}

export async function getCharacter(campaignId: number, id: number): Promise<KankaResult<KankaCharacter>> {
    return await go("GET", campaignId, `characters/${id}`);
}

export async function getCharacterAttributes(campaignId: number, id: number, date?: Date): Promise<KankaResult<KankaAttribute[]> & KankaSyncResult> {
    return await go("GET", campaignId, `entities/${id}/attributes${date ? `/?lastSync=${date.toString()}` : ""}`);
}