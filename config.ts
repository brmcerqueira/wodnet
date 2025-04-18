import { LevelName } from "./deps.ts";

export const config = {
    imgbbKey: Deno.env.get("IMGBB_KEY")!,
    discordToken: Deno.env.get("DISCORD_TOKEN")!,
    redis: {
        hostname: Deno.env.get("REDIS_HOST")!,
        port: Deno.env.has("REDIS_PORT") ? parseInt(Deno.env.get("REDIS_PORT")!) : 19857,
        password: Deno.env.get("REDIS_PASSWORD")!,
    },
    host: Deno.env.get("BOT_HOST")!,
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000,
    bot: Deno.env.get("BOT_ENABLE") === undefined,
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};