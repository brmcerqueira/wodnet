import {
  ApplicationCommandPayload,
  base64,
  Client,
  GatewayIntents,
  Interaction,
  InteractionApplicationCommandData,
  InteractionType,
} from "./deps.ts";
import { locale } from "./i18n/locale.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { emojis } from "./roll/data.ts";
import { keys } from "./utils.ts";
import { reRollSolver } from "./roll/solver/reRollSolver.ts";
import { rollSolver } from "./roll/solver/rollSolver.ts";
import { commands } from "./roll/commands.ts";

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

export async function start() {
  client.on("ready", async () => {
    logger.info(locale.loading);

    const discordCommands = await client.rest.endpoints
    .getGlobalApplicationCommands(client.applicationID!) as unknown as ApplicationCommandPayload[];

    for (let index = 0; index < commands.length; index++) {
      const command = commands[index];
      if (!discordCommands.find(c => c.name == command.name)) {
        await client.rest.endpoints.createGlobalApplicationCommand(
          client.applicationID!, command
        );
      }
    }

    for (const guild of await client.guilds.array()) {
      const guildEmojis = await client.rest.endpoints.listGuildEmojis(guild.id);

      const array = keys(emojis);

      for (let index = 0; index < array.length; index++) {
        const name = array[index];
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

    logger.info(locale.welcome);
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      !interaction.user.bot &&
      interaction.type == InteractionType.MESSAGE_COMPONENT
    ) {
      await reRollSolver(interaction);
    } else if (
      !interaction.user.bot &&
      interaction.type == InteractionType.APPLICATION_COMMAND
    ) {
      const data = interaction.data as InteractionApplicationCommandData;
      if (data.name == locale.commands.roll.name) {
        await rollSolver(interaction, data);
      }
    }
  });

  await client.connect();
}
