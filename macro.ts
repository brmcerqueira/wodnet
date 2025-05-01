// deno-lint-ignore-file no-explicit-any
import { ActionResult, Character } from "./character.ts";
import { ButtonStyle, MessagePayload } from "./deps.ts";

export type MacroButton = {
  label?: string;
  style?: ButtonStyle;
  emoji?: {
    id: string
    name: string
  } | string;
  value?: any
};

export type Macro = {
  message: MessagePayload;
  buttons?: MacroButton[];
  code?: string;
  transpiled?: string;
};

export type MacroFunction = (
  character: Character,
  result: ActionResult,
  button: any,
) => void;

export function macroFunction(code: string): MacroFunction {
  return new Function(
    "character",
    "result",
    "button",
    code,
  ) as MacroFunction;
}