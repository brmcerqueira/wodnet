import { join } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import * as bot from "./bot.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";
import { RouteContext } from "./routeContext.ts";
import { locale } from "./i18n/locale.ts";
import { transpile } from "./transpile.ts";
import { rpcToken } from "./utils.ts";

type RouteResult = Promise<Response | void> | Response | void;

async function loadFiles(
  root: string,
  parse: (path: string) => Promise<string>,
): Promise<{ [key: string]: string }> {
  const result: { [key: string]: string } = {};
  for await (const dirEntry of Deno.readDir(root)) {
    try {
      if (dirEntry.isFile) {
        result[dirEntry.name.substring(0, dirEntry.name.lastIndexOf("."))] =
          await parse(join(root, dirEntry.name));
      }
    } catch (e) {
      logger.error(e);
    }
  }
  return result;
}

const scripts = await loadFiles("./views/scripts", async (path) => {
  return await transpile(path, await Deno.readTextFile(path));
});

const styles = await loadFiles("./views/styles", async (path) => {
  return await Deno.readTextFile(path);
});

const favicon = await Deno.readFile("./wodnet.ico");

function route(
  ...params: (
    | {
      path: RegExp;
      go: (array: RegExpExecArray, context: RouteContext) => RouteResult;
    }
    | { path: string[] | string; go: (context: RouteContext) => RouteResult }
  )[]
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    let response = new Response(null, { status: 404 });

    logger.info(
      "Request %v %v",
      request.method,
      request.url,
    );

    if (request.method == "GET") {
      const context = new RouteContext(request.url);

      for (const item of params) {
        if (item.path instanceof RegExp) {
          const regex = item.path.exec(context.url.pathname);
          if (regex) {
            const go = item.go as (
              array: RegExpExecArray,
              context: RouteContext,
            ) => RouteResult;
            const result = await go(regex, context);
            if (result instanceof Response) {
              response = result;
            }
            break;
          }
        } else {
          const array = typeof item.path == "string" ? [item.path] : item.path;
          if (array.indexOf(context.url.pathname) > -1) {
            const go = item.go as (context: RouteContext) => RouteResult;
            const result = await go(context);
            if (result instanceof Response) {
              response = result;
            }
            break;
          }
        }
      }
    }

    return response;
  };
}

Deno.serve(
  { port: config.port },
  route({
    path: /\/scripts\/(\w*).js/,
    go: (array: RegExpExecArray): Response | void => {
      const path = array[1];
      if (scripts[path]) {
        return new Response(scripts[path], {
          headers: [["Content-Type", "application/javascript"]],
        });
      }
    },
  }, {
    path: /\/styles\/(\w*).css/,
    go: (array: RegExpExecArray): Response | void => {
      const path = array[1];
      if (styles[path]) {
        return new Response(styles[path], {
          headers: [["Content-Type", "application/css"]],
        });
      }
    },
  }, {
    path: "/favicon.ico",
    go: (): Response => {
      return new Response(favicon, {
        headers: [["Content-Type", "image/x-icon"]],
      });
    },
  }, {
    path: "/bot/destroy",
    go: async (): Promise<void | Response> => {
      await bot.destroy();
      return new Response(
        JSON.stringify(
          config.botStart ? locale.unauthorized : {
            ok: true,
          },
        ),
        { headers: [["Content-Type", "application/json"]] },
      );
    },
  }, {
    path: "/bot",
    go: async (): Promise<void | Response> => {
      return new Response(
        JSON.stringify(
          config.botStart ? locale.unauthorized : {
            upSince: await bot.connect(),
          },
        ),
        { headers: [["Content-Type", "application/json"], ["Refresh", "300"]] },
      );
    },
  }, {
    path: "rpc/token",
    go: async (context: RouteContext): Promise<void | Response> => {
      if (context.code) {
        return new Response(
          JSON.stringify(
            {
              accessToken: await rpcToken(context.code),
            },
          ),
          { headers: [["Content-Type", "application/json"]] },
        );
      }
    },
  }, {
    path: "/check",
    go: async (context: RouteContext): Promise<void | Response> => {
      if (context.chronicle && context.decodeId) {
        return new Response(
          JSON.stringify({
            update: await context.chronicle.checkCharacter(
              context.decodeId,
              context.versionstamp!,
            ),
          }),
          { headers: [["Content-Type", "application/json"]] },
        );
      }
    },
  }, {
    path: ["/dark", "/"],
    go: async (context: RouteContext): Promise<void | Response> => {
      if (
        context.chronicle && context.id && context.chronicleId &&
        context.decodeId
      ) {
        return new Response(
          await characterRender(
            await context.chronicle.getCharacter(context.decodeId, true),
            context.chronicleId,
            context.id,
            context.url.pathname == "/dark",
            context.update,
          ).render(),
          { headers: [["Content-Type", "text/html"]] },
        );
      }
    },
  }),
);

if (config.botStart) {
  await bot.connect();
}