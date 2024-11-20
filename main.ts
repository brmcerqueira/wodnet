import { bundle, Context, decodeBase64Url, join, NextFunc, res, RouteFn, Server, serveStatic } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import { check, get } from "./characterManager.ts";
import * as bot from "./bot.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";

const scripts: { [key: string]: string } = {};

const scriptsPath = "./views/scripts";

for await (const dirEntry of Deno.readDir(scriptsPath)) {
  try {
    if (dirEntry.isFile) {
      const result = await bundle(join(scriptsPath, dirEntry.name));
      scripts[dirEntry.name.replace(".ts", ".js")] = result.code;
    }
  } catch (e) {
    logger.error(e);
  }
}

const textDecoder = new TextDecoder();

logger.debug("Config %v", JSON.stringify(config));

const server = new Server();

server.use(async (ctx: Context, next: NextFunc) => {
  logger.info(
    "Request %v %v",
    ctx.req.method,
    ctx.req.url,
  );
  ctx.extra.id = ctx.url.searchParams.get("id")!;
  if (ctx.extra.id) {
    ctx.extra.decodeId = textDecoder.decode(decodeBase64Url(ctx.extra.id));
  }
  await next();
});

server.get("/scripts/*.js", async (ctx: Context, next: NextFunc) => {
  const path = ctx.params[Object.keys(ctx.params)[0]];
  if (scripts[path]) {
    ctx.res.body = scripts[path];
    ctx.res.headers.append("Content-Type", "application/javascript");
    await next();
  }
  else {
    ctx.res.status = 404;
  }
});

server.get("/styles/*", serveStatic("./views/styles"));

server.get("/discord",
  async (_ctx: Context, next: NextFunc) => {
    await bot.connect();
    await next();
  }
);

server.get("/check", res("json"),
  async (ctx: Context, next: NextFunc) => {
    ctx.res.body = {
      update: check(ctx.extra.decodeId, ctx.url.searchParams.get("versionstamp")!),
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
        await get(ctx.extra.decodeId, true),
        ctx.extra.id,
        dark,
        ctx.url.searchParams.has("update")
          ? parseInt(ctx.url.searchParams.get("update")!)
          : 20000
      ).render();
      await next();
    };
}
