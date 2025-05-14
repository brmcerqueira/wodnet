// deno-lint-ignore-file no-explicit-any
import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { AdvantagesView } from "./advantagesView.tsx";
import { AttributesView } from "./attributesView.tsx";
import { DetailsView } from "./detailsView.tsx";
import {
  Damage,
  Dots,
  DualMeter,
  MasterView,
  Square,
  SquareFill,
  SquareX,
} from "./masterView.tsx";
import { SkillsView } from "./skillsView.tsx";
import { keys, treatPower } from "../utils.ts";

function localeGift(gift: string): string {
  for (const groupKey in locale.gifts) {
    if (groupKey != "name") {
      const group = (locale.gifts as any)[groupKey];
      for (const levelGroupKey in group) {
        if (levelGroupKey != "name") {
          const levelGroup = group[levelGroupKey];
          if (levelGroup[gift]) {
            return levelGroup[gift];
          }
        }
      }
    }
  }

  return "";
}

export const WerewolfView = (
  character: Character,
  token: string,
  dark: boolean,
  update: number,
): TsxComplexElement => {
  return (
    <MasterView character={character} token={token} dark={dark} update={update}>
      <div class="container">
        <div class="row align-items-end mt-2">
          <div class="col-sm-4 mb-2 text-center">
            <img
              class="float-sm-end"
              src={character.image}
              alt={character.name}
            />
          </div>
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.name}:</b>
              </div>
              <div
                class="col text-start overflow-ellipsis"
                data-tooltip={character.name}
              >
                {character.name}
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.player}:</b>
              </div>
              <div
                class="col text-start overflow-ellipsis"
                data-tooltip={character.player}
              >
                {character.player}
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.experience.name}:</b>
              </div>
              <div class="col text-start">
                {character.experience.total} - {character.experience.spent} =
                {" "}
                {character.experience.total - character.experience.spent}
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.auspice.name}:</b>
              </div>
              <div class="col text-start">{character.auspice}</div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.tribe.name}:</b>
              </div>
              <div class="col text-start">{character.tribe}</div>
            </div>
            <div class="row align-items-center">
            </div>
          </div>
        </div>
      </div>
      <hr />
      <AttributesView character={character} />
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <div class="row align-items-center">
              <div class="col text-center">
                <b>{locale.harano}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <DualMeter
                  value={character.harano}
                  total={5}
                  empty={Square}
                  fill={SquareFill}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="row align-items-center">
              <div class="col text-center">
                <b>{locale.health}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <Damage
                  superficial={character.health.superficial}
                  aggravated={character.health.aggravated}
                  total={character.attributes.physical.stamina +
                    character.health.start}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="row align-items-center">
              <div class="col text-center">
                <b>{locale.rage}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <DualMeter
                  value={character.hungerOrRage}
                  total={5}
                  empty={Square}
                  fill={SquareX}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-2">
            <div class="row align-items-center">
              <div class="col text-center">
                <b>{locale.willpower}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <Damage
                  superficial={character.willpower.superficial}
                  aggravated={character.willpower.aggravated}
                  total={character.attributes.social.composure +
                    character.attributes.mental.resolve}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="row align-items-center">
              <div class="col text-center">
                <b>{locale.hauglosk}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <DualMeter
                  value={character.hauglosk}
                  total={5}
                  empty={Square}
                  fill={SquareFill}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <SkillsView character={character} />
      <hr />
      <div class="container">
        <div class="row align-items-center mb-2">
          <div class="col text-center">
            <b>{locale.renown.name}</b>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.renown.glory}</b>
              </div>
              <div class="col text-center">
                <Dots
                  value={character.renown.glory}
                  total={5}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.renown.honor}</b>
              </div>
              <div class="col text-center">
                <Dots
                  value={character.renown.honor}
                  total={5}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.renown.wisdom}</b>
              </div>
              <div class="col text-center">
                <Dots
                  value={character.renown.wisdom}
                  total={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <AdvantagesView character={character} />
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center mb-2">
              <div class="col text-center">
                <b>{locale.gifts.name}</b>
              </div>
            </div>
            {keys(character.gifts).map((key) => {
              const value = character.gifts[key];
              const gift = treatPower(localeGift(key as string));
              return (
                <div class="row align-items-center">
                  <div class="col text-end">
                    <Dots value={value} total={value} />
                  </div>
                  <div class="col text-start">{gift.name}</div>
                </div>
              );
            })}
          </div>
          <div class="col-sm-4 mb-2">
            <div class="row align-items-center mb-2">
              <div class="col text-center">
                <b>{locale.rites.name}</b>
              </div>
            </div>
            {character.rites.map((key) => (
              <div class="row align-items-center">
                <div class="col text-end">
                  {(locale.rites.common as any)[key] ||
                    (locale.rites.social as any)[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <DetailsView character={character} />
    </MasterView>
  );
};
