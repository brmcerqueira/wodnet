import { config } from "./config.ts";
import { Interaction } from "./deps.ts";
import { locale } from "./i18n/locale.ts";

export const colors = {
    red: 15158332,
    green: 3066993,
    gray: 9807270,
    orange: 15105570,
    blue: 3447003,
    purple: 10181046
}

export class InteractionResponseError extends Error {}

export function keys<T extends object>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[];
}

export function treatDiscipline(text: string): { name: string, value: number } {
    const index = text.lastIndexOf("●") + 1;
    return {
        name: text.substring(index).trimStart(),
        value: index
    }
}
export function isStoryteller(
    interaction: Interaction,
  ): boolean {
    const result = interaction.user.id == config.storytellerId;
    if (!result) {
      throw new InteractionResponseError(locale.unauthorized);
    }
    return result;
  }
  