// deno-lint-ignore-file no-explicit-any
import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { keys, treatDiscipline } from "../utils.ts";
import {
  Damage,
  Dots,
  DualMeter,
  MasterView,
  Meter,
  SquareSlash,
  Square,
  SquareFill,
  SquareX,
} from "./masterView.tsx";
import { AttributesView } from "./attributesView.tsx";
import { SkillsView } from "./skillsView.tsx";
import { AdvantagesView } from "./advantagesView.tsx";
import { DetailsView } from "./detailsView.tsx";

const Humanity = (
  properties: { total: number; stains: number },
): TsxComplexElement => {
  const max = 10;
  return (
    <Meter
      total={max}
      put={(i) => {
        if (i <= properties.total) {
          return SquareFill;
        } else if (i <= max - properties.stains) {
          return Square;
        } else {
          return SquareSlash;
        }
      }}
    />
  );
};

export const VampireView = (
  character: Character,
  token: string,
  dark: boolean,
  update: number,
): TsxComplexElement => {
  return (
    <MasterView character={character} token={token} dark={dark} update={update}>
      <div class="container">
        <div class="row align-items-end mt-2">
          <div class="col-sm-3 mb-2 text-center">
            <img
              class="float-sm-end"
              src={character.image}
              alt={character.name}
            />
          </div>
          <div class="col-sm-3 mb-2">
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
          <div class="col-sm-3 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.resonance.name}:</b>
              </div>
              <div class="col text-start">{character.resonance}</div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.ambition}:</b>
              </div>
              <div
                class="col text-start overflow-ellipsis"
                data-tooltip={character.ambition}
              >
                {character.ambition}
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.desire}:</b>
              </div>
              <div
                class="col text-start overflow-ellipsis"
                data-tooltip={character.desire}
              >
                {character.desire}
              </div>
            </div>
          </div>
          <div class="col-sm-3 mb-2">
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.predator.name}:</b>
              </div>
              <div class="col text-start">{character.predator}</div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.clan.name}:</b>
              </div>
              <div class="col text-start">{character.clan}</div>
            </div>
            <div class="row align-items-center">
              <div class="col text-end">
                <b>{locale.generation.name}:</b>
              </div>
              <div class="col text-start">
                {character.generation}
                {locale.generation.suffix}
              </div>
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
                <b>{locale.bloodPotency}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <Dots value={character.bloodPotency} total={10} />
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
                <b>{locale.hunger}</b>
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
                <b>{locale.humanity}</b>
              </div>
            </div>
            <div class="row align-items-center trait">
              <div class="col text-center">
                <Humanity
                  total={character.humanity.total}
                  stains={character.humanity.stains}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <SkillsView character={character} />
      <hr />
      <AdvantagesView character={character} />
      <hr />
      <div class="container">
        <div class="row align-items-center mb-2">
          <div class="col text-center">
            <b>{locale.disciplines.name}</b>
          </div>
        </div>
        <div class="row">
          {keys(character.disciplines).map((key) => (
            <div class="col-sm-4 mb-5">
              <div class="row align-items-center mb-2">
                <div class="col text-end">
                  <b>{locale.disciplines[key].name}</b>
                </div>
                <div class="col text-center">
                  <Dots value={character.disciplines[key]!.length} total={5} />
                </div>
              </div>
              {character.disciplines[key]?.map((name) => {
                const discipline = treatDiscipline(
                  (locale.disciplines as any)[key][name],
                );
                return (
                  <div class="row align-items-center">
                    <div class="col text-end">
                      <Dots value={discipline.value} total={discipline.value} />
                    </div>
                    <div class="col text-start">{discipline.name}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <hr />
      <DetailsView character={character} />
    </MasterView>
  );
};
