import {
  ApplicationCommandPayload,
  CreateEmojiPayload,
  EmojiPayload,
  RESTManager,
} from "./deps.ts";

export class DiscordEndpoints {
  constructor(private _rest: RESTManager) {
  }

  public async getGlobalApplicationCommands(
    applicationId: string,
  ): Promise<ApplicationCommandPayload[]> {
    return await this._rest.get(`/applications/${applicationId}/commands`);
  }

  public async listGlobalApplicationEmojis(
    applicationId: string,
  ): Promise<{ items: EmojiPayload[] }> {
    return await this._rest.get(`/applications/${applicationId}/emojis`);
  }

  public async createGlobalApplicationEmoji(
    applicationId: string,
    payload: CreateEmojiPayload,
  ): Promise<EmojiPayload> {
    return await this._rest.post(
      `/applications/${applicationId}/emojis`,
      payload,
    );
  }
}
