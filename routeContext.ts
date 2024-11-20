import { decodeBase64Url } from "./deps.ts";

const textDecoder = new TextDecoder();

export class RouteContext {
    private _url: URL;

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
        return this.id ? textDecoder.decode(decodeBase64Url(this.id)) : null;
    }

    public get update(): number {
        return this._url.searchParams.has("update")
        ? parseInt(this._url.searchParams.get("update")!)
        : 20000;
    }

    public get versionstamp(): string | null {
        return this._url.searchParams.get("versionstamp");
    }    
}