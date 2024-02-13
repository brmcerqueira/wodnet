import React, { TsxComplexElement, encodeBase64Url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";
import { locale } from "../i18n/locale.ts";

function encodeId(entity: kanka.KankaEntity): string {
    return encodeBase64Url(entity.id.toString());
}

export const characterManagerRender = (entities: kanka.KankaEntity[], dark: boolean): TsxComplexElement => <html>
<head>
    <title>{locale.app}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="/styles/main.css" />
    <script src="/scripts/characterManagerScript.js" />
</head>
<body class={dark && "body-dark"}>
    <div class="container">
        <div class="list-group">
        {entities.map(entity => <a class="list-group-item list-group-item-action" href={`${config.host}/${dark ? "dark": ""}?id=${encodeId(entity)}`}>{entity.name}</a>)}
        </div>
        <form>
            <div class="mb-3">
                <label class="form-label">{locale.character}</label>
                <select class="form-select" aria-label="Default select example">
                    {entities.map((entity, index) => <option selected={index == 0} value={encodeId(entity)}>{entity.name}</option>)}
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>
</html>

