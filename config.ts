import { parse } from "./deps.ts";
import { logger } from "./logger.ts";

export const config = parse(Deno.args, {
    string: ["token", "host", "port"],
    default: { token: "", host: "", port: "3000" },
});

logger.info("config: %v", JSON.stringify(config));