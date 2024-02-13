import React, { TsxComplexElement, encodeBase64Url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";
import { keys } from "../utils.ts";
import { ApplyType } from "../characterManager.ts";
import { locale } from "../i18n/locale.ts";

function encodeId(entity: kanka.KankaEntity): string {
    return encodeBase64Url(entity.id.toString());
}

function parseLabel<T extends object>(o: T, key: string): string {
    const result = Object.entries(o).find(data => data[0].toLowerCase() == key.toLowerCase());
    return result ? result[1] : "";
}

export const characterManagerRender = (entities: kanka.KankaEntity[], dark: boolean): TsxComplexElement => <html>
<head>
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="/styles/main.css" />
</head>
<body class={dark && "body-dark"}>
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
        <li>
            <a href={`${config.host}/${dark ? "dark": ""}?id=${encodeId(entity)}`}>{entity.name}</a>
            <ul>{keys(ApplyType).filter(e => isNaN(parseInt(e))).map(key =>
                <li>
                    <a href={`${config.host}/apply?id=${encodeId(entity)}&type=${key}`}>+ {parseLabel(locale.apply, key)}</a>
                </li>)}
            </ul>
        </li>
    )}
    </ul>
</body>
</html>

