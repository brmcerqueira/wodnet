import { EmbedPayload } from "./deps.ts";
import { RollResult, RollStatus } from "./diceRollManager.ts";
import { locale } from "./i18n/locale.ts";
import { colors } from "./utils.ts";
import { Chronicle } from "./chronicle.ts";

export async function buildRollMessage(
  chronicle: Chronicle,
  result: RollResult,
  authorId: string,
  title?: string,
): Promise<{ content: string; embed: EmbedPayload; }> {
  const embed: EmbedPayload = {};

  if (title) {
    embed.title = title;
  }

  const emojis = await chronicle.emojis();

  const content = result.dices.sort((left, right) =>
    right.isHunger == left.isHunger
      ? (right.value - left.value)
      : (right.isHunger ? 1 : -1)
  ).map((d) => {
    const emoji: { name: string, id: string } = { name: "", id: "" };
    if (d.isHunger) {
      if (d.value == 1) {
        emoji.name = "bestial";
        emoji.id = emojis.bestial;
      } else if (d.value == 10) {
        emoji.name = "messy";
        emoji.id = emojis.messy;
      } else if (d.value >= 6 && d.value <= 9) {
        emoji.name = "successRed";
        emoji.id = emojis.successRed;
      } else {
        emoji.name = "noneRed";
        emoji.id = emojis.noneRed;
      }
    } else {
      if (d.value == 10) {
        emoji.name = "critical";
        emoji.id = emojis.critical;
      } else if (d.value >= 6 && d.value <= 9) {
        emoji.name = "successBlack";
        emoji.id = emojis.successBlack;
      } else {
        emoji.name = "noneBlack";
        emoji.id = emojis.noneBlack;
      }
    }
    return printEmoji(emoji.name, emoji.id);
  }).join(" ");

  let statusLabel = "";

  switch (result.status) {
    case RollStatus.BestialFailure:
      statusLabel = locale.bestialFailure;
      embed.color = colors.red;
      break;
    case RollStatus.Failure:
      statusLabel = locale.failure;
      embed.color = colors.orange;
      break;
    case RollStatus.Success:
      statusLabel = locale.success;
      embed.color = colors.green;
      break;
    case RollStatus.RegularCritical:
      statusLabel = locale.regularCritical;
      embed.color = colors.blue;
      break;
    case RollStatus.MessyCritical:
      statusLabel = locale.messyCritical;
      embed.color = colors.purple;
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

function printEmoji(name: string, id: string): string {
  return `<:${name}:${id}>`;
}
