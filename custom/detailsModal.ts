import { CharacterKind } from "../character.ts";
import { TextInputStyle } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { buildCharacterUpdateSolver } from "../solver/buildCharacterUpdateSolver.ts";
import { modal, ModalFields, ModalInput, ModalOptions } from "./common.ts";

export const detailsModal = modal(
  async (interaction, chronicle): Promise<ModalOptions> => {
    const id = await chronicle.getOrCreateCharacterId(interaction.user.id);

    const character = await chronicle.getCharacter(id);

    const fields: ModalFields = {
      name: {
        label: locale.name,
        value: character.name != "" ? character.name : undefined,
        style: TextInputStyle.SHORT,
        minLength: 1,
        maxLength: 50,
        required: true,
      },
      player: {
        label: locale.player,
        value: character.player != "" ? character.player : undefined,
        style: TextInputStyle.SHORT,
        maxLength: 50,
        required: false,
      }
    };

    if (character.kind == CharacterKind.Vampire) {
      fields.ambition = {
        label: locale.ambition,
        value: character.ambition != "" ? character.ambition : undefined,
        style: TextInputStyle.PARAGRAPH,
        maxLength: 150,
        required: false,
      };
      fields.desire = {
        label: locale.desire,
        value: character.desire != "" ? character.desire : undefined,
        style: TextInputStyle.PARAGRAPH,
        maxLength: 150,
        required: false,
      };
    }

    fields.details = {
      label: locale.details,
      value: character.details != "" ? character.details : undefined,
      style: TextInputStyle.PARAGRAPH,
      maxLength: 1000,
      required: false,
    };

    return {
      title: locale.commands.detailsModal.title,
      fields
    };
  },
  buildCharacterUpdateSolver<
    ModalInput<
      {
        name: string;
        player?: string;
        ambition?: string;
        desire?: string;
        details?: string;
      }
    >
  >(
    (character, input) => {
      character.name = input.fields.name;

      if (input.fields.player) {
        character.player = input.fields.player;
      }

      if (input.fields.ambition) {
        character.ambition = input.fields.ambition;
      }

      if (input.fields.desire) {
        character.desire = input.fields.desire;
      }

      if (input.fields.details) {
        character.details = input.fields.details;
      }

      return 0;
    },
    false,
  ),
);
