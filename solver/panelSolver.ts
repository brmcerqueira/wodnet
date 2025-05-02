import {
ButtonStyle,
  Interaction,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { colors, uploadImage } from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { locale } from "../i18n/locale.ts";
import { updateNumberFieldButton, UpdateNumberFieldButtonKind } from "../custom/module.ts";

export async function panelSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    health?: boolean;
    willpower?: boolean;
    hunger?: boolean;
    macro?: {
      title?: string;
      description?: string;
      character?: {
        value: string;
        focused: boolean;
      };
      image?: { url: string };
      thumbnail?: boolean;
    };
  },
) {
  if (input.health) {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.health,
        color: colors.gray,
      }],
    });
  } else if (input.willpower) {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.willpower,
        color: colors.gray,
      }],
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateNumberFieldButton({
            label: "1️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -1, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "2️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -2, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "3️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -3, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "4️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -4, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "5️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -5, UpdateNumberFieldButtonKind.Willpower),
        ],
      },{
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateNumberFieldButton({
            label: "6️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -6, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "7️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -7, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "8️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -8, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "9️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -9, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "🔟",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS
          }, -10, UpdateNumberFieldButtonKind.Willpower),
        ],
      },{
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateNumberFieldButton({
            label: "1️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 1, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "2️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 2, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "3️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 3, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "4️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 4, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "5️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 5, UpdateNumberFieldButtonKind.Willpower),
        ],
      },{
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateNumberFieldButton({
            label: "6️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 6, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "7️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 7, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "8️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 8, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "9️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 9, UpdateNumberFieldButtonKind.Willpower),
          updateNumberFieldButton({
            label: "🔟",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER
          }, 10, UpdateNumberFieldButtonKind.Willpower),
        ],
      }],
    });
  } else if (input.hunger) {
    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: locale.hunger,
        color: colors.gray,
      }],
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateNumberFieldButton({
            label: "",
            emoji: {
              name: "1️⃣",
            },
          }, 1, UpdateNumberFieldButtonKind.Hunger),
          updateNumberFieldButton({
            label: "",
            emoji: {
              name: "2️⃣",
            },
          }, 2, UpdateNumberFieldButtonKind.Hunger),
          updateNumberFieldButton({
            label: "",
            emoji: {
              name: "3️⃣",
            },
          }, 3, UpdateNumberFieldButtonKind.Hunger),
          updateNumberFieldButton({
            label: "",
            emoji: {
              name: "4️⃣",
            },
          }, 4, UpdateNumberFieldButtonKind.Hunger),
          updateNumberFieldButton({
            label: "",
            emoji: {
              name: "5️⃣",
            },
          }, 5, UpdateNumberFieldButtonKind.Hunger),
        ],
      }],
    });
  } else if (input.macro) {
    if (input.macro.character && input.macro.character.focused) {
      await interaction.respond({
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        choices: await chronicle.getCharacterChoicesByTerm(
          input.macro.character.value,
        ),
      });

      return;
    }

    let image: { url: string } | undefined;

    if (input.macro.image) {
      image = {
        url: await uploadImage(input.macro.image.url),
      };
    } else if (input.macro.character) {
      const character = await chronicle.getCharacter(
        input.macro.character.value,
        true,
      );
      image = {
        url: character.image,
      };
    }

    await interaction.respond({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      embeds: [{
        title: input.macro.title,
        description: input.macro.description,
        color: colors.gray,
        image: image && !input.macro.thumbnail ? image : undefined,
        thumbnail: image && input.macro.thumbnail ? image : undefined,
      }],
    });
  }
}
