import { Interaction } from "../deps.ts";
import { Chronicle } from "../repository.ts";
import { MacroButtonInput } from "../custom/module.ts";
import { sendRoll } from "../sendRoll.ts";
import { macroFunction } from "../transpile.ts";
import { ActionResult } from "../character.ts";
import { InteractionResponseError } from "../utils.ts";
import { locale } from "../i18n/locale.ts";

export async function macroSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: MacroButtonInput,
) {
  const character = await chronicle.getCharacterByUserId(interaction.user.id);

  if (!character) {
    throw new InteractionResponseError(locale.notFound);
  }

  const macro = (await chronicle.macro(input.messageId))!;

  if (!macro.transpiled) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  const action = macroFunction(macro.transpiled);

  const result: ActionResult = {
    dices: 0,
    difficulty: 0,
    modifier: 0,
  };

  const button = macro.buttons![input.index];

  action(structuredClone(character), result, button.value || input.index);
  
  let description = "";

  if (button.emoji) {
    if (typeof button.emoji === "string") {
      description += button.emoji;
    }
    else {
      description += `<:${button.emoji.name}:${button.emoji.id}>`;
    }

    description += " ";
  }

  if (button.label) {
    description += button.label;
  }

  await sendRoll(
    interaction,
    chronicle,
    result.dices,
    character.hunger,
    result.difficulty,
    result.modifier,
    description,
    character,
  );
}
