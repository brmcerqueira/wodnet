import { Interaction, InteractionResponseType } from "../deps.ts";
import { Chronicle, getMacro } from "../repository.ts";
import { MacroButtonInput } from "../custom/module.ts";
import { sendRoll } from "../sendRoll.ts";
import { macroFunction } from "../macroTranspiler.ts";
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

  const macro = (await getMacro(input.messageId))!;

  if (!macro.transpiled) {
    throw new InteractionResponseError(locale.unauthorized);
  }

  const action = macroFunction(macro.transpiled);

  const result: ActionResult = {
    dices: 0,
    difficulty: 0,
    modifier: 0,
  };

  action(character, result, input.index);
  
  await sendRoll(
    chronicle,
    async (m) => {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        content: m.content,
        embeds: m.embeds,
        components: m.components,
      });
    },
    interaction.user.id,
    result.dices,
    character.hunger,
    result.difficulty,
    result.modifier,
    macro.buttons![input.index],
    character,
  );
}
