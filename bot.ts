import {
  ApplicationCommandPayload,
  base64,
  Client,
  GatewayIntents,
  Interaction,
  InteractionApplicationCommandData,
  InteractionResponseType,
  InteractionType,
} from "./deps.ts";
import { locale } from "./i18n/locale.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { sendRoll } from "./roll/sendRoll.ts";
import { emojis } from "./roll/data.ts";
import { keys } from "./utils.ts";

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

    const commands = <ApplicationCommandPayload[]> <unknown> await client.rest
      .endpoints.getGlobalApplicationCommands(client.applicationID!);

    if (!commands.find((c) => c.name == locale.commands.roll.name)) {
      await client.rest.endpoints.createGlobalApplicationCommand(
        client.applicationID!,
        {
          type: 1,
          name: locale.commands.roll.name,
          description: locale.commands.roll.description,
          options: [{
            name: locale.commands.roll.dices.name,
            description: locale.commands.roll.dices.description,
            type: 4,
            required: true,
            min_value: 1,
            max_value: 30,
          }, {
            name: locale.commands.roll.hunger.name,
            description: locale.commands.roll.hunger.description,
            type: 4,
            required: false,
            min_value: 1,
            max_value: 5,
          }, {
            name: locale.commands.roll.difficulty.name,
            description: locale.commands.roll.difficulty.description,
            type: 4,
            required: false,
            min_value: 2,
            max_value: 9,
          }, {
            name: locale.commands.roll.descriptionField.name,
            description: locale.commands.roll.descriptionField.description,
            type: 3,
            required: false,
          }],
        },
      );
    }

    for (const guild of await client.guilds.array()) {
      const guildEmojis = await client.rest.endpoints.listGuildEmojis(guild.id);

      keys(emojis).forEach(async (name) => {
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
      });
    }

    logger.info(locale.welcome);
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (
      !interaction.user.bot &&
      interaction.type == InteractionType.APPLICATION_COMMAND
    ) {
      const data = <InteractionApplicationCommandData> interaction.data;
      if (data.name == locale.commands.roll.name) {
        let dices = 0;
        let hunger = 0;
        let difficulty = 1;
        let description: string | undefined = undefined;

        for (const option of data.options) {
          switch (option.name) {
            case locale.commands.roll.dices.name:
              dices = parseInt(option.value);
              break;
            case locale.commands.roll.hunger.name:
              hunger = parseInt(option.value);
              break;
            case locale.commands.roll.difficulty.name:
              difficulty = parseInt(option.value);
              break;
            case locale.commands.roll.descriptionField.name:
              description = option.value;
              break;
          }
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
          hunger,
          difficulty,
          0,
          description,
        );
      }
    }
  });

  await client.connect();
}
