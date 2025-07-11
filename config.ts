import { LevelName } from "./deps.ts";

export const config = { 
    redis: {
        hostname: Deno.env.get("REDIS_HOST")!,
        port: Deno.env.has("REDIS_PORT") ? parseInt(Deno.env.get("REDIS_PORT")!) : 19857,
        password: Deno.env.get("REDIS_PASSWORD")!,
    },
    host: Deno.env.get("BOT_HOST")!,
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000,
    botStart: Deno.env.has("BOT_START"),
    discord: {
        token: Deno.env.get("DISCORD_TOKEN")!,
    },
    cryptoKey: Deno.env.get("CRYPTO_KEY")!,
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};