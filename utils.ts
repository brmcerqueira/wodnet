// deno-lint-ignore-file no-explicit-any
import { CHAR_0 } from "https://deno.land/std@0.224.0/path/_common/constants.ts";
import { config } from "./config.ts";
import { EmojiPayload } from "./deps.ts";

export const separator = "^";

export const colors = {
  red: 15158332,
  green: 3066993,
  gray: 9807270,
  orange: 15105570,
  blue: 3447003,
  purple: 10181046,
};

export const emojis: { [key: string]: EmojiPayload | null } = {
  bestial: null,
  critical: null,
  messy: null,
  noneBlack: null,
  noneRed: null,
  successBlack: null,
  successRed: null,
};

export class InteractionResponseError extends Error {}

export function keys<T extends object>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
}

export function treatPower(text: string): { name: string; value: number } {
  const index = text.lastIndexOf("●") + 1;
  return {
    name: text.substring(index).trimStart(),
    value: text.substring(0, index).replaceAll(/\s/g,"").length,
  };
}

export async function uploadImage(url: string): Promise<string> {
  const body = new FormData();

  body.set("image", url);  

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Authorization: Client-ID ${config.imgurClientId}`
    },
    body
  });

  const json: { data: { link: string; }; } = await response.json();

  return json.data.link;
}

export function jsonRelaxedKeysParse<T>(json: string): T {
  return JSON.parse(
    json.replace(/([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"'),
  );
}

export function jsonRelaxedKeysStringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
  return JSON.stringify(value, replacer, space).replace(/"([^"]+)":/g, "$1:");
}

