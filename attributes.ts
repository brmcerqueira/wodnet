import { Character } from "./character.ts";
import { locale } from "./i18n/locale.ts";

export const attributes: {
    [name: string]: {
        parse: (character: Character, value: string) => void,
        value?: string
    }
} = {};

attributes[`${locale.clan}[range:${locale.clanOptions.join(',')}]`] = {
    parse: (c, v) => c.clan = v
}  