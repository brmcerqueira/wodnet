import { Interaction, InteractionResponseType } from "../deps.ts";
import { colors, uploadImage } from "../utils.ts";
import { Chronicle } from "../repository.ts";

export async function panelSolver(
  interaction: Interaction,
  chronicle: Chronicle,
  input: {
    title?: string;
    description?: string;
    character?: {
      value: string;
      focused: boolean;
    };
    image?: { url: string };
    thumbnail?: boolean;
  },
) {
  if (input.character && input.character.focused) {
    await interaction.respond({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      choices: await chronicle.getCharacterChoicesByTerm(
        input.character.value,
      ),
    });

    return;
  }

  let image : { url: string } | undefined;

  if (input.image) {
    image = {
      url: await uploadImage(input.image.url)
    };    
  }
  else if (input.character) {
    const character = await chronicle.getCharacter(input.character.value, true);
    image = {
      url: character.image
    }; 
  }

  await interaction.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    embeds: [{
      title: input.title,
      description: input.description,
      color: colors.gray,
      image: image && !input.thumbnail ? image : undefined,
      thumbnail: image && input.thumbnail ? image : undefined,
    }],
  });
}
