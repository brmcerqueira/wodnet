import { config } from "../config.ts";
import { Interaction } from "../deps.ts";
import { locale } from "../i18n/locale.ts";
import { InteractionResponseError } from "./interactionResponseError.ts";

export function isStoryteller(
  interaction: Interaction,
): boolean {
  const result = interaction.user.id == config.storytellerId;
  if (!result) {
    throw new InteractionResponseError(locale.unauthorized);
  }
  return result;
}

