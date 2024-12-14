import {
  Interaction,
  InteractionModalSubmitData,
  InteractionResponseType,
  MessageComponentType,
  TextInputStyle,
} from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import {
  buildCharacterSolver,
  getOrBuildCharacterId,
} from "./buildCharacterSolver.ts";
import { Chronicle } from "../chronicle.ts";
import { Character } from "../character.ts";

const characterSolver = buildCharacterSolver<InteractionModalSubmitData>(
  (character, input) => {
    for (const row of input.components) {
      const textInput = row.components[0];

      character[
        textInput.custom_id as Extract<
          keyof Character,
          "name" | "player" | "ambition" | "desire" | "details"
        >
      ] = textInput.value;
    }
    return 0;
  },
);

export async function editModalSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input?: InteractionModalSubmitData,
) {
  if (input) {
    await characterSolver(interaction, chronicle, input);
  } else {
    const id = await getOrBuildCharacterId(interaction, chronicle);

    const character = await chronicle.getCharacter(id);

    await interaction.respond({
      type: InteractionResponseType.MODAL,
      customID: "edit",
      title: locale.commands.editModal.title,
      components: [{
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.name,
          value: character.name != "" ? character.name : undefined,
          style: TextInputStyle.SHORT,
          minLength: 1,
          maxLength: 50,
          required: true,
          customID: "name",
        }],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.player,
          value: character.player != "" ? character.player : undefined,
          style: TextInputStyle.SHORT,
          maxLength: 50,
          required: false,
          customID: "player",
        }],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.ambition,
          value: character.ambition != "" ? character.ambition : undefined,
          style: TextInputStyle.PARAGRAPH,
          maxLength: 150,
          required: false,
          customID: "ambition",
        }],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.desire,
          value: character.desire != "" ? character.desire : undefined,
          style: TextInputStyle.PARAGRAPH,
          maxLength: 150,
          required: false,
          customID: "desire",
        }],
      }, {
        type: MessageComponentType.ACTION_ROW,
        components: [{
          type: MessageComponentType.TEXT_INPUT,
          label: locale.details,
          value: character.details != "" ? character.details : undefined,
          style: TextInputStyle.PARAGRAPH,
          maxLength: 1000,
          required: false,
          customID: "details",
        }],
      }],
    });
  }
}
