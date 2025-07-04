import {
  ButtonComponent,
  ButtonStyle,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  MessageComponentType,
} from "../deps.ts";
import { colors } from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { locale } from "../i18n/locale.ts";
import {
  updateHealthButton,
  updateHungerButton,
  updateWillpowerButton,
} from "../custom/module.ts";
import { ButtonOptions } from "../custom/common.ts";

function buildDamageInteractionResponse(
  title: string,
  aggravated: boolean,
  button: (
    options: ButtonOptions,
    value: number,
    aggravated: boolean,
  ) => ButtonComponent,
): InteractionResponse {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: title,
      color: colors.gray,
    }],
    components: [{
      type: MessageComponentType.ACTION_ROW,
      components: [
        button(
          {
            label: "1️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -1,
          aggravated,
        ),
        button(
          {
            label: "2️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -2,
          aggravated,
        ),
        button(
          {
            label: "3️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -3,
          aggravated,
        ),
        button(
          {
            label: "4️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -4,
          aggravated,
        ),
        button(
          {
            label: "5️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -5,
          aggravated,
        ),
      ],
    }, {
      type: MessageComponentType.ACTION_ROW,
      components: [
        button(
          {
            label: "6️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -6,
          aggravated,
        ),
        button(
          {
            label: "7️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -7,
          aggravated,
        ),
        button(
          {
            label: "8️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -8,
          aggravated,
        ),
        button(
          {
            label: "9️⃣",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -9,
          aggravated,
        ),
        button(
          {
            label: "🔟",
            emoji: {
              name: "➖",
            },
            style: ButtonStyle.SUCCESS,
          },
          -10,
          aggravated,
        ),
      ],
    }, {
      type: MessageComponentType.ACTION_ROW,
      components: [
        button(
          {
            label: "1️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          1,
          aggravated,
        ),
        button(
          {
            label: "2️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          2,
          aggravated,
        ),
        button(
          {
            label: "3️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          3,
          aggravated,
        ),
        button(
          {
            label: "4️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          4,
          aggravated,
        ),
        button(
          {
            label: "5️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          5,
          aggravated,
        ),
      ],
    }, {
      type: MessageComponentType.ACTION_ROW,
      components: [
        button(
          {
            label: "6️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          6,
          aggravated,
        ),
        button(
          {
            label: "7️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          7,
          aggravated,
        ),
        button(
          {
            label: "8️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          8,
          aggravated,
        ),
        button(
          {
            label: "9️⃣",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          9,
          aggravated,
        ),
        button(
          {
            label: "🔟",
            emoji: {
              name: "➕",
            },
            style: ButtonStyle.DANGER,
          },
          10,
          aggravated,
        ),
      ],
    }],
  };
}

type DamageInput = {
  superficial?: boolean;
  aggravated?: boolean;
};

export async function panelSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    health?: DamageInput;
    willpower?: DamageInput;
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
    if (input.health.superficial) {
      await interaction.respond(
        buildDamageInteractionResponse(
          `${locale.health} - ${locale.damage.superficial}`,
          false,
          updateHealthButton,
        ),
      );
    } else if (input.health.aggravated) {
      await interaction.respond(
        buildDamageInteractionResponse(
          `${locale.health} - ${locale.damage.aggravated}`,
          true,
          updateHealthButton,
        ),
      );
    }
  } else if (input.willpower) {
    if (input.willpower.superficial) {
      await interaction.respond(
        buildDamageInteractionResponse(
          `${locale.willpower} - ${locale.damage.superficial}`,
          false,
          updateWillpowerButton,
        ),
      );
    } else if (input.willpower.aggravated) {
      await interaction.respond(
        buildDamageInteractionResponse(
          `${locale.willpower} - ${locale.damage.aggravated}`,
          true,
          updateWillpowerButton,
        ),
      );
    }
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
          updateHungerButton({
            label: "",
            emoji: {
              name: "1️⃣",
            },
          }, 1),
          updateHungerButton({
            label: "",
            emoji: {
              name: "2️⃣",
            },
          }, 2),
          updateHungerButton({
            label: "",
            emoji: {
              name: "3️⃣",
            },
          }, 3),
          updateHungerButton({
            label: "",
            emoji: {
              name: "4️⃣",
            },
          }, 4),
          updateHungerButton({
            label: "",
            emoji: {
              name: "5️⃣",
            },
          }, 5),
        ],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [
          updateHungerButton({
            label: "",
            emoji: {
              name: "0️⃣",
            },
          }, 0),
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
      image = input.macro.image;
    } else if (input.macro.character) {
      const character = await chronicle.getCharacter(
        input.macro.character.value,
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
