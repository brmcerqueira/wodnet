import { Interaction, InteractionResponseType, MessageAttachment } from "../deps.ts";
import { Chronicle } from "../repository.ts";

export async function imageUpdateSolver(
    interaction: Interaction,
    chronicle: Chronicle,
    input: { value: { url: string } },
) {
    await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        files: [await MessageAttachment.load(input.value.url)]
    });

    updateImage(interaction, chronicle);
}

async function updateImage(interaction: Interaction, chronicle: Chronicle) {
    const message = await interaction.fetchResponse();

    const id = await chronicle.getOrCreateCharacterId(interaction.user.id);

    const character = await chronicle.getCharacter(id);

    character.image = message.attachments[0].url;

    await chronicle.updateCharacter(character);
}
