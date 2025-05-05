import { Chronicle } from "./repository.ts";

export async function overlayVoiceCss(chronicleId: string, hide: string[]): Promise<string> {
  const chronicle = new Chronicle(chronicleId);
  return `
    body {
      background-color: rgba(0, 0, 0, 0);
      margin: 0;
      overflow: hidden;
    }

    .voice_state {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }

    ${hide.map(id => `[data-userid="${id}"] {
      display: none;
    }`).join("\n\n\t")}
  `;
}
