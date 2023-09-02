import { logger } from "./logger.ts";

export const config = {
    kankaToken: Deno.env.get("KANKA_TOKEN"),
    discordToken: Deno.env.get("DISCORD_TOKEN"),
    storytellerId: Deno.env.get("STORYTELLER_ID"), 
    host: Deno.env.get("HOST"),
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000
};

logger.info("config: %v", JSON.stringify(config));