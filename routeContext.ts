import { Chronicle } from "./repository.ts";
import { decodeBase64Url } from "./deps.ts";
import { decryptToken, TokenData } from "./token.ts";

export class RouteContext {
  private _url: URL;
  private _chronicle: Chronicle | null | undefined;
  private _tokenData: TokenData | null | undefined;

  constructor(url: string) {
    this._url = new URL(url);
  }

  public async load() {
    if (this._url.searchParams.has("token")) {
      this._tokenData = await decryptToken(
        decodeBase64Url(this._url.searchParams.get("token")!),
      );
      this._chronicle = new Chronicle(this._tokenData.chronicleId);
    }
  }

  public get url(): URL {
    return this._url;
  }

  public get token(): string | null {
    return this._url.searchParams.get("token");
  }

  public get chronicleId(): string | null {
    return this._tokenData?.chronicleId || null;
  }

  public get characterId(): string | null {
    return this._tokenData?.characterId || null;
  }

  public get chronicle(): Chronicle | null {
    return this._chronicle || null;
  }

  public get update(): number {
    return this._url.searchParams.has("update")
      ? parseInt(this._url.searchParams.get("update")!)
      : 5000;
  }

  public get versionstamp(): string | null {
    return this._url.searchParams.get("versionstamp");
  }

  public get hide(): string[] | null {
    return this._url.searchParams.getAll("hide");
  }

  public get guildId(): string | null {
    return this._url.searchParams.get("guildId");
  }
}
