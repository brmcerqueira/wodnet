import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { config } from "../config.ts";
import { keys } from "../utils.ts";

const CircleFill: TsxComplexElement = <i class="bi bi-circle-fill" />
const Circle: TsxComplexElement = <i class="bi bi-circle" />
const SquareFill: TsxComplexElement = <i class="bi bi-square-fill" />
const XSquare: TsxComplexElement = <i class="bi bi-x-square" />
const SlashSquare: TsxComplexElement = <i class="bi bi-slash-square" />
const Square: TsxComplexElement = <i class="bi bi-square" />

function treatDetails(text: string): string {
    const index = text.indexOf("[");
    return text.substring(0, index > -1 ? index : text.length);
}

function treatDiscipline(text: string): { name: string, value: number } {
    const index = text.lastIndexOf("●") + 1;
    return {
        name: text.substring(index).trimStart(),
        value: index
    }
}

const Meter = (properties: { total: number, put: (index: number) => TsxComplexElement }): TsxComplexElement => {
    const indexSpace = properties.total > 5 ? (Math.ceil(properties.total / 2) + 1) : 0;
    const elements: TsxComplexElement[] = [];
    for (let i = 1; i <= properties.total; i++) {
        if (i == indexSpace) {
            elements.push(<i>&ensp;</i>);
        }

        elements.push(properties.put(i));
    }
    return <>{elements}</>;
}

const DualMeter = (properties: { value: number, total: number, empty: TsxComplexElement, fill: TsxComplexElement }): TsxComplexElement =>
    <Meter total={properties.total} put={i => i <= properties.value ? properties.fill : properties.empty} />;

const Dots = (properties: { value: number, total: number }): TsxComplexElement =>
    <DualMeter value={properties.value} total={properties.total} empty={Circle} fill={CircleFill} />;

const Damage = (properties: { superficial: number, aggravated: number, total: number }): TsxComplexElement => {
    const indexSuperficial = properties.aggravated + properties.superficial;
    let indexAggravated = properties.aggravated;
    if (indexSuperficial > properties.total) {
        indexAggravated += indexSuperficial - properties.total;
    }
    return <Meter total={properties.total} put={i => {
        if (i <= indexAggravated) {
            return XSquare;
        }
        else if (i <= indexSuperficial) {
            return SlashSquare;
        }
        else {
            return Square;
        }
    }} />;
}

const Humanity = (properties: { total: number, stains: number }): TsxComplexElement => {
    const max = 10;
    return <Meter total={max} put={i => {
        if (i <= properties.total) {
            return SquareFill;
        }
        else if (i <= max - properties.stains) {
            return Square;
        }
        else {
            return SlashSquare;
        }
    }} />;
}

export const characterRender = (character: Character, campaignId: number, id: string, dark: boolean, update: number): TsxComplexElement => {
    const title = character.player != null && character.player != "" ? `${character.name} (${character.player})` : character.name;

    return <html>
        <head>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={locale.app} />
            <meta property="og:image" content={character.image} />
            <meta property="og:url" content={`${config.host}/${dark ? "dark" : ""}?campaignId=${campaignId}&id=${id}`} />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            <link media="all" rel="stylesheet" href="characterRender.css" />
            <script>{`
                    setInterval(async () => {
                        const response = await fetch("check?campaignId=${campaignId}&id=${id}", {
                            method: "GET"
                        });
                    
                        const data = await response.json();
                    
                        if (data.update) {
                            window.location.reload();
                        }
                    }, ${update});
                `}</script>
        </head>
        <body class={dark && "body-dark"}>
            <div class="container">
                <div class="row align-items-end">
                    <div class="col-sm-2"><img class="float-end" src={character.image} alt={character.name} /></div>
                    <div class="col-sm-10">
                        <div class="row align-items-center">
                            <div class="col"><b>{locale.name}:</b> {character.name}</div>
                            <div class="col"><b>{locale.resonance.name}:</b> {character.resonance}</div>
                            <div class="col"><b>{locale.predator.name}:</b> {character.predator}</div>
                        </div>
                        <div class="row  align-items-center">
                            <div class="col"><b>{locale.player}:</b> {character.player}</div>
                            <div class="col"><b>{locale.ambition}:</b> {character.ambition}</div>
                            <div class="col"><b>{locale.clan.name}:</b> {character.clan}</div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col"><b>{locale.experience.name}:</b> {character.experience.total} / {character.experience.spent}</div>
                            <div class="col"><b>{locale.desire}:</b> {character.desire}</div>
                            <div class="col"><b>{locale.generation.name}:</b> {character.generation}{locale.generation.suffix}</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="container">
                <div class="row align-items-center">
                    <div class="col text-center"><b>{locale.attributes.name}</b></div>
                </div>
                <div class="row align-items-center mb-2">
                    <div class="col text-center"><b>{locale.physical}</b></div>
                    <div class="col text-center"><b>{locale.social}</b></div>
                    <div class="col text-center"><b>{locale.mental}</b></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.attributes.physical.strength}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.physical.strength} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.social.charisma}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.social.charisma} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.mental.intelligence}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.mental.intelligence} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.attributes.physical.dexterity}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.physical.dexterity} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.social.manipulation}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.social.manipulation} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.mental.wits}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.mental.wits} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.attributes.physical.stamina}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.physical.stamina} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.social.composure}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.social.composure} total={5} /></div>
                    <div class="col text-end"><b>{locale.attributes.mental.resolve}</b></div>
                    <div class="col text-center"><Dots value={character.attributes.mental.resolve} total={5} /></div>
                </div>
            </div>
            <hr />
            <div class="container">
                <div class="row align-items-center">
                    <div class="col text-center"><b>{locale.bloodPotency}</b></div>
                    <div class="col text-center"><b>{locale.health}</b></div>
                    <div class="col text-center"><b>{locale.hunger}</b></div>
                    <div class="col text-center"><b>{locale.willpower}</b></div>
                    <div class="col text-center"><b>{locale.humanity}</b></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-center"><Dots value={character.bloodPotency} total={10} /></div>
                    <div class="col text-center"><Damage superficial={character.health.superficial} aggravated={character.health.aggravated} total={character.attributes.physical.stamina + 3} /></div>
                    <div class="col text-center"><DualMeter value={character.hunger} total={5} empty={Square} fill={XSquare} /></div>
                    <div class="col text-center"><Damage superficial={character.willpower.superficial} aggravated={character.willpower.aggravated} total={character.attributes.social.composure + character.attributes.mental.resolve} /></div>
                    <div class="col text-center"><Humanity total={character.humanity.total} stains={character.humanity.stains} /></div>
                </div>
            </div>
            <hr />
            <div class="container">
                <div class="row align-items-center">
                    <div class="col text-center"><b>{locale.skills.name}</b></div>
                </div>
                <div class="row align-items-center mb-2">
                    <div class="col text-center"><b>{locale.physical}</b></div>
                    <div class="col text-center"><b>{locale.social}</b></div>
                    <div class="col text-center"><b>{locale.mental}</b></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.melee}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.melee} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.animalKen}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.animalKen} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.science}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.science} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.firearms}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.firearms} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.etiquette}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.etiquette} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.academics}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.academics} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.athletics}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.athletics} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.intimidation}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.intimidation} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.finance}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.finance} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.brawl}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.brawl} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.leadership}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.leadership} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.investigation}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.investigation} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.drive}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.drive} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.streetwise}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.streetwise} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.medicine}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.medicine} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.stealth}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.stealth} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.performance}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.performance} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.occult}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.occult} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.larceny}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.larceny} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.persuasion}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.persuasion} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.awareness}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.awareness} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.craft}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.craft} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.insight}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.insight} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.politics}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.politics} total={5} /></div>
                </div>
                <div class="row align-items-center">
                    <div class="col text-end"><b>{locale.skills.physical.survival}</b></div>
                    <div class="col text-center"><Dots value={character.skills.physical.survival} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.social.subterfuge}</b></div>
                    <div class="col text-center"><Dots value={character.skills.social.subterfuge} total={5} /></div>
                    <div class="col text-end"><b>{locale.skills.mental.technology}</b></div>
                    <div class="col text-center"><Dots value={character.skills.mental.technology} total={5} /></div>
                </div>
            </div>
            <hr />
            <div class="container">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="row align-items-center mb-2">
                            <div class="col text-center"><b>{locale.specialties.name}</b></div>
                        </div>
                        {keys(character.specialties).map(skill => character.specialties[skill].map(specialty =>
                            <div class="row align-items-center">
                                <div class="col text-end">{treatDetails(specialty)}</div>
                                <div class="col text-start">({skill})</div>
                            </div>))}
                    </div>
                    <div class="col-sm-5">
                        <div class="row align-items-center mb-2">
                            <div class="col text-center"><b>{locale.advantages}</b></div>
                        </div>
                        {keys(character.advantages).map(key =>
                            <div class="row align-items-center">
                                <div class="col text-end">{treatDetails(key as string)}</div>
                                <div class="col text-center"><Dots value={character.advantages[key]} total={5} /></div>
                            </div>)}
                    </div>
                    <div class="col-sm-5">
                        <div class="row align-items-center mb-2">
                            <div class="col text-center"><b>{locale.flaws}</b></div>
                        </div>
                        {keys(character.flaws).map(key =>
                            <div class="row align-items-center">
                                <div class="col text-end">{treatDetails(key as string)}</div>
                                <div class="col text-center"><Dots value={character.flaws[key]} total={5} /></div>
                            </div>)}
                    </div>
                </div>
            </div>
            <hr />
            <div class="container">
                <div class="row align-items-center mb-2">
                    <div class="col text-center"><b>{locale.disciplines.name}</b></div>
                </div>
                <div class="row row-cols-3">
                    {keys(character.disciplines).map(key =>
                        <div class="col mb-5">
                            <div class="row align-items-center mb-2">
                                <div class="col text-end"><b>{locale.disciplines[key].name}</b></div>
                                <div class="col text-center"><Dots value={character.disciplines[key]!.length} total={5} /></div>
                            </div>
                            {character.disciplines[key]?.map(name => {
                                const discipline = treatDiscipline(name);
                                return <div class="row align-items-center">
                                    <div class="col text-end"><Dots value={discipline.value} total={discipline.value} /></div>
                                    <div class="col text-start">{discipline.name}</div>
                                </div>
                            })}
                        </div>)}
                </div>
            </div>
        </body>
    </html>
}