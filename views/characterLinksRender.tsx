import React, { TsxComplexElement, base64url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";

export const characterLinksRender = (entities: kanka.KankaEntity[], campaignId: number): TsxComplexElement => (
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
            <li><a href={`${config.host}/?campaignId=${campaignId}&id=${base64url.encode(entity.id.toString())}`}>{entity.name}</a></li>
        )}
    </ul>
);