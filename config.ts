import { logger } from "./logger.ts";

export const config = {
    token: Deno.env.get("KANKA_TOKEN"),
    host: Deno.env.get("HOST"),
    port: Deno.env.has("PORT") ? parseInt(Deno.env.get("PORT")!) : 3000
};

logger.info("config: %v", JSON.stringify(config));