import { config } from "./config.ts";

const host = `https://kanka.io/api/1.0/campaigns/${config.id}`;

const headersInit: HeadersInit = {
    Authorization: `Bearer ${config.token}`,
    "Content-type": "application/json"
}

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
    traits: [
        {
            id: number,
            name: string,
            entry: string,
            section: string,
            section_id: number,
            is_private: boolean,
            default_order: number
        }
    ]
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

export async function getCharacter(id: number): Promise<KankaCharacter> {
    const jsonResponse = await fetch(`${host}/characters/${id}`, {
        method: "GET",
        headers: headersInit
    });
    const jsonData: KankaResult<KankaCharacter> = await jsonResponse.json();
    console.log(jsonData);
    return jsonData.data;
}

export async function getCharacterAttributes(id: number): Promise<KankaAttribute[]> {
    const jsonResponse = await fetch(`${host}/entities/${id}/attributes`, {
        method: "GET",
        headers: headersInit
    });
    const jsonData: KankaResult<KankaAttribute[]> = await jsonResponse.json();
    console.log(jsonData);
    return jsonData.data;
}