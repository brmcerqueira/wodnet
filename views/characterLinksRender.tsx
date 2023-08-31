import React, { TsxComplexElement, base64url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";
import { keys } from "./utils.ts";
import { ApplyType } from "../characterManager.ts";
import { locale } from "../i18n/locale.ts";

function encodeId(entity: kanka.KankaEntity): string {
    return base64url.encode(entity.id.toString());
}

function parseLabel<T extends object>(o: T, key: string): string {
    const result = Object.entries(o).find(data => data[0].toLowerCase() == key.toLowerCase());
    return result ? result[1] : "";
}

export const characterLinksRender = (entities: kanka.KankaEntity[], campaignId: number): TsxComplexElement => 
    <ul>
        {entities.sort((r, l) => {
            if (r.name < l.name) {
                return -1;
            }
            if (r.name > l.name) {
                return 1;
            }
            return 0;
        }).map(entity =>
            <li><a href={`${config.host}/dark?campaignId=${campaignId}&id=${encodeId(entity)}`}>{entity.name}</a>
            <ul>{keys(ApplyType).filter(e => isNaN(parseInt(e))).map(key => <li><a href={`${config.host}/apply?campaignId=${campaignId}&id=${encodeId(entity)}&type=${key}`}>+ {parseLabel(locale.apply, key)}</a></li>)}</ul>
            </li>
        )}
    </ul>