import React, { TsxComplexElement, encodeBase64Url } from "../deps.ts";
import * as kanka from "../kanka.ts";
import { config } from "../config.ts";
import { locale } from "../i18n/locale.ts";
import { ApplyType } from "../applyType.ts";

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
    <script>{`const context = ${JSON.stringify({
                physical: locale.skills.physical,
                social: locale.skills.social,
                mental: locale.skills.mental
            })};`}</script>
    <script src="/scripts/characterManagerScript.js" />
</head>
<body class={dark && "body-dark"}>
    <div class="container">
        <div class="row">
            <div class="list-group">
            {entities.map(entity => <a class="list-group-item list-group-item-action" href={`${config.host}/${dark ? "dark": ""}?id=${encodeId(entity)}`}>{entity.name}</a>)}
            </div>
        </div>
    </div>
    <hr />
    <div class="container">
        <div class="row">
            <form>
                <div class="mb-3">
                    <label class="form-label">{locale.character}</label>
                    <select class="form-select">
                        {entities.map((entity, index) => <option selected={index == 0} value={encodeId(entity)}>{entity.name}</option>)}
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">{locale.type}</label>
                    <select class="form-select" onchange="typeChange(this)">
                        <option selected value={ApplyType.HealthSuperficial}>{locale.health} - {locale.damage.superficial}</option>
                        <option value={ApplyType.WillpowerSuperficial}>{locale.willpower} - {locale.damage.superficial}</option>
                        <option value={ApplyType.HealthAggravated}>{locale.health} - {locale.damage.aggravated}</option>
                        <option value={ApplyType.WillpowerAggravated}>{locale.willpower} - {locale.damage.aggravated}</option>
                        <option value={ApplyType.Experience}>{locale.experience.name}</option>
                        <option value={ApplyType.Advantage}>{locale.advantages}</option>
                        <option value={ApplyType.Flaw}>{locale.flaws}</option>
                        <option value={ApplyType.SpecialtyPhysical}>{locale.specialties.specialty} - {locale.physical}</option>
                        <option value={ApplyType.SpecialtySocial}>{locale.specialties.specialty} - {locale.social}</option>
                        <option value={ApplyType.SpecialtyMental}>{locale.specialties.specialty} - {locale.mental}</option>
                    </select>
                </div>
                <div class="mb-3" id="name" hidden="true">
                    <label for="nameInput" class="form-label">{locale.name}</label>
                    <input type="text" class="form-control" id="nameInput" name="nameInput"/>
                </div>
                <div class="mb-3" id="valueNumber">
                    <label for="valueInput" class="form-label">{locale.value}</label>
                    <input type="number" class="form-control" id="valueInput" name="value" value="0"/>
                </div>
                <div class="mb-3" id="skill" hidden="true">
                    <label class="form-label">{locale.specialties.skill}</label>
                    <select class="form-select" id="skillSelect"></select>
                </div>
                <button type="submit" class="btn btn-primary">{locale.apply}</button>
            </form>
        </div>
    </div>
</body>
</html>

