import { LevelName } from "./deps.ts";

export const config = {
    kankaToken: Deno.env.get("KANKA_TOKEN"),
    campaignId: Deno.env.has("CAMPAIGN_ID") ? parseInt(Deno.env.get("CAMPAIGN_ID")!) : 0,
    discordToken: Deno.env.get("DISCORD_TOKEN"),
    storytellerId: Deno.env.get("STORYTELLER_ID"), 
    host: Deno.env.get("HOST"),
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000,
    level: (Deno.env.get("LOG_LEVEL") || "DEBUG") as LevelName
};