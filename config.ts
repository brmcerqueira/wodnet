import { parse } from "./deps.ts";

export const config = parse(Deno.args, {
    string: ["token", "host"],
    default: { token: "", host: "" },
});