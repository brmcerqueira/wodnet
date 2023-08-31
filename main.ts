import { base64url } from "./deps.ts";
import { characterRender } from "./views/characterRender.tsx";
import { apply, ApplyType, check, get } from "./characterManager.ts";
import * as tags from "./tags.ts";
import * as templates from "./templates.ts";
import * as links from "./characterLinks.ts";
import { config } from "./config.ts";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function decodeBase64(data: string): string {
  return textDecoder.decode(base64url.decode(data));
}

async function respond404(event: Deno.RequestEvent) {
  await event.respondWith(
    new Response(null, {
      status: 404,
    }),
  );
}

const connection = Deno.listen({ port: config.port });
const httpServer = Deno.serveHttp(await connection.accept());

for await (const event of httpServer) {
  const url = new URL(event.request.url);

  if (url.searchParams.has("campaignId")) {
    const campaignId = parseInt(url.searchParams.get("campaignId")!);
    if (url.pathname == "/setup/tags") {
      await event.respondWith(
        new Response(
          JSON.stringify(tags.setup(campaignId)),
          {
            status: 200,
          },
        ),
      );
    } else if (url.pathname == "/setup/templates") {
      await event.respondWith(
        new Response(
          JSON.stringify(templates.setup(campaignId)),
          {
            status: 200,
          },
        ),
      );
    } else if (url.pathname == "/setup/links") {
      await event.respondWith(
        new Response(
          JSON.stringify(await links.setup(campaignId)),
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
              campaignId,
              decodeId,
              ApplyType[
                url.searchParams.get("type")! as keyof typeof ApplyType
              ],
            ),
          ),
        );
      } else if (url.pathname == "/check") {
        await event.respondWith(
          Response.json({ update: await check(campaignId, decodeId) }),
        );
      } else {
        await event.respondWith(
          new Response(textEncoder.encode(
            await characterRender(
              await get(campaignId, decodeId),
              campaignId,
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
      await respond404(event);
    }
  } else if (url.pathname == "/characterRender.css") {
    await event.respondWith(
      new Response(await Deno.readFile("./views/characterRender.css"), {
        status: 200,
        headers: {
          "Content-Type": "application/css",
        },
      }),
    );
  } else {
    await respond404(event);
  }
}
