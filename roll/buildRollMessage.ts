import { EmbedPayload, EmojiPayload } from "../deps.ts";
import { RollResult, RollStatus } from "./diceRollManager.ts";
import * as colors from "./colors.ts";
import { emojis } from "./data.ts";
import { locale } from "../i18n/locale.ts";

export function buildRollMessage(
  result: RollResult,
  guildId: string,
  authorId: string,
  title?: string,
): {
  content: string;
  embed: EmbedPayload;
} {
  const embed: EmbedPayload = {};

  if (title) {
    embed.title = title;
  }

  const content = result.dices.sort((left, right) =>
    right.isHunger == left.isHunger
      ? (right.value - left.value)
      : (right.isHunger ? 1 : -1)
  ).map((d) => {
    let emoji: EmojiPayload | null = null;
    if (d.isHunger) {
      if (d.value == 1) {
        emoji = emojis.bestial[guildId];
      } else if (d.value == 10) {
        emoji = emojis.messy[guildId];
      } else if (d.value >= 6 && d.value <= 9) {
        emoji = emojis.successRed[guildId];
      } else {
        emoji = emojis.noneRed[guildId];
      }
    } else {
      if (d.value == 10) {
        emoji = emojis.critical[guildId];
      } else if (d.value >= 6 && d.value <= 9) {
        emoji = emojis.successBlack[guildId];
      } else {
        emoji = emojis.noneBlack[guildId];
      }
    }
    return printEmoji(emoji!);
  }).join(" ");

  let statusLabel = "";

  switch (result.status) {
    case RollStatus.BestialFailure:
      statusLabel = locale.bestialFailure;
      embed.color = colors.Red;
      break;
    case RollStatus.Failure:
      statusLabel = locale.failure;
      embed.color = colors.Orange;
      break;
    case RollStatus.Success:
      statusLabel = locale.success;
      embed.color = colors.Green;
      break;
    case RollStatus.RegularCritical:
      statusLabel = locale.regularCritical;
      embed.color = colors.Blue;
      break;
    case RollStatus.MessyCritical:
      statusLabel = locale.messyCritical;
      embed.color = colors.Purple;
      break;
  }

  embed.fields = [{
    name: locale.dices,
    value: result.hunger > 0
      ? `${result.amount} / ${result.hunger}`
      : result.amount.toString(),
    inline: true,
  }, {
    name: locale.difficulty,
    value: result.difficulty.toString(),
    inline: true,
  }, {
    name: locale.successes,
    value: result.successes.toString(),
    inline: true,
  }, {
    name: locale.status,
    value: `**${statusLabel}**`,
    inline: true,
  }, {
    name: locale.player,
    value: `<@${authorId}>`,
    inline: true,
  }];

  if (result.modifier != 0) {
    embed.fields.splice(2, 0, {
      name: locale.modifier,
      value: result.modifier.toString(),
      inline: true,
    });
  }

  return { content, embed };
}

function printEmoji(emoji: EmojiPayload): string {
  return `<:${emoji.name}:${emoji.id}>`;
}
