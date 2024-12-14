import { LevelName } from "./deps.ts";

export const config = {
    imgbbKey: Deno.env.get("IMGBB_KEY"),
    discordToken: Deno.env.get("DISCORD_TOKEN"), 
    host: Deno.env.get("BOT_HOST"),
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000,
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};