import { config } from "../config.ts";
import { ButtonComponent, ButtonStyle, encodeBase64Url, MessageComponentType } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { encryptToken } from "../token.ts";

export async function characterLinkButton(
    chronicleId: string,
    id: string,
  ): Promise<ButtonComponent> {
    return {
      type: MessageComponentType.BUTTON,
      label: locale.open,
      style: ButtonStyle.LINK,
      url: `${config.host}/dark?token=${encodeBase64Url(await encryptToken(chronicleId, id))}`,
    };
  }