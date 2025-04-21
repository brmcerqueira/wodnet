import { config } from "./config.ts";
import { log, sprintf } from "./deps.ts";

await log.setup({
    handlers: {
        default: new log.ConsoleHandler("NOTSET", {
            formatter: rec => `${rec.levelName} [${rec.datetime.toISOString()}] ${
                rec.args.length > 0 ? sprintf(rec.msg, ...rec.args.map(arg => { 
                    switch (typeof arg) {
                        case "object":
                            return JSON.stringify(arg);
                        case "undefined":
                            return "undefined";    
                        default:
                            return arg;
                    }
                })): rec.msg}`
        }),
    },
    loggers: {
        default: {
            level: config.level,
            handlers: ["default"],
        }
    },
});

export const logger = log.getLogger();