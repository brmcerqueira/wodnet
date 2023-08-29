import React, { TsxComplexElement, TsxElement, TsxProperties } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { config } from "../config.ts";

const FilledCircle: TsxComplexElement = <span class="meter filledCircle"></span>
const BlankCircle: TsxComplexElement = <span class="meter blankCircle"></span>
const FilledSquare: TsxComplexElement = <span class="meter filledSquare"></span>
const HalfSquare: TsxComplexElement = <span class="meter halfSquare"></span>
const BlankSquare: TsxComplexElement = <span class="meter blankSquare"></span>

function meter(total: number, put: (index: number) => TsxComplexElement): TsxComplexElement[] {
    const indexSpace = total > 5 ? (Math.ceil(total / 2) + 1) : 0;
    const elements: TsxComplexElement[] = [];
    for (let i = 1; i <= total; i++) {
        if (i == indexSpace) {
            elements.push(<i>&ensp;</i>);
        }

        elements.push(put(i));
    }
    return elements;
}

function dualMeter(value: number, total: number, blank: TsxComplexElement, filled: TsxComplexElement): TsxComplexElement[] {
    return meter(total, i => i <= value ? filled : blank);
}

function dots(value: number, total: number): TsxComplexElement[] {
    return dualMeter(value, total, BlankCircle, FilledCircle);
}

function damage(superficial: number, aggravated: number, total: number): TsxComplexElement[] {
    const indexSuperficial = aggravated + superficial;
    let indexAggravated = aggravated;
    if (indexSuperficial > total) {
        indexAggravated += indexSuperficial - total;
    }
    return meter(total, i => {
        if (i <= indexAggravated) {
            return FilledSquare;
        }
        else if (i <= indexSuperficial) {
            return HalfSquare;
        }
        else {
            return BlankSquare;
        }
    });
}

function humanity(total: number, stains: number): TsxComplexElement[] {
    const max = 10;
    return meter(max, i => {
        if (i <= total) {
            return FilledSquare;
        }
        else if (i <= max - stains) {
            return BlankSquare;
        }
        else {
            return HalfSquare;
        }
    });
}

const Svg = (properties: {name: string, viewBox: string, height: string, dark: boolean}, children: TsxElement[]): TsxComplexElement => 
<>
--{properties.name}: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height={properties.height} viewBox={properties.viewBox}>{properties.dark && "<style>svg { fill: white } <\\/style>"}{children}</svg>');
</>

const SvgStyle = (_properties: TsxProperties, children: TsxElement[]): TsxComplexElement => 
<style>:root {"{"}{children}{"}"}</style>

export const characterRender = (character: Character, campaignId: number, id: string, dark: boolean): TsxComplexElement => {
    const title = character.player != null && character.player != "" ? `${character.name} (${character.player})` : character.name;

    return <html><head>
        <title>{title}</title>
        <meta http-equiv="Content-Type" content="application/html; charset=utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={locale.app} />
        <meta property="og:image" content={character.image} />
        <meta property="og:url" content={`${config.host}/${dark ? "dark" : ""}?campaignId=${campaignId}&id=${id}`} />
        <SvgStyle>
            <Svg name="filledCircle" viewBox="0 0 512 512" height="1.8em" dark={dark}>
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </Svg>
            <Svg name="blankCircle" viewBox="0 0 512 512" height="1.8em" dark={dark}>
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </Svg>
            <Svg name="filledSquare" viewBox="0 0 448 512" height="2em" dark={dark}>
                <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
            </Svg>
            <Svg name="halfSquare" viewBox="0 0 448 512" height="2em" dark={dark}>
                <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </Svg>
            <Svg name="blankSquare" viewBox="0 0 448 512" height="2em" dark={dark}>
                <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
            </Svg>
        </SvgStyle>
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
        }, 5000);
    `}</script>
    </head>
        <body class={dark ? "body-dark" : ""}>
            <img src={character.image} alt={character.name} />
            <table class="table-head">
                <tbody>
                    <tr><td>{locale.name}:</td><td>{character.name}</td><td>{locale.resonance.name}:</td><td>{character.resonance}</td><td>{locale.predator.name}:</td><td>{character.predator}</td></tr>
                    <tr><td>{locale.player}:</td><td>{character.player}</td><td>{locale.ambition}:</td><td>{character.ambition}</td><td>{locale.clan.name}:</td><td>{character.clan}</td></tr>
                    <tr><td>{locale.experience.name}:</td><td>{character.experience.total} / {character.experience.spent}</td><td>{locale.desire}:</td><td>{character.desire}</td><td>{locale.generation.name}:</td><td>{character.generation}{locale.generation.suffix}</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="6">{locale.attributes.name}</th></tr>
                    <tr><th colspan="2">{locale.physical}</th><th colspan="2">{locale.social}</th><th colspan="2">{locale.mental}</th></tr>
                </thead>
                <tbody>
                    <tr><td>{locale.attributes.physical.strength}</td><td>{dots(character.attributes.physical.strength, 5)}</td><td>{locale.attributes.social.charisma}</td><td>{dots(character.attributes.social.charisma, 5)}</td><td>{locale.attributes.mental.intelligence}</td><td>{dots(character.attributes.mental.intelligence, 5)}</td></tr>
                    <tr><td>{locale.attributes.physical.dexterity}</td><td>{dots(character.attributes.physical.dexterity, 5)}</td><td>{locale.attributes.social.manipulation}</td><td>{dots(character.attributes.social.manipulation, 5)}</td><td>{locale.attributes.mental.wits}</td><td>{dots(character.attributes.mental.wits, 5)}</td></tr>
                    <tr><td>{locale.attributes.physical.stamina}</td><td>{dots(character.attributes.physical.stamina, 5)}</td><td>{locale.attributes.social.composure}</td><td>{dots(character.attributes.social.composure, 5)}</td><td>{locale.attributes.mental.resolve}</td><td>{dots(character.attributes.mental.resolve, 5)}</td></tr>
                </tbody>
            </table>
            <hr />
            <table class="table-details">
                <thead>
                    <tr><th>{locale.bloodPotency}</th><th>{locale.health}</th><th>{locale.hunger}</th><th>{locale.willpower}</th><th>{locale.humanity}</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="td-large">{dots(character.bloodPotency, 10)}</td>
                        <td class="td-large">{damage(character.health.superficial, character.health.aggravated, character.attributes.physical.stamina + 3)}</td>
                        <td class="td-large">{dualMeter(character.hunger, 5, BlankSquare, FilledSquare)}</td>
                        <td class="td-large">{damage(character.willpower.superficial, character.willpower.aggravated, character.attributes.social.composure + character.attributes.mental.resolve)}</td>
                        <td class="td-large">{humanity(character.humanity.total, character.humanity.stains)}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="6">{locale.skills.name}</th></tr>
                    <tr><th colspan="2">{locale.physical}</th><th colspan="2">{locale.social}</th><th colspan="2">{locale.mental}</th></tr>
                </thead>
                <tbody>
                    <tr><td>{locale.skills.physical.melee}</td><td>{dots(character.skills.physical.melee, 5)}</td><td>{locale.skills.social.animalKen}</td><td>{dots(character.skills.social.animalKen, 5)}</td><td>{locale.skills.mental.science}</td><td>{dots(character.skills.mental.science, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.firearms}</td><td>{dots(character.skills.physical.firearms, 5)}</td><td>{locale.skills.social.etiquette}</td><td>{dots(character.skills.social.etiquette, 5)}</td><td>{locale.skills.mental.academics}</td><td>{dots(character.skills.mental.academics, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.athletics}</td><td>{dots(character.skills.physical.athletics, 5)}</td><td>{locale.skills.social.intimidation}</td><td>{dots(character.skills.social.intimidation, 5)}</td><td>{locale.skills.mental.finance}</td><td>{dots(character.skills.mental.finance, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.brawl}</td><td>{dots(character.skills.physical.brawl, 5)}</td><td>{locale.skills.social.leadership}</td><td>{dots(character.skills.social.leadership, 5)}</td><td>{locale.skills.mental.investigation}</td><td>{dots(character.skills.mental.investigation, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.drive}</td><td>{dots(character.skills.physical.drive, 5)}</td><td>{locale.skills.social.streetwise}</td><td>{dots(character.skills.social.streetwise, 5)}</td><td>{locale.skills.mental.medicine}</td><td>{dots(character.skills.mental.medicine, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.stealth}</td><td>{dots(character.skills.physical.stealth, 5)}</td><td>{locale.skills.social.performance}</td><td>{dots(character.skills.social.performance, 5)}</td><td>{locale.skills.mental.occult}</td><td>{dots(character.skills.mental.occult, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.larceny}</td><td>{dots(character.skills.physical.larceny, 5)}</td><td>{locale.skills.social.persuasion}</td><td>{dots(character.skills.social.persuasion, 5)}</td><td>{locale.skills.mental.awareness}</td><td>{dots(character.skills.mental.awareness, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.craft}</td><td>{dots(character.skills.physical.craft, 5)}</td><td>{locale.skills.social.insight}</td><td>{dots(character.skills.social.insight, 5)}</td><td>{locale.skills.mental.politics}</td><td>{dots(character.skills.mental.politics, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.survival}</td><td>{dots(character.skills.physical.survival, 5)}</td><td>{locale.skills.social.subterfuge}</td><td>{dots(character.skills.social.subterfuge, 5)}</td><td>{locale.skills.mental.technology}</td><td>{dots(character.skills.mental.technology, 5)}</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="8">Disciplinas</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                    </tr>
                    <tr>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                    </tr>
                    <tr>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                        <td>____________</td><td>○○○○○</td>
                    </tr>
                    <tr>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                        <td colspan="2">1 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                        <td colspan="2">2 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                        <td colspan="2">3 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                        <td colspan="2">4 ___________________</td>
                    </tr>
                    <tr>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                        <td colspan="2">5 ___________________</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table class="table-advantages">
                <thead>
                    <tr><th colspan="2">Vantagens</th></tr>
                </thead>
                <tbody>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                    <tr><td>___________________</td><td>○○○○○</td></tr>
                </tbody>
            </table>
            <section class="section-status">
                <section>
                    <h3>Vitalidade</h3>
                    <p>○○○○○ ○○○○○</p>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Força de Vontade</h3>
                    <p>○○○○○ ○○○○○</p>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Potência de Sangue</h3>
                    <p>○○○○○ ○○○○○</p>
                </section>
                <section>
                    <h3>Humanidade</h3>
                    <p>□□□□□ □□□□□</p>
                </section>
                <section>
                    <h3>Fome</h3>
                    <p>□□□□□</p>
                </section>
                <section class="section-experience">
                    <h5>Experiência</h5><br /><br /><br />
                </section>
            </section>
            <section class="section-details">
                <table>
                    <thead>
                        <tr><th colspan="2">Especializações</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                        <tr><td>______________</td><td>(__________)</td></tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr><th>Alicerces &amp; Convicções</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                        <tr><td>__________________________</td></tr>
                    </tbody>
                </table>
            </section>
            <hr />
            <p>{JSON.stringify(character)}</p>
        </body></html>
}