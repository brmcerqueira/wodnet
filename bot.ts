import {
  ApplicationCommandPayload,
  base64,
  Client,
  GatewayIntents,
  Interaction,
  InteractionApplicationCommandData,
  InteractionMessageComponentData,
  InteractionType,
} from "./deps.ts";
import { locale } from "./i18n/locale.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { emojis } from "./roll/data.ts";
import { keys } from "./utils.ts";
import { reRollSolver } from "./roll/solver/reRollSolver.ts";
import { CommandOptionType, commands } from "./roll/commands.ts";
import { loadAll } from "./characterManager.ts";

const keyCommands = keys(commands);

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

    for (let index = 0; index < keyCommands.length; index++) {
      const name = keyCommands[index];
      const command = commands[name];
      if (!discordCommands.find((c) => c.name == name)) {
        await client.rest.endpoints.createGlobalApplicationCommand(
          client.applicationID!,
          {
            type: 1,
            name: name,
            description: command.description,
            options: command.options
              ? keys(command.options).map((key) => {
                const option = command.options![key];
                return {
                  name: key,
                  description: option.description,
                  type: option.type,
                  required: option.required,
                  min_value: option.minValue,
                  max_value: option.maxValue,
                  autocomplete: option.autocomplete,
                  choices: option.choices,
                };
              })
              : undefined,
          },
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
              base64.encode(await Deno.readFile(`./emojis/${name}.png`))
            }`,
          });
        }

        emojis[name][guild.id] = emoji;
      }
    }

    await loadAll();

    logger.info("Wodbot online!");
  } catch (error) {
    logger.error(error);
  }
}).on("interactionCreate", async (interaction: Interaction) => {
  try {
    logger.info(
      "request: %v %v",
      interaction.type, 
      JSON.stringify(interaction.data)
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
            values = {};
            keys(command.options).forEach((key) => {
              const discordOption = data.options.find((o) => o.name == key);
              if (discordOption) {
                let value: any = undefined;
                const option = command.options![key];
                switch (option.type) {
                  case CommandOptionType.BOOLEAN:
                    value = discordOption.value == "true";
                    break;
                  case CommandOptionType.INTEGER:
                    value = parseInt(discordOption.value);
                    break;
                  default:
                    value = discordOption.value;
                    break;
                }

                values[option.property] = option.autocomplete
                  ? {
                    value: value,
                    focused: discordOption.focused,
                  }
                  : value;
              }
            });
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