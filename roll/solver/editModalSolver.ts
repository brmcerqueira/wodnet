import { get } from "../../characterManager.ts";
import {
    Interaction,
    InteractionModalSubmitData,
    InteractionResponseType,
    MessageComponentType,
    TextInputStyle,
} from "../../deps.ts";
import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver, getOrBuildCharacterId } from "./buildCharacterSolver.ts";

const characterSolver = buildCharacterSolver<InteractionModalSubmitData>((character, input) => {
    for (const row of input.components) {
        const textInput = row.components[0];
        (character as any)[textInput.custom_id] = textInput.value;
    }
    return 0;
})

export async function editModalSolver(
    interaction: Interaction,
    input?: InteractionModalSubmitData,
) {
    if (input) {
        await characterSolver(interaction, input);
    } else {
        const id = getOrBuildCharacterId(interaction);

        const character = await get(id);

        await interaction.respond({
            type: InteractionResponseType.MODAL,
            customID: "edit",
            title: locale.commands.editModal.title,
            components: [{
                type: MessageComponentType.ACTION_ROW,
                components: [{
                    type: MessageComponentType.TEXT_INPUT,
                    label: locale.name,
                    value: character.name != "" ? character.name : undefined,
                    style: TextInputStyle.SHORT,
                    minLength: 1,
                    maxLength: 50,
                    required: true,
                    customID: "name",
                }],
            }, {
                type: MessageComponentType.ACTION_ROW,
                components: [{
                    type: MessageComponentType.TEXT_INPUT,
                    label: locale.player,
                    value: character.player != ""
                        ? character.player
                        : undefined,
                    style: TextInputStyle.SHORT,
                    maxLength: 50,
                    required: false,
                    customID: "player",
                }],
            }, {
                type: MessageComponentType.ACTION_ROW,
                components: [{
                    type: MessageComponentType.TEXT_INPUT,
                    label: locale.ambition,
                    value: character.ambition != ""
                        ? character.ambition
                        : undefined,
                    style: TextInputStyle.PARAGRAPH,
                    maxLength: 80,
                    required: false,
                    customID: "ambition",
                }],
            }, {
                type: MessageComponentType.ACTION_ROW,
                components: [{
                    type: MessageComponentType.TEXT_INPUT,
                    label: locale.desire,
                    value: character.desire != ""
                        ? character.desire
                        : undefined,
                    style: TextInputStyle.PARAGRAPH,
                    maxLength: 80,
                    required: false,
                    customID: "desire",
                }],
            }, {
                type: MessageComponentType.ACTION_ROW,
                components: [{
                    type: MessageComponentType.TEXT_INPUT,
                    label: locale.details,
                    value: character.details != ""
                        ? character.details
                        : undefined,
                    style: TextInputStyle.PARAGRAPH,
                    maxLength: 500,
                    required: false,
                    customID: "details",
                }],
            }],
        });
    }
}
