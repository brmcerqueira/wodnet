import {
  ApplicationCommandPayload,
  Client,
  encodeBase64,
  GatewayIntents,
  Interaction,
  InteractionApplicationCommandData,
  InteractionApplicationCommandOption,
  InteractionMessageComponentData,
  InteractionType,
} from "./deps.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { emojis } from "./roll/data.ts";
import { keys } from "./utils.ts";
import { reRollSolver } from "./roll/solver/reRollSolver.ts";
import {
  CommandOptions,
  CommandOptionType,
  commands,
} from "./roll/commands/module.ts";

const keyCommands = keys(commands);

function parseValues(
options: CommandOptions, 
interactionOptions: InteractionApplicationCommandOption[], 
data: InteractionApplicationCommandData
) {
  const values: any = {};

  keys(options).forEach((key) => {
    const interactionOption = interactionOptions.find((o) => o.name == key);

    if (interactionOption) {
      let value: any = undefined;
      const option = options![key];
      switch (option.type) {
        case CommandOptionType.SUB_COMMAND:
          if (option.options) {
            value = parseValues(option.options, interactionOption.options!, data);
          }
          break;
        case CommandOptionType.ATTACHMENT:
          value = (data.resolved! as any)["attachments"][interactionOption.value];
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
  });

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

    //await cleanCommands(discordCommands);

    for (let index = 0; index < keyCommands.length; index++) {
      const name = keyCommands[index];
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

    const emojisArray = keys(emojis);

    for (const guild of await client.guilds.array()) {
      const guildEmojis = await client.rest.endpoints.listGuildEmojis(
        guild.id,
      );

      for (let index = 0; index < emojisArray.length; index++) {
        const name = emojisArray[index];
        let emoji = guildEmojis.find((e) => e.name == name);

        if (!emoji) {
          emoji = await client.rest.endpoints.createGuildEmoji(guild.id, {
            name: name,
            image: `data:image/png;base64,${
              encodeBase64(await Deno.readFile(`./emojis/${name}.png`))
            }`,
          });
        }

        emojis[name][guild.id] = emoji;
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
    if (
      !interaction.user.bot &&
      interaction.type == InteractionType.MESSAGE_COMPONENT
    ) {
      const data = interaction.data as InteractionMessageComponentData;
      await reRollSolver(interaction, parseInt(data.custom_id));
    } else if (
      !interaction.user.bot &&
      (interaction.type == InteractionType.APPLICATION_COMMAND ||
        interaction.type == InteractionType.AUTOCOMPLETE)
    ) {
      const data = interaction.data as InteractionApplicationCommandData;
      for (let index = 0; index < keyCommands.length; index++) {
        const name = keyCommands[index];
        if (data.name == name) {
          const command = commands[name];
          let values: any = undefined;

          if (command.options) {
            values = parseValues(command.options, data.options, data);
          }

          await command.solve(interaction, values);
          break;
        }
      }
    }
  } catch (error) {
    logger.error(error);
  }
});

export async function connect() {
  if (client.upSince == undefined) {
    await client.connect();
  }
}
