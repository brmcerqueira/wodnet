import { EmbedPayload, EmojiPayload } from "../deps.ts";
import { RollResult } from "./diceRollManager.ts";

type EmojiDictionary = {
  [guildId: string]: EmojiPayload;
};

export const emojis: {
  bestial: EmojiDictionary;
  critical: EmojiDictionary;
  messy: EmojiDictionary;
  noneBlack: EmojiDictionary;
  noneRed: EmojiDictionary;
  successBlack: EmojiDictionary;
  successRed: EmojiDictionary;
} = {
  bestial: {},
  critical: {},
  messy: {},
  noneBlack: {},
  noneRed: {},
  successBlack: {},
  successRed: {},
};

export const lastRolls: {
  [userId: string]: {
    embed: EmbedPayload;
    result: RollResult;
  };
} = {};

export let difficulty: number | null = null;

export function setDifficulty(value: number | null) {
  difficulty = value;
}

export let modifier: number | null = null;

export function setModifier(value: number | null) {
  modifier = value;
}

export let currentCharacter: number | null = null;

export function setCurrentCharacter(value: number | null) {
  currentCharacter = value;
}