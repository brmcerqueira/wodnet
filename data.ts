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