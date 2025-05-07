import { config } from "./config.ts";
import { decodeBase64 } from "./deps.ts";
import { separator } from "./utils.ts";

const key = await crypto.subtle.importKey(
  "raw",
  decodeBase64(config.cryptoKey),
  "AES-GCM",
  false,
  ["encrypt", "decrypt"],
);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type TokenData = {
  chronicleId: string;
  characterId: string;
};

export async function encryptToken(
  chronicleId: string,
  characterId: string,
): Promise<Uint8Array> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoder.encode(`${chronicleId}${separator}${characterId}`),
  );

  const token = new Uint8Array(iv.length + encrypted.byteLength);
  token.set(iv, 0);
  token.set(new Uint8Array(encrypted), iv.length);

  return token;
}

export async function decryptToken(
  token: Uint8Array,
): Promise<TokenData> {
  const decrypted = decoder.decode(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: token.slice(0, 12) },
      key,
      token.slice(12),
    ),
  ).split(separator);

  return {
    chronicleId: decrypted[0],
    characterId: decrypted[1],
  };
}
