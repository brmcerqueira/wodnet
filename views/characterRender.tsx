import React, { TsxComplexElement, TsxElement, TsxProperties } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { config } from "../config.ts";
import { keys } from "../utils.ts";

const FilledCircle: TsxComplexElement = <span class="meter filled-circle"/>
const BlankCircle: TsxComplexElement = <span class="meter blank-circle"/>
const FilledSquare: TsxComplexElement = <span class="meter filled-square"/>
const HalfSquare: TsxComplexElement = <span class="meter half-square"/>
const BlankSquare: TsxComplexElement = <span class="meter blank-square"/>

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

const Meter = (properties: {total: number, put: (index: number) => TsxComplexElement}): TsxComplexElement => {
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

const DualMeter = (properties: {value: number, total: number, blank: TsxComplexElement, filled: TsxComplexElement}): TsxComplexElement => 
<Meter total={properties.total} put={ i => i <= properties.value ? properties.filled : properties.blank}/>;

const Dots = (properties: {value: number, total: number}): TsxComplexElement => 
<DualMeter value={properties.value} total={properties.total} blank={BlankCircle} filled={FilledCircle}/>;

const Damage = (properties: {superficial: number, aggravated: number, total: number}): TsxComplexElement => {
    const indexSuperficial = properties.aggravated + properties.superficial;
    let indexAggravated = properties.aggravated;
    if (indexSuperficial > properties.total) {
        indexAggravated += indexSuperficial - properties.total;
    }
    return <Meter total={properties.total} put={i => {
        if (i <= indexAggravated) {
            return FilledSquare;
        }
        else if (i <= indexSuperficial) {
            return HalfSquare;
        }
        else {
            return BlankSquare;
        }
    }}/>;
}

const Humanity = (properties: {total: number, stains: number}): TsxComplexElement => {
    const max = 10;
    return <Meter total={max} put={i => {
        if (i <= properties.total) {
            return FilledSquare;
        }
        else if (i <= max - properties.stains) {
            return BlankSquare;
        }
        else {
            return HalfSquare;
        }
    }}/>;
}

const Svg = (properties: {name: string, viewBox: string, height: string, dark: boolean}, children: TsxElement[]): TsxComplexElement => 
<>
--{properties.name}: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height={properties.height} viewBox={properties.viewBox}>{properties.dark && "<style>svg { fill: white } <\\/style>"}{children}</svg>');
</>

const SvgStyle = (_properties: TsxProperties, children: TsxElement[]): TsxComplexElement => 
<style>:root {"{"}{children}{"}"}</style>

export const characterRender = (character: Character, campaignId: number, id: string, dark: boolean, update: number): TsxComplexElement => {
    const title = character.player != null && character.player != "" ? `${character.name} (${character.player})` : character.name;

    return <html><head>
        <title>{title}</title>
        <meta http-equiv="Content-Type" content="application/html; charset=utf-8" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={locale.app} />
        <meta property="og:image" content={character.image} />
        <meta property="og:url" content={`${config.host}/${dark ? "dark" : ""}?campaignId=${campaignId}&id=${id}`} />
        <SvgStyle>
            <Svg name="filled-circle" viewBox="0 0 512 512" height="1em" dark={dark}>
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </Svg>
            <Svg name="blank-circle" viewBox="0 0 512 512" height="1em" dark={dark}>
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </Svg>
            <Svg name="filled-square" viewBox="0 0 448 512" height="1.2em" dark={dark}>
                <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
            </Svg>
            <Svg name="half-square" viewBox="0 0 448 512" height="1.2em" dark={dark}>
                <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </Svg>
            <Svg name="blank-square" viewBox="0 0 448 512" height="1.2em" dark={dark}>
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
        }, ${update});
    `}</script>
    </head>
        <body class={dark && "body-dark"}>
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
                    <tr><td>{locale.attributes.physical.strength}</td><td><Dots value={character.attributes.physical.strength} total={5}/></td><td>{locale.attributes.social.charisma}</td><td><Dots value={character.attributes.social.charisma} total={5}/></td><td>{locale.attributes.mental.intelligence}</td><td><Dots value={character.attributes.mental.intelligence} total={5}/></td></tr>
                    <tr><td>{locale.attributes.physical.dexterity}</td><td><Dots value={character.attributes.physical.dexterity} total={5}/></td><td>{locale.attributes.social.manipulation}</td><td><Dots value={character.attributes.social.manipulation} total={5}/></td><td>{locale.attributes.mental.wits}</td><td><Dots value={character.attributes.mental.wits} total={5}/></td></tr>
                    <tr><td>{locale.attributes.physical.stamina}</td><td><Dots value={character.attributes.physical.stamina} total={5}/></td><td>{locale.attributes.social.composure}</td><td><Dots value={character.attributes.social.composure} total={5}/></td><td>{locale.attributes.mental.resolve}</td><td><Dots value={character.attributes.mental.resolve} total={5}/></td></tr>
                </tbody>
            </table>
            <hr />
            <table class="table-status">
                <thead>
                    <tr><th>{locale.bloodPotency}</th><th>{locale.health}</th><th>{locale.hunger}</th><th>{locale.willpower}</th><th>{locale.humanity}</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Dots value={character.bloodPotency} total={10}/></td>
                        <td><Damage superficial={character.health.superficial} aggravated={character.health.aggravated} total={character.attributes.physical.stamina + 3}/></td>
                        <td><DualMeter value={character.hunger} total={5} blank={BlankSquare} filled={FilledSquare}/></td>
                        <td><Damage superficial={character.willpower.superficial} aggravated={character.willpower.aggravated} total={character.attributes.social.composure + character.attributes.mental.resolve}/></td>
                        <td><Humanity total={character.humanity.total} stains={character.humanity.stains}/></td>
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
                    <tr><td>{locale.skills.physical.melee}</td><td><Dots value={character.skills.physical.melee} total={5}/></td><td>{locale.skills.social.animalKen}</td><td><Dots value={character.skills.social.animalKen} total={5}/></td><td>{locale.skills.mental.science}</td><td><Dots value={character.skills.mental.science} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.firearms}</td><td><Dots value={character.skills.physical.firearms} total={5}/></td><td>{locale.skills.social.etiquette}</td><td><Dots value={character.skills.social.etiquette} total={5}/></td><td>{locale.skills.mental.academics}</td><td><Dots value={character.skills.mental.academics} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.athletics}</td><td><Dots value={character.skills.physical.athletics} total={5}/></td><td>{locale.skills.social.intimidation}</td><td><Dots value={character.skills.social.intimidation} total={5}/></td><td>{locale.skills.mental.finance}</td><td><Dots value={character.skills.mental.finance} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.brawl}</td><td><Dots value={character.skills.physical.brawl} total={5}/></td><td>{locale.skills.social.leadership}</td><td><Dots value={character.skills.social.leadership} total={5}/></td><td>{locale.skills.mental.investigation}</td><td><Dots value={character.skills.mental.investigation} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.drive}</td><td><Dots value={character.skills.physical.drive} total={5}/></td><td>{locale.skills.social.streetwise}</td><td><Dots value={character.skills.social.streetwise} total={5}/></td><td>{locale.skills.mental.medicine}</td><td><Dots value={character.skills.mental.medicine} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.stealth}</td><td><Dots value={character.skills.physical.stealth} total={5}/></td><td>{locale.skills.social.performance}</td><td><Dots value={character.skills.social.performance} total={5}/></td><td>{locale.skills.mental.occult}</td><td><Dots value={character.skills.mental.occult} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.larceny}</td><td><Dots value={character.skills.physical.larceny} total={5}/></td><td>{locale.skills.social.persuasion}</td><td><Dots value={character.skills.social.persuasion} total={5}/></td><td>{locale.skills.mental.awareness}</td><td><Dots value={character.skills.mental.awareness} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.craft}</td><td><Dots value={character.skills.physical.craft} total={5}/></td><td>{locale.skills.social.insight}</td><td><Dots value={character.skills.social.insight} total={5}/></td><td>{locale.skills.mental.politics}</td><td><Dots value={character.skills.mental.politics} total={5}/></td></tr>
                    <tr><td>{locale.skills.physical.survival}</td><td><Dots value={character.skills.physical.survival} total={5}/></td><td>{locale.skills.social.subterfuge}</td><td><Dots value={character.skills.social.subterfuge} total={5}/></td><td>{locale.skills.mental.technology}</td><td><Dots value={character.skills.mental.technology} total={5}/></td></tr>
                </tbody>
            </table>
            <hr />
            <table class="table-details">
                <thead>
                    <tr><th colspan="2">{locale.specialties.name}</th></tr>
                </thead>
                <tbody>{keys(character.specialties).map(skill => character.specialties[skill].map(specialty => <tr><td>{treatDetails(specialty)}</td><td>{skill}</td></tr>))}</tbody>
            </table>
            <table class="table-details">
                <thead>
                    <tr><th colspan="2">{locale.advantages}</th></tr>
                </thead>
                <tbody>{keys(character.advantages).map(key => <tr><td>{treatDetails(key as string)}</td><td><Dots value={character.advantages[key]} total={5}/></td></tr>)}</tbody>
            </table>
            <table class="table-details">
                <thead>
                    <tr><th colspan="2">{locale.flaws}</th></tr>
                </thead>
                <tbody>{keys(character.flaws).map(key => <tr><td>{treatDetails(key as string)}</td><td><Dots value={character.flaws[key]} total={5}/></td></tr>)}</tbody>
            </table>
            <hr />
            <p class="p-discipline">{locale.disciplines.name}</p>
            {keys(character.disciplines).map(key => <table class="table-discipline">
                <thead>
                    <tr><th>{locale.disciplines[key].name}</th><th><Dots value={character.disciplines[key]!.length} total={5}/></th></tr>
                </thead>
                <tbody>{character.disciplines[key]?.map(name => {
                    const discipline = treatDiscipline(name);
                    return <tr><td><Dots value={discipline.value} total={discipline.value}/></td><td>{discipline.name}</td></tr>
                })}</tbody>
                </table>)}
        </body></html>
}