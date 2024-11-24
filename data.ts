type EmojiDictionary = {
  [guildId: string]: {
    id: string,
    name: string
  };
};

export type Emojis = {
  bestial: EmojiDictionary;
  critical: EmojiDictionary;
  messy: EmojiDictionary;
  noneBlack: EmojiDictionary;
  noneRed: EmojiDictionary;
  successBlack: EmojiDictionary;
  successRed: EmojiDictionary;
}

export const emojis: Emojis = {
  bestial: {},
  critical: {},
  messy: {},
  noneBlack: {},
  noneRed: {},
  successBlack: {},
  successRed: {},
};

export let difficulty: number | null = null;

export function setDifficulty(value: number | null) {
  difficulty = value;
}

export let modifier: number | null = null;

export function setModifier(value: number | null) {
  modifier = value;
}

export let currentCharacter: string | null = null;

export function setCurrentCharacter(value: string | null) {
  currentCharacter = value;
}