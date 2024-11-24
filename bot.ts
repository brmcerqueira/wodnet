import {
  ApplicationCommandPayload,
  Client,
  encodeBase64,
  GatewayIntents,
  Interaction,
  InteractionApplicationCommandData,
  InteractionApplicationCommandOption,
  InteractionMessageComponentData,
  InteractionModalSubmitData,
  InteractionResponseType,
  InteractionType,
} from "./deps.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { Emojis, emojis } from "./roll/data.ts";
import { keys } from "./utils.ts";
import { reRollSolver } from "./roll/solver/reRollSolver.ts";
import {
  CommandOptions,
  CommandOptionType,
  commands,
} from "./roll/commands/module.ts";
import { InteractionResponseError } from "./roll/interactionResponseError.ts";
import * as colors from "./roll/colors.ts";
import { editModalSolver } from "./roll/solver/editModalSolver.ts";
import {
  characterAutocompleteSolver,
  extractCharacterAutocompleteInput,
} from "./roll/solver/characterAutocompleteSolver.ts";

function parseCommandValues(
  options: CommandOptions,
  interactionOptions: InteractionApplicationCommandOption[],
  data: InteractionApplicationCommandData,
) {
  const values: any = {};

  for (const key in options) {
    const interactionOption = interactionOptions.find((o) => o.name == key);

    if (interactionOption) {
      let value: any = undefined;
      const option = options[key];
      switch (option.type) {
        case CommandOptionType.SUB_COMMAND:
          if (option.options) {
            value = parseCommandValues(
              option.options,
              interactionOption.options!,
              data,
            );
          }
          break;
        case CommandOptionType.ATTACHMENT:
          value =
            (data.resolved! as any)["attachments"][interactionOption.value];
          break;
        case CommandOptionType.BOOLEAN:
          value = interactionOption.value == true;
          break;
        case CommandOptionType.INTEGER:
          value = parseInt(interactionOption.value);
          break;
        default:
          value = interactionOption.value;
          break;
      }

      values[option.property] = option.autocomplete
        ? {
          value: value,
          focused: interactionOption.focused,
        }
        : value;
    }
  }

  return values;
}

function transformOptions(options?: CommandOptions): any[] | undefined {
  return options
    ? keys(options).map((key) => {
      const option = options![key];
      return {
        name: key,
        description: option.description,
        type: option.type,
        required: option.required,
        min_value: option.minValue,
        max_value: option.maxValue,
        autocomplete: option.autocomplete,
        choices: option.choices,
        options: transformOptions(option.options),
      };
    })
    : undefined;
}

async function cleanCommands(
  discordCommands: ApplicationCommandPayload[],
  ...keys: string[]
) {
  for (let index = 0; index < discordCommands.length; index++) {
    const command = discordCommands[index];
    if (!keys || (keys && keys.indexOf(command.name) > -1)) {
      await client.rest.endpoints.deleteGlobalApplicationCommand(
        client.applicationID!,
        command.id,
      );
      discordCommands.splice(index, 1);
      index--;
      logger.info("Delete Command %v", JSON.stringify(command));
    }
  }
}

const client = new Client({
  token: config.discordToken,
  intents: [
    GatewayIntents.GUILDS,
    GatewayIntents.GUILD_MESSAGES,
    GatewayIntents.GUILD_MESSAGE_REACTIONS,
    GatewayIntents.GUILD_MESSAGE_REACTIONS,
    GatewayIntents.DIRECT_MESSAGES,
    GatewayIntents.DIRECT_MESSAGE_REACTIONS,
    GatewayIntents.MESSAGE_CONTENT,
  ],
});

client.on("ready", async () => {
  try {
    logger.info("Loading Wodbot...");

    const discordCommands = await client.rest.endpoints
      .getGlobalApplicationCommands(
        client.applicationID!,
      ) as unknown as ApplicationCommandPayload[];

    //await cleanCommands(discordCommands, "personagem");

    for (const name in commands) {
      const command = commands[name];
      if (!discordCommands.find((c) => c.name == name)) {
        const data = {
          type: CommandOptionType.SUB_COMMAND,
          name,
          description: command.description,
          options: transformOptions(command.options),
        };
        logger.info("Create Command %v", JSON.stringify(data));
        await client.rest.endpoints.createGlobalApplicationCommand(
          client.applicationID!,
          data,
        );
      }
    }

    for (const guild of await client.guilds.array()) {
      const guildEmojis = await client.rest.endpoints.listGuildEmojis(
        guild.id,
      );

      for (const name in emojis) {
        let emoji = guildEmojis.find((e) => e.name == name);

        if (!emoji) {
          emoji = await client.rest.endpoints.createGuildEmoji(guild.id, {
            name: name,
            image: `data:image/png;base64,${
              encodeBase64(await Deno.readFile(`./emojis/${name}.png`))
            }`,
          });
        }

        emojis[name as keyof Emojis][guild.id] = {
          id: emoji.id!,
          name: emoji.name!,
        };
      }
    }

    logger.info("Wodbot online!");
  } catch (error) {
    logger.error(error);
  }
}).on("interactionCreate", async (interaction: Interaction) => {
  try {
    logger.info(
      "Interaction %v %v",
      interaction.type,
      JSON.stringify(interaction.data),
    );

    if (!interaction.user.bot) {
      if (interaction.type == InteractionType.MESSAGE_COMPONENT) {
        const data = interaction.data as InteractionMessageComponentData;
        const value = parseInt(data.custom_id);
        if (!isNaN(value)) {
          await reRollSolver(interaction, value);
        } else {
          await characterAutocompleteSolver(
            interaction,
            extractCharacterAutocompleteInput(data.custom_id),
          );
        }
      } else if (interaction.type == InteractionType.MODAL_SUBMIT) {
        await editModalSolver(
          interaction,
          interaction.data as InteractionModalSubmitData,
        );
      } else if (
        interaction.type == InteractionType.APPLICATION_COMMAND ||
        interaction.type == InteractionType.AUTOCOMPLETE
      ) {
        const data = interaction.data as InteractionApplicationCommandData;
        for (const name in commands) {
          if (data.name == name) {
            const command = commands[name];
            await command.solve(
              interaction,
              command.options
                ? parseCommandValues(command.options, data.options, data)
                : undefined,
            );
            break;
          }
        }
      }
    }
  } catch (error) {
    logger.error(error);
    if (error instanceof InteractionResponseError) {
      await interaction.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [{
          title: error.message,
          color: colors.Red,
        }],
      });
    }
  }
});

export async function connect(): Promise<Date> {
  if (client.upSince == undefined) {
    await client.connect();
  }
  return client.upSince!;
}

export async function destroy() {
  if (client.upSince) {
    await client.destroy();
  }
}
