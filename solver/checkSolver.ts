import { EmbedField, Interaction, InteractionResponseType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { colors, InteractionResponseError } from "../utils.ts";
import { Chronicle } from "../repository.ts";
import { check } from "../diceRollManager.ts";

export async function checkSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input?: { dices: number },
) {
  const character = await chronicle.getCharacterByUserId(interaction.user.id);

  if (!character) {
    throw new InteractionResponseError(locale.notFound);
  }

  const fields: EmbedField[] = [{
    name: locale.character,
    value: character.name,
    inline: true,
  }];

  const failed = !check(input?.dices || 1);

  if (failed) {
    character.hungerOrRage += 1;
    await chronicle.updateCharacter(character);
    fields.push({
      name: locale.hunger,
      value: `**${character.hungerOrRage}**`,
      inline: true,
    });
  }

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: failed ? locale.characterCheckFailed : locale.characterCheck,
      thumbnail: {
        url: character.image,
      },
      color: failed ? colors.red : colors.green,
      fields,
    }],
  });
}
