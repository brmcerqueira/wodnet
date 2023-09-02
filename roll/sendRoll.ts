import { roll } from "./diceRollManager.ts";
import {
  ButtonStyle,
  Embed,
  EmbedPayload,
  MessageComponentData,
  MessageComponentType,
} from "../deps.ts";
import { buildId, ReRoll } from "./scope.ts";
import { buildRollMessage } from "./buildRollMessage.ts";
import * as data from "./data.ts";

export type SendRollData = {
  content: string;
  embeds: Array<Embed | EmbedPayload>;
  components?: MessageComponentData[];
};

export async function sendRoll(
  send: (data: SendRollData) => Promise<void>,
  guildId: string,
  authorId: string,
  dices: number,
  hunger: number,
  difficulty: number,
  modifier: number,
  description: string | undefined,
): Promise<void> {
  if (data.difficulty) {
    difficulty = data.difficulty;
    data.setDifficulty(null);
  }

  if (data.modifier) {
    modifier += data.modifier;
    data.setModifier(null);
  }

  dices += modifier;

  const result = roll(dices, hunger, difficulty, modifier);

  const margin = dices - hunger;

  const message = buildRollMessage(result, guildId, authorId, description);

  const options: SendRollData = {
    content: message.content,
    embeds: [message.embed],
  };

  if (margin > 0) {
    const scopes = [ReRoll];

    const buttons: MessageComponentData[] = [{
      type: MessageComponentType.Button,
      label: "",
      emoji: {
        name: "1️⃣",
      },
      style: ButtonStyle.SECONDARY,
      customID: buildId(1, ...scopes),
    }];

    options.components = [{
      type: MessageComponentType.ActionRow,
      components: buttons,
    }];

    if (margin >= 2) {
      buttons.push({
        type: MessageComponentType.Button,
        label: "",
        emoji: {
          name: "2️⃣",
        },
        style: ButtonStyle.SECONDARY,
        customID: buildId(2, ...scopes),
      });
    }

    if (margin >= 3) {
      buttons.push({
        type: MessageComponentType.Button,
        label: "",
        emoji: {
          name: "3️⃣",
        },
        style: ButtonStyle.SECONDARY,
        customID: buildId(3, ...scopes),
      });
    }
  }

  await send(options);

  data.lastRolls[authorId.toString()] = {
    embed: message.embed,
    result: result,
  };
}
