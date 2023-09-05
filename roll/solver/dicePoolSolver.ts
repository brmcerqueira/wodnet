import { Interaction, InteractionResponseType } from "../../deps.ts";
import { getByDiscordId, getFromCache } from "../../characterManager.ts";
import { config } from "../../config.ts";
import { sendRoll } from "../sendRoll.ts";
import { LocaleType } from "../../i18n/localeType.ts";
import * as data from "../data.ts";
import { Character } from "../../character.ts";
import { locale } from "../../i18n/locale.ts";

type AttributeType =
  | keyof LocaleType["attributes"]["physical"]
  | keyof LocaleType["attributes"]["social"]
  | keyof LocaleType["attributes"]["mental"];

export async function dicePoolSolver(
  interaction: Interaction,
  values: {
    attribute: AttributeType;
    secondaryAttribute?: AttributeType;
    skillPhysical?: keyof LocaleType["skills"]["physical"];
    skillSocial?: keyof LocaleType["skills"]["social"];
    skillMental?: keyof LocaleType["skills"]["mental"];
    discipline?: Exclude<keyof LocaleType["disciplines"], "name">;
  },
) {
  const character = config.storytellerId == interaction.user.id
    ? (data.currentCharacter ? getFromCache(data.currentCharacter!) : undefined)
    : getByDiscordId(interaction.user.id);
  if (character) {
    const description: string[] = [];

    let dices = getAttributeValue(character, values.attribute, description);
    
    if (values.secondaryAttribute) {
      dices += getAttributeValue(character, values.secondaryAttribute, description);
    }

    if (values.skillPhysical) {
      description.push(locale.skills.physical[values.skillPhysical]);
      dices += character.skills.physical[values.skillPhysical];
    }

    if (values.skillSocial) {
      description.push(locale.skills.social[values.skillSocial]);
      dices += character.skills.social[values.skillSocial];
    }

    if (values.skillMental) {
      description.push(locale.skills.mental[values.skillMental]);
      dices += character.skills.mental[values.skillMental];
    }

    if (values.discipline) {
      description.push((locale.disciplines[values.discipline] as any).name);
      dices += character.disciplines[values.discipline]?.length || 0;
    }

    await sendRoll(
      async (m) => {
        await interaction.respond({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          content: m.content,
          embeds: m.embeds,
          components: m.components,
        });
      },
      interaction.guild!.id,
      interaction.user.id,
      dices,
      character.hunger,
      1,
      0,
      description.join(" + "),
    );
  }
}

function getAttributeValue(character: Character, attribute: AttributeType, description: string[]): number {
  switch(attribute) {
    case "strength":
    case "dexterity":
    case "stamina":
      description.push(locale.attributes.physical[attribute]);
      return character.attributes.physical[attribute];
    case "charisma":
    case "manipulation":
    case "composure":
      description.push(locale.attributes.social[attribute]);
      return character.attributes.social[attribute];
    case "intelligence":
    case "wits":
    case "resolve":
      description.push(locale.attributes.mental[attribute]);
      return character.attributes.mental[attribute];
  }
}
