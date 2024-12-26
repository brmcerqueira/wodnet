import { ButtonComponent } from "../deps.ts";
import { characterSolver } from "../solver/characterSolver.ts";
import { button, ButtonOptions } from "./common.ts";

type CharacterAutocompleteInput = {
  value: string;
  focused: boolean;
};

export type CharacterSolverInput = {
  choose?: {
    character: CharacterAutocompleteInput;
    buttons?: boolean;
    isSelect?: boolean;
  };
  mode?: {
    character?: CharacterAutocompleteInput;
    value: string;
  };
  remove?: {
    character: CharacterAutocompleteInput;
  };
  clear?: boolean;
};

export const selectButton: (options: ButtonOptions, id: string) => ButtonComponent = button<CharacterSolverInput>(
  (context) => {
    return {
      choose: {
        character: {
          value: context[0],
          focused: false,
        },
        buttons: true,
        isSelect: true,
      },
    };
  },
  characterSolver
);
