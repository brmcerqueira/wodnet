import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { config } from "../config.ts";

const filledSquare = "▣";
const halfSquare = "◪";
const blankSquare = "▢";

function meter(total: number, put: (index: number) => string): string {
    const indexSpace = total > 5 ? (Math.ceil(total / 2) + 1) : 0;
    let text = "";
    for (let i = 1; i <= total; i++) {
        if (i == indexSpace) {
            text += " ";
        }

        text += put(i);
    }
    return text;
}

function dualMeter(value: number, total: number, blank: string, filled: string): string {
    return meter(total, i => i <= value ? filled : blank);
}

function dots(value: number, total: number): string {
    return dualMeter(value, total, "○", "●");
}

function damage(superficial: number, aggravated: number, total: number): string {
    const indexSuperficial = aggravated + superficial;
    let indexAggravated = aggravated;
    if (indexSuperficial > total) {
        indexAggravated += indexSuperficial - total;
    }
    return meter(total, i => {
        if (i <= indexAggravated) {
            return filledSquare;
        } 
        else if (i <= indexSuperficial) {
            return halfSquare;
        } 
        else {
            return blankSquare;
        }
    });
}

function humanity(total: number, stains: number): string {
    const max = 10;
    return meter(max, i => {
        if (i <= total) {
            return filledSquare;
        } 
        else if (i <= max - stains) {
            return blankSquare;
        } 
        else {
            return halfSquare;
        }
    });
}

export const characterRender = (character: Character, campaignId: number, id: string, dark: boolean): TsxComplexElement => {
    const title = character.player != null && character.player != "" ? `${character.name} (${character.player})` : character.name;

    return <html><head>
        <title>{title}</title>
        <meta http-equiv="Content-Type" content="application/html; charset=utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={locale.app} />
        <meta property="og:image" content={character.image} />
        <meta property="og:url" content={`${config.host}/${dark ? "dark" : ""}?campaignId=${campaignId}&id=${id}`} />
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
                    <tr><td>{locale.sire}:</td><td>{character.sire}</td><td>{locale.desire}:</td><td>{character.desire}</td><td>{locale.generation.name}:</td><td>{character.generation}{locale.generation.suffix}</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="6">{locale.attributes.name}</th></tr>
                    <tr><th colspan="2">{locale.physical}</th><th colspan="2">{locale.social}</th><th colspan="2">{locale.mental}</th></tr>
                </thead>
                <tbody>
                    <tr><td>{locale.attributes.physical.strength}</td><td class="td-large">{dots(character.attributes.physical.strength, 5)}</td><td>{locale.attributes.social.charisma}</td><td class="td-large">{dots(character.attributes.social.charisma, 5)}</td><td>{locale.attributes.mental.intelligence}</td><td class="td-large">{dots(character.attributes.mental.intelligence, 5)}</td></tr>
                    <tr><td>{locale.attributes.physical.dexterity}</td><td class="td-large">{dots(character.attributes.physical.dexterity, 5)}</td><td>{locale.attributes.social.manipulation}</td><td class="td-large">{dots(character.attributes.social.manipulation, 5)}</td><td>{locale.attributes.mental.wits}</td><td class="td-large">{dots(character.attributes.mental.wits, 5)}</td></tr>
                    <tr><td>{locale.attributes.physical.stamina}</td><td class="td-large">{dots(character.attributes.physical.stamina, 5)}</td><td>{locale.attributes.social.composure}</td><td class="td-large">{dots(character.attributes.social.composure, 5)}</td><td>{locale.attributes.mental.resolve}</td><td class="td-large">{dots(character.attributes.mental.resolve, 5)}</td></tr>
                </tbody>
            </table>
            <hr />
            <table class="table-details">
                <thead>
                    <tr><th>{locale.bloodPotency}</th><th>{locale.health}</th><th>{locale.hunger}</th><th>{locale.willpower}</th><th>{locale.humanity}</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="td-dots">{dots(character.bloodPotency, 10)}</td>
                        <td class="td-boxes">{damage(character.health.superficial, character.health.aggravated, character.attributes.physical.stamina + 3)}</td>
                        <td class="td-boxes">{dualMeter(character.hunger, 5, blankSquare, filledSquare)}</td>
                        <td class="td-boxes">{damage(character.willpower.superficial, character.willpower.aggravated, character.attributes.social.composure + character.attributes.mental.resolve)}</td>
                        <td class="td-boxes">{humanity(character.humanity.total, character.humanity.stains)}</td>
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
                    <tr><td>{locale.skills.physical.melee}</td><td class="td-large">{dots(character.skills.physical.melee, 5)}</td><td>{locale.skills.social.animalKen}</td><td class="td-large">{dots(character.skills.social.animalKen, 5)}</td><td>{locale.skills.mental.science}</td><td class="td-large">{dots(character.skills.mental.science, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.firearms}</td><td class="td-large">{dots(character.skills.physical.firearms, 5)}</td><td>{locale.skills.social.etiquette}</td><td class="td-large">{dots(character.skills.social.etiquette, 5)}</td><td>{locale.skills.mental.academics}</td><td class="td-large">{dots(character.skills.mental.academics, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.athletics}</td><td class="td-large">{dots(character.skills.physical.athletics, 5)}</td><td>{locale.skills.social.intimidation}</td><td class="td-large">{dots(character.skills.social.intimidation, 5)}</td><td>{locale.skills.mental.finance}</td><td class="td-large">{dots(character.skills.mental.finance, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.brawl}</td><td class="td-large">{dots(character.skills.physical.brawl, 5)}</td><td>{locale.skills.social.leadership}</td><td class="td-large">{dots(character.skills.social.leadership, 5)}</td><td>{locale.skills.mental.investigation}</td><td class="td-large">{dots(character.skills.mental.investigation, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.drive}</td><td class="td-large">{dots(character.skills.physical.drive, 5)}</td><td>{locale.skills.social.streetwise}</td><td class="td-large">{dots(character.skills.social.streetwise, 5)}</td><td>{locale.skills.mental.medicine}</td><td class="td-large">{dots(character.skills.mental.medicine, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.stealth}</td><td class="td-large">{dots(character.skills.physical.stealth, 5)}</td><td>{locale.skills.social.performance}</td><td class="td-large">{dots(character.skills.social.performance, 5)}</td><td>{locale.skills.mental.occult}</td><td class="td-large">{dots(character.skills.mental.occult, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.larceny}</td><td class="td-large">{dots(character.skills.physical.larceny, 5)}</td><td>{locale.skills.social.persuasion}</td><td class="td-large">{dots(character.skills.social.persuasion, 5)}</td><td>{locale.skills.mental.awareness}</td><td class="td-large">{dots(character.skills.mental.awareness, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.craft}</td><td class="td-large">{dots(character.skills.physical.craft, 5)}</td><td>{locale.skills.social.insight}</td><td class="td-large">{dots(character.skills.social.insight, 5)}</td><td>{locale.skills.mental.politics}</td><td class="td-large">{dots(character.skills.mental.politics, 5)}</td></tr>
                    <tr><td>{locale.skills.physical.survival}</td><td class="td-large">{dots(character.skills.physical.survival, 5)}</td><td>{locale.skills.social.subterfuge}</td><td class="td-large">{dots(character.skills.social.subterfuge, 5)}</td><td>{locale.skills.mental.technology}</td><td class="td-large">{dots(character.skills.mental.technology, 5)}</td></tr>
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr><th colspan="8">Disciplinas</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
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
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
                        <td>____________</td><td class="td-large">○○○○○</td>
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
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
                    <tr><td>___________________</td><td class="td-large">○○○○○</td></tr>
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