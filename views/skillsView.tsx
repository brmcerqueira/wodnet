import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { Dots } from "./masterView.tsx";

export const SkillsView = (
  properties: {
    character: Character;
  }
): TsxComplexElement => {
  return <div class="container">
    <div class="row align-items-center mb-2">
      <div class="col text-center"><b>{locale.skills.name}</b></div>
    </div>
    <div class="row">
      <div class="col-sm-4 mb-2">
        <div class="row align-items-center mb-2">
          <div class="col text-center"><b>{locale.physical}</b></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.melee}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.melee} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.firearms}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.firearms} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.athletics}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.athletics} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.brawl}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.brawl} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.drive}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.drive} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.stealth}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.stealth} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.larceny}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.larceny} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.craft}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.craft} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.physical.survival}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.physical.survival} total={5} /></div>
        </div>
      </div>
      <div class="col-sm-4 mb-2">
        <div class="row align-items-center mb-2">
          <div class="col text-center"><b>{locale.social}</b></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.animalKen}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.animalKen} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.etiquette}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.etiquette} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.intimidation}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.intimidation} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.leadership}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.leadership} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.streetwise}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.streetwise} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.performance}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.performance} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.persuasion}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.persuasion} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.insight}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.insight} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.social.subterfuge}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.social.subterfuge} total={5} /></div>
        </div>
      </div>
      <div class="col-sm-4 mb-2">
        <div class="row align-items-center mb-2">
          <div class="col text-center"><b>{locale.mental}</b></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.science}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.science} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.academics}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.academics} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.finance}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.finance} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.investigation}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.investigation} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.medicine}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.medicine} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.occult}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.occult} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.awareness}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.awareness} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.politics}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.politics} total={5} /></div>
        </div>
        <div class="row align-items-center">
          <div class="col text-end"><b>{locale.skills.mental.technology}</b></div>
          <div class="col text-center"><Dots value={properties.character.skills.mental.technology} total={5} /></div>
        </div>
      </div>
    </div>
  </div>;
};
