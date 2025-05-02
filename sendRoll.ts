import { roll } from "./diceRollManager.ts";
import {
  ButtonStyle,
  Interaction,
  InteractionResponseType,
  MessageComponentData,
  MessageComponentType,
} from "./deps.ts";
import { buildRollMessage } from "./buildRollMessage.ts";
import { Chronicle } from "./repository.ts";
import { Character } from "./character.ts";
import { reRollButton } from "./custom/module.ts";
import { colors } from "./utils.ts";
import { locale } from "./i18n/locale.ts";

export async function sendRoll(
  interaction: Interaction,
  chronicle: Chronicle,
  dices: number,
  hunger: number,
  difficulty: number,
  modifier: number,
  description?: string,
  character?: Character,
): Promise<void> {
  const authorId = interaction.user.id;

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

  const message = await buildRollMessage(
    result,
    authorId,
    description,
    character,
  );

  let components: MessageComponentData[] | undefined;

  if (margin > 0) {
    const buttons: MessageComponentData[] = [
      reRollButton({
        label: "",
        emoji: {
          name: "1️⃣",
        },
        style: ButtonStyle.SECONDARY,
      }, 1),
    ];

    if (margin >= 2) {
      buttons.push(reRollButton({
        label: "",
        emoji: {
          name: "2️⃣",
        },
        style: ButtonStyle.SECONDARY,
      }, 2));
    }

    if (margin >= 3) {
      buttons.push(reRollButton({
        label: "",
        emoji: {
          name: "3️⃣",
        },
        style: ButtonStyle.SECONDARY,
      }, 3));
    }

    components = [{
      type: MessageComponentType.ActionRow,
      components: buttons,
    }];
  }

  await chronicle.setLastRoll(character ? character.id : authorId, {
    content: message.content,
    result: result,
  });

  const channelId = await chronicle.rollChannel();

  if (
    channelId && interaction.channel && interaction.channel.id !== channelId
  ) {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.rollExecuted,
        color: colors.green,
      }],
      ephemeral: true,
    });

    interaction.client.channels.sendMessage(channelId, {
      content: message.content,
      embeds: [message.embed],
      components,
    });
  } else {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      content: message.content,
      embeds: [message.embed],
      components,
    });
  }
}
