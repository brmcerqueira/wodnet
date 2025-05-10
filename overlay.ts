import { Chronicle } from "./repository.ts";

export async function overlayVoiceCss(guildId: string, hide: string[]): Promise<string> {
  const chronicle = new Chronicle(guildId);

  const characters = await chronicle.getAllCharacters();

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
        border: 0.125em solid #C71585 !important;
    }

    ${characters.map(character => `li[data-userid="${character.id}"] .voice_username::before {
        content: "";
        display: inline-block;
        width: 2.813em;
        height: 2.813em;
        margin-right: 0.375em;
        border-radius: 1em;
        border: 0.125em solid transparent;
        background-image: url(${character.image});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        vertical-align: middle;
    }

    li[data-userid="${character.id}"] .voice_username span::after {
      content: "(${character.player})";
      color: #DC143C;
      margin-left: 0.375em;
    }
    `).join("\n    ")}

    ${hide.map(id => `li[data-userid="${id}"] {
      display: none;
    }
    `).join("\n    ")}
  `;
}
