import { config } from "./config.ts";
import { log, sprintf } from "./deps.ts";

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("NOTSET", {
            formatter: rec => `${rec.levelName} [${rec.datetime.toISOString()}] ${
                rec.args.length > 0 ? sprintf(rec.msg, ...rec.args): rec.msg}` 
        })
    },
    loggers: {
        default: {
            level: config.level,
            handlers: ["console"],
        }
    },
});

export const logger = log.getLogger();