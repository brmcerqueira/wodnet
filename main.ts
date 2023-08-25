import { base64url } from "./deps.ts";

import { characterRender } from "./characterRender.tsx";
import { check, get, links } from "./characterManager.ts";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function decodeBase64(data: string): string {
    return textDecoder.decode(base64url.decode(data));
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
    else if (url.pathname == "/links" && url.searchParams.has("campaignId") && url.searchParams.has("type")) {
        await event.respondWith(new Response(
            JSON.stringify(await links(parseInt(url.searchParams.get("campaignId")!), url.searchParams.get("type")!)), {
            status: 200
        }));
    } 
    else if (url.pathname == "/check" && url.searchParams.has("campaignId") && url.searchParams.has("id")) {
        await event.respondWith(Response.json({ update: await check(parseInt(url.searchParams.get("campaignId")!), 
        parseInt(decodeBase64(url.searchParams.get("id")!)))}));
    }
    else if (url.searchParams.has("campaignId") && url.searchParams.has("id")) {
        const id = url.searchParams.get("id")!;
        const campaignId = parseInt(url.searchParams.get("campaignId")!);
        await event.respondWith(new Response(textEncoder.encode(
          await characterRender(await get(campaignId, parseInt(decodeBase64(id))), campaignId, id).render())));
    }  
    else {
        await event.respondWith(new Response(null, {
            status: 404
        }));
    }
}