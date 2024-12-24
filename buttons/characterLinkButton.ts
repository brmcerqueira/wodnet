import { config } from "../config.ts";
import { ButtonComponent, ButtonStyle, encodeBase64Url, MessageComponentType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";

export function characterLinkButton(
    chronicleId: string,
    id: string,
  ): ButtonComponent {
    return {
      type: MessageComponentType.BUTTON,
      label: locale.open,
      style: ButtonStyle.LINK,
      url: `${config.host}/dark?chronicleId=${encodeBase64Url(chronicleId)}&id=${
        encodeBase64Url(id)
      }`,
    };
  }