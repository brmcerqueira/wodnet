import { base64url } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import { apply, ApplyType, check, get } from "./characterManager.ts";
import * as bot from "./bot.ts";
import * as tags from "./tags.ts";
import * as templates from "./templates.ts";
import * as links from "./characterLinks.ts";
import { config } from "./config.ts";
import { logger } from "./logger.ts";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function decodeBase64(data: string): string {
  return textDecoder.decode(base64url.decode(data));
}

async function respondStatus(event: Deno.RequestEvent, status: number) {
  await event.respondWith(
    new Response(null, {
      status: status,
    }),
  );
}

logger.debug("config: %v", JSON.stringify(config));

const connection = Deno.listen({ port: config.port });
const httpServer = Deno.serveHttp(await connection.accept());

logger.info("Server online!");

for await (const event of httpServer) {
  try {
    logger.info(
      "request: %v %v",
      event.request.method, 
      event.request.url,
    );

    const url = new URL(event.request.url);

    if (url.pathname == "/characterRender.css") {
      await event.respondWith(
        new Response(await Deno.readFile("./views/characterRender.css"), {
          status: 200,
          headers: {
            "Content-Type": "application/css",
          },
        }),
      );
    } else if (url.pathname == "/discord") {
      await bot.connect();
      await respondStatus(event, 200);
    } else if (url.pathname == "/setup/tags") {
      await event.respondWith(
        new Response(
          JSON.stringify(tags.setup()),
          {
            status: 200,
          },
        ),
      );
    } else if (url.pathname == "/setup/templates") {
      await event.respondWith(
        new Response(
          JSON.stringify(templates.setup()),
          {
            status: 200,
          },
        ),
      );
    } else if (url.pathname == "/setup/links") {
      await event.respondWith(
        new Response(
          JSON.stringify(await links.setup()),
          {
            status: 200,
          },
        ),
      );
    } else if (url.searchParams.has("id")) {
      const id = url.searchParams.get("id")!;
      const decodeId = parseInt(decodeBase64(id));
      if (url.pathname == "/apply" && url.searchParams.has("type")) {
        await event.respondWith(
          Response.json(
            await apply(
              decodeId,
              ApplyType[
                url.searchParams.get("type")! as keyof typeof ApplyType
              ],
            ),
          ),
        );
      } else if (url.pathname == "/check") {
        await event.respondWith(
          Response.json({ update: await check(decodeId) }),
        );
      } else {
        await event.respondWith(
          new Response(textEncoder.encode(
            await characterRender(
              await get(decodeId),
              id,
              url.pathname == "/dark",
              url.searchParams.has("update")
                ? parseInt(url.searchParams.get("update")!)
                : 30000,
            ).render(),
          )),
        );
      }
    } else {
      await respondStatus(event, 404);
    }
  } catch (error) {
    logger.error(error);
    await respondStatus(event, 500);
  }
}
