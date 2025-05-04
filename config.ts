import { LevelName } from "./deps.ts";

export const config = {
    imgbbKey: Deno.env.get("IMGBB_KEY")!,  
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
        oauth: {
            clientId: Deno.env.get("DISCORD_OAUTH_CLIENT_ID")!,
            clientSecret: Deno.env.get("DISCORD_OAUTH_CLIENT_SECRET")!,
        },
    },
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};