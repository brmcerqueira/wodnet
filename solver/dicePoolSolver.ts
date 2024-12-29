import { Interaction } from "../deps.ts";
import { sendRoll } from "../sendRoll.ts";
import { LocaleType } from "../i18n/localeType.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { Chronicle } from "../repository.ts";
import { InteractionResponseError } from "../utils.ts";

type AttributeType =
  | keyof LocaleType["attributes"]["physical"]
  | keyof LocaleType["attributes"]["social"]
  | keyof LocaleType["attributes"]["mental"];

export async function dicePoolSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  values: {
    attribute: AttributeType;
    secondaryAttribute?: AttributeType;
    skillPhysical?: keyof LocaleType["skills"]["physical"];
    skillSocial?: keyof LocaleType["skills"]["social"];
    skillMental?: keyof LocaleType["skills"]["mental"];
    discipline?: Exclude<keyof LocaleType["disciplines"], "name">;
  },
) {
  const character = await chronicle.getCharacterByUserId(interaction.user.id);

  if (!character) {
    throw new InteractionResponseError(locale.notFound);
  }

  const description: string[] = [];

  let dices = getAttributeValue(character, values.attribute, description);

  if (values.secondaryAttribute) {
    dices += getAttributeValue(
      character,
      values.secondaryAttribute,
      description,
    );
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
    interaction,
    chronicle,
    dices,
    character.hunger,
    1,
    0,
    description.join(" + "),
    character,
  );
}

function getAttributeValue(
  character: Character,
  attribute: AttributeType,
  description: string[],
): number {
  switch (attribute) {
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
