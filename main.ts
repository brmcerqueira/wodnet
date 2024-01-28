import { base64url, Context, NextFunc, res, RouteFn, Server } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import {
  apply,
  ApplyType,
  check,
  get,
  updateCronJob,
} from "./characterManager.ts";
import * as bot from "./bot.ts";
import * as tags from "./tags.ts";
import * as templates from "./templates.ts";
import * as links from "./characterLinks.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";

const textDecoder = new TextDecoder();

logger.debug("config: %v", JSON.stringify(config));

updateCronJob();

const server = new Server();

server.use(async (ctx: Context, next: NextFunc) => {
  logger.info(
    "request: %v %v",
    ctx.req.method,
    ctx.req.url,
  );
  ctx.extra.id = ctx.url.searchParams.get("id")!;
  if (ctx.extra.id) {
    ctx.extra.decodeId = parseInt(textDecoder.decode(base64url.decode(ctx.extra.id)));
  }
  await next();
});

server.get("/discord",
  async (_ctx: Context, next: NextFunc) => {
    await bot.connect();
    await next();
  }
);

server.get("/setup/tags", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = tags.setup();
    await next();
  }
);

server.get("/setup/templates", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = templates.setup();
    await next();
  }
);

server.get("/setup/links", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = await links.setup();
    await next();
  }
);

server.get("/apply", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = await apply(
      ctx.extra.decodeId,
      ApplyType[
        ctx.url.searchParams.get("type")! as keyof typeof ApplyType
      ],
    );
    await next();
  }
);

server.get("/check", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = {
      update: check(ctx.extra.decodeId, parseInt(ctx.url.searchParams.get("hash")!)),
    };
    await next();
  }
);

server.get("/dark", res("html"), characterRoute(true));

server.get("/", res("html"), characterRoute(false));

await server.listen({ port: config.port });

function characterRoute(dark: boolean): RouteFn {
  return async (ctx: Context, next: NextFunc) => {
      ctx.res.body = await characterRender(
        await get(ctx.extra.decodeId),
        ctx.extra.id,
        dark,
        ctx.url.searchParams.has("update")
          ? parseInt(ctx.url.searchParams.get("update")!)
          : 20000
      ).render();
      await next();
    };
}
