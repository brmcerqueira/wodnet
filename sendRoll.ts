import { roll } from "./diceRollManager.ts";
import {
  ButtonStyle,
  Embed,
  EmbedPayload,
  MessageComponentData,
  MessageComponentType,
} from "./deps.ts";
import { buildRollMessage } from "./buildRollMessage.ts";
import { Chronicle } from "./chronicle.ts";
import { Character } from "./character.ts";

export type SendRollData = {
  content: string;
  embeds: Array<Embed | EmbedPayload>;
  components?: MessageComponentData[];
};

export async function sendRoll(
  chronicle: Chronicle,
  send: (data: SendRollData) => Promise<void>,
  authorId: string,
  dices: number,
  hunger: number,
  difficulty: number,
  modifier: number,
  description?: string,
  character?: Character
): Promise<void> {
  const chronicleDifficulty = await chronicle.difficulty();

  if (chronicleDifficulty) {
    difficulty = chronicleDifficulty;
  }

  const chronicleModifier = await chronicle.modifier();

  if (chronicleModifier) {
    modifier += chronicleModifier;
  }

  dices += modifier;

  const result = roll(dices, hunger, difficulty, modifier);

  const margin = dices - hunger;

  const message = await buildRollMessage(result, authorId, description, character);

  const options: SendRollData = {
    content: message.content,
    embeds: [message.embed],
  };

  if (margin > 0) {

    const buttons: MessageComponentData[] = [{
      type: MessageComponentType.Button,
      label: "",
      emoji: {
        name: "1️⃣",
      },
      style: ButtonStyle.SECONDARY,
      customID: "1",
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
        customID: "2",
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
        customID: "3",
      });
    }
  }

  await chronicle.setLastRoll(character ? character.id : authorId, {
    embed: message.embed,
    result: result,
  });

  await send(options);
}