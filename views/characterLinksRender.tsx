import React, { TsxComplexElement, base64url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";

export const characterLinksRender = (characters: kanka.KankaCharacter[], campaignId: number): TsxComplexElement => (
    <ul>
        {characters.sort((r, l) => {
            if (r.name < l.name) {
                return -1;
            }
            if (r.name > l.name) {
                return 1;
            }
            return 0;
        }).map(character =>
            <li><a href={`${config.host}/?campaignId=${campaignId}&id=${base64url.encode(character.id.toString())}`}>{character.name}</a></li>
        )}
    </ul>
);