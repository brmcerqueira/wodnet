import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { Dots } from "./masterView.tsx";

export const AttributesView = (
  properties: {
    character: Character;
  },
): TsxComplexElement => {
  return (
    <div class="container">
      <div class="row align-items-center mb-2">
        <div class="col text-center">
          <b>{locale.attributes.name}</b>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 mb-2">
          <div class="row align-items-center">
            <div class="col text-center mb-2">
              <b>{locale.physical}</b>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.physical.strength}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.physical.strength}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.physical.dexterity}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.physical.dexterity}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.physical.stamina}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.physical.stamina}
                total={5}
              />
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-2">
          <div class="row align-items-center mb-2">
            <div class="col text-center">
              <b>{locale.social}</b>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.social.charisma}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.social.charisma}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.social.manipulation}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.social.manipulation}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.social.composure}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.social.composure}
                total={5}
              />
            </div>
          </div>
        </div>
        <div class="col-sm-4 mb-2">
          <div class="row align-items-center mb-2">
            <div class="col text-center">
              <b>{locale.mental}</b>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.mental.intelligence}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.mental.intelligence}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.mental.wits}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.mental.wits}
                total={5}
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col text-end">
              <b>{locale.attributes.mental.resolve}</b>
            </div>
            <div class="col text-center">
              <Dots
                value={properties.character.attributes.mental.resolve}
                total={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
