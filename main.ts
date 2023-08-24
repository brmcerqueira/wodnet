import { base64url } from "./deps.ts";

import { characterRender } from "./characterRender.tsx";
import { get } from "./characterManager.ts";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function decodeBase64(data: string): string {
    return textDecoder.decode(base64url.decode(data));
}

async function respond404(event: Deno.RequestEvent) {
  await event.respondWith(new Response(null, {
    status: 404
  }));
}

const connection = Deno.listen({ port: 3000 });
const httpServer = Deno.serveHttp(await connection.accept());

for await (const event of httpServer) {
    const url = new URL(event.request.url);

    if (url.pathname == "/characterRender.css") {
        await event.respondWith(new Response(await Deno.readFile("./characterRender.css"), {
            status: 200,
            headers: {
                "Content-Type": "application/css"
            }
        }));
    }
    else if (url.pathname == "/check" && url.searchParams.has("id")) {
        await event.respondWith(Response.json({ update: false }));
    }
    else if (url.searchParams.has("id")) {
        const id = url.searchParams.get("id")!;
        await event.respondWith(new Response(textEncoder.encode(
          await characterRender(
            await get(parseInt(decodeBase64(id)), id)).render())));
    }  
    else {
        await respond404(event);
    }
}