import { LevelName } from "./deps.ts";

export const config = {
    discordToken: Deno.env.get("DISCORD_TOKEN"),
    storytellerId: Deno.env.get("STORYTELLER_ID"), 
    host: Deno.env.get("BOT_HOST"),
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000,
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};