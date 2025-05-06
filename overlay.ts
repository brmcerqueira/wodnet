import { Chronicle } from "./repository.ts";

export async function overlayVoiceCss(chronicle: Chronicle, hide: string[]): Promise<string> {
  const images = await chronicle.getCharactersImage();

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

    ${images.map(image => `.voice_username::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
        background-image: url(${image});
    }`).join("\n\n")}

    ${hide.map(id => `[data-userid="${id}"] {
      display: none;
    }`).join("\n\n")}
  `;
}
