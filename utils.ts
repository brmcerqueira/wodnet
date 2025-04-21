// deno-lint-ignore-file no-explicit-any
import { config } from "./config.ts";
import { EmojiPayload } from "./deps.ts";

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

export function treatDiscipline(text: string): { name: string; value: number } {
  const index = text.lastIndexOf("●") + 1;
  return {
    name: text.substring(index).trimStart(),
    value: index,
  };
}

export async function uploadImage(url: string): Promise<string> {
  const body = new FormData();

  body.set("image", url);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${config.imgbbKey}`, {
    method: "POST",
    body
  });

  const json: { data: { url: string; }; } = await response.json();

  return json.data.url;
}

export function jsonRelaxedKeysParse<T>(json: string): T {
  return JSON.parse(
    json.replace(/([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"'),
  );
}

export function jsonRelaxedKeysStringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
  return JSON.stringify(value, replacer, space).replace(/"([^"]+)":/g, "$1:");
}
