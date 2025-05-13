import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { keys } from "../utils.ts";
import { Dots, localeSkill, treatDetails } from "./masterView.tsx";

export const AdvantagesView = (
  properties: {
    character: Character;
  },
): TsxComplexElement => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-2 mb-2">
          <div class="row align-items-center mb-2">
            <div class="col text-center">
              <b>{locale.specialties.name}</b>
            </div>
          </div>
          {keys(properties.character.specialties).map((skill) =>
            properties.character.specialties[skill].map((specialty) => (
              <div class="row align-items-center">
                <div class="col text-end">{treatDetails(specialty)}</div>
                <div class="col text-start">({localeSkill(skill)})</div>
              </div>
            ))
          )}
        </div>
        <div class="col-sm-5 mb-2">
          <div class="row align-items-center mb-2">
            <div class="col text-center">
              <b>{locale.advantages}</b>
            </div>
          </div>
          {keys(properties.character.advantages).map((key) => (
            <div class="row align-items-center">
              <div class="col text-end">{treatDetails(key as string)}</div>
              <div class="col text-center">
                <Dots value={properties.character.advantages[key]} total={5} />
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-5 mb-2">
          <div class="row align-items-center mb-2">
            <div class="col text-center">
              <b>{locale.flaws}</b>
            </div>
          </div>
          {keys(properties.character.flaws).map((key) => (
            <div class="row align-items-center">
              <div class="col text-end">{treatDetails(key as string)}</div>
              <div class="col text-center">
                <Dots value={properties.character.flaws[key]} total={5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
