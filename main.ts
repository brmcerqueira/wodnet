import { Context, decodeBase64Url, esbuild, join, NextFunc, res, RouteFn, Server, serveStatic } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import {
  apply,
  ApplyType,
  check,
  get,
  getCharacters,
  updateCronJob,
} from "./characterManager.ts";
import * as bot from "./bot.ts";
import * as tags from "./tags.ts";
import * as templates from "./templates.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { characterManagerRender } from "./views/characterManagerRender.tsx";

const scripts: { [key: string]: string } = {};

const scriptsPath = "./views/scripts";

for await (const dirEntry of Deno.readDir(scriptsPath)) {
  try {
    if (dirEntry.isFile) {
      scripts[dirEntry.name.replace(".ts", ".js")] = (await esbuild.transform(
        await Deno.readTextFile(join(scriptsPath, dirEntry.name)), { loader: "ts" })).code;
    }
  } catch (e) {
    logger.error(e);
  }
  esbuild.stop();
}

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
    ctx.extra.decodeId = parseInt(textDecoder.decode(decodeBase64Url(ctx.extra.id)));
  }
  await next();
});

server.get("/scripts/*.js", async (ctx: Context, next: NextFunc) => {
  const path = ctx.params[Object.keys(ctx.params)[0]];
  if (scripts[path]) {
    ctx.res.body = scripts[path];
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

server.get("/manager/dark", res("html"), managerRoute(true));

server.get("/manager", res("html"), managerRoute(false));

server.get("/dark", res("html"), characterRoute(true));

server.get("/", res("html"), characterRoute(false));

await server.listen({ port: config.port });

function managerRoute(dark: boolean): RouteFn {
  return async (ctx: Context, next: NextFunc) => {
    ctx.res.body = await characterManagerRender(
      await getCharacters(), dark
    ).render();
    await next();
    };
}

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
