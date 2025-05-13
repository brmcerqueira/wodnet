import React, { TsxComplexElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";

export const DetailsView = (
  properties: {
    character: Character;
  },
): TsxComplexElement => {
  return (
    <div class="container">
      <div class="row align-items-center mb-2">
        <div class="col text-center">
          <b>{locale.details}</b>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">{properties.character.details}</div>
      </div>
    </div>
  );
};
