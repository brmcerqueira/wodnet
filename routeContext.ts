import { Chronicle } from "./repository.ts";
import { decodeBase64Url } from "./deps.ts";

const textDecoder = new TextDecoder();

export class RouteContext {
  private _url: URL;
  private _decodeId: string | null | undefined;
  private _chronicle: Chronicle | null | undefined;

  constructor(url: string) {
    this._url = new URL(url);
  }

  public get url(): URL {
    return this._url;
  }

  public get id(): string | null {
    return this._url.searchParams.get("id");
  }

  public get decodeId(): string | null {
    if (this._decodeId == undefined) {
      this._decodeId = this.id
        ? textDecoder.decode(decodeBase64Url(this.id))
        : null;
    }
    return this._decodeId;
  }

  public get chronicleId(): string | null {
    return this._url.searchParams.has("chronicleId")
      ? this._url.searchParams.get("chronicleId")
      : null;
  }

  public get chronicle(): Chronicle | null {
    if (this._chronicle == undefined) {
      this._chronicle = this._url.searchParams.has("chronicleId")
        ? new Chronicle(
          textDecoder.decode(
            decodeBase64Url(this._url.searchParams.get("chronicleId")!),
          ),
        )
        : null;
    }

    return this._chronicle;
  }

  public get update(): number {
    return this._url.searchParams.has("update")
      ? parseInt(this._url.searchParams.get("update")!)
      : 5000;
  }

  public get versionstamp(): string | null {
    return this._url.searchParams.get("versionstamp");
  }

  public get code(): string | null {
    return this._url.searchParams.get("code");
  }

  public get channelId(): string | null {
    return this._url.searchParams.get("channelId");
  }
}
