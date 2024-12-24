import { config } from "./config.ts";
import {
  ButtonComponent,
  ButtonStyle,
  encodeBase64Url,
  MessageComponentEmoji,
  MessageComponentType,
} from "./deps.ts";
import { locale } from "./i18n/locale.ts";

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

export type ButtonOptions = {
  label: string;
  style?: ButtonStyle;
  emoji?: MessageComponentEmoji;
};

const separator = "^";
let index = 1;

function button(
  parse: (data: any[]) => any,
): {
  build: (options: ButtonOptions, ...data: any[]) => ButtonComponent;
  extract: (text: string) => any | null;
} {
  const id = index++;
  return {
    build(options: ButtonOptions, ...data: any[]): ButtonComponent {
      return {
        type: MessageComponentType.BUTTON,
        label: options.label,
        style: options.style || ButtonStyle.GREEN,
        emoji: options.emoji,
        customID: [id, ...data].join(separator),
      };
    },
    extract(text: string): any | null {
      let result: any | null = null;

      const array = text.split(separator);

      if (array.length > 0 && parseInt(array[0]) == id) {
        result = parse(
          array.slice(1).map((value) => {
            if (!isNaN(Number(value))) {
              return Number(value);
            }

            if (value === "true") {
              return true;
            }

            if (value === "false") {
              return false;
            }

            if (value === "null") {
              return null;
            }

            return value;
          }),
        );
      }

      return result;
    },
  };
}

export function characterLinkButton(
  chronicleId: string,
  id: string,
): ButtonComponent {
  return {
    type: MessageComponentType.BUTTON,
    label: locale.open,
    style: ButtonStyle.LINK,
    url: `${config.host}/dark?chronicleId=${encodeBase64Url(chronicleId)}&id=${
      encodeBase64Url(id)
    }`,
  };
}

export const reRollButton: {
  build: (options: ButtonOptions, value: number) => ButtonComponent;
  extract: (text: string) => number | null;
} = button(
  (array) => array[1],
);

export const selectButton: {
  build: (options: ButtonOptions, id: string, link: boolean) => ButtonComponent;
  extract: (text: string) => CharacterSolverInput | null;
} = button(
  (array) => {
    return {
      choose: {
        character: {
          value: array[0],
          focused: false,
        },
        link: array[1],
        button: true,
      },
    };
  },
);
