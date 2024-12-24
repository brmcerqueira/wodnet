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
    link?: boolean;
    button?: boolean;
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

export const selectButton: (options: ButtonOptions, id: string, link: boolean) => ButtonComponent = button<CharacterSolverInput>(
  (array) => {
    return {
      choose: {
        character: {
          value: array[0],
          focused: false,
        },
        link: array[1] === "true",
        button: true,
      },
    };
  },
  characterSolver
);
