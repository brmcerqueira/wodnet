import { Chronicle } from "./repository.ts";

export async function overlayVoiceCss(chronicle: Chronicle, hide: string[]): Promise<string> {
  const images = await chronicle.getCharactersImage();

  return `
    body {
      background-color: rgba(0, 0, 0, 0);
      margin: 0em;
      overflow: hidden;
    }

    .voice_state {
      display: flex;
      justify-content: flex-end;
      padding-right: 0.625em;
    }

    .voice_state img {
      display: none;
    }

    .wrapper_speaking .voice_username::before {
        border: 0.125em solid #3ba53b;
    }

    ${images.map(image => `.voice_username::before {
        content: "";
        display: inline-block;
        width: 2.813em;
        height: 2.813em;
        margin-right: 0.375em;
        border-radius: 1em;
        border: 0.125em solid transparent;
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
        background-image: url(${image});
    }
    `).join("\n    ")}

    ${hide.map(id => `[data-userid="${id}"] {
      display: none;
    }
    `).join("\n    ")}
  `;
}
