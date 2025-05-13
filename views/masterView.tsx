// deno-lint-ignore-file no-explicit-any
import React, { TsxComplexElement, TsxElement } from "../deps.ts";
import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";
import { config } from "../config.ts";

const CircleFill: TsxComplexElement = <i class="bi bi-circle-fill" />;
const Circle: TsxComplexElement = <i class="bi bi-circle" />;
const SquareFill: TsxComplexElement = <i class="bi bi-square-fill" />;
export const XSquare: TsxComplexElement = <i class="bi bi-x-square" />;
const SlashSquare: TsxComplexElement = <i class="bi bi-slash-square" />;
export const Square: TsxComplexElement = <i class="bi bi-square" />;

export function treatDetails(text: string): string {
  const index = text.indexOf("[");
  return text.substring(0, index > -1 ? index : text.length);
}

export function localeSkill(key: string | number): string {
  return (locale.skills.physical as any)[key] ||
    (locale.skills.social as any)[key] ||
    (locale.skills.mental as any)[key];
}

const Meter = (
  properties: { total: number; put: (index: number) => TsxComplexElement },
): TsxComplexElement => {
  const indexSpace = properties.total > 5
    ? (Math.ceil(properties.total / 2) + 1)
    : 0;
  const elements: TsxComplexElement[] = [];
  for (let i = 1; i <= properties.total; i++) {
    if (i == indexSpace) {
      elements.push(<i>&ensp;</i>);
    }

    elements.push(properties.put(i));
  }
  return <>{elements}</>;
};

export const DualMeter = (
  properties: {
    value: number;
    total: number;
    empty: TsxComplexElement;
    fill: TsxComplexElement;
  },
): TsxComplexElement => (
  <Meter
    total={properties.total}
    put={(i) => i <= properties.value ? properties.fill : properties.empty}
  />
);

export const Dots = (
  properties: { value: number; total: number },
): TsxComplexElement => (
  <DualMeter
    value={properties.value}
    total={properties.total}
    empty={Circle}
    fill={CircleFill}
  />
);

export const Damage = (
  properties: { superficial: number; aggravated: number; total: number },
): TsxComplexElement => {
  const indexSuperficial = properties.aggravated + properties.superficial;
  let indexAggravated = properties.aggravated;
  if (indexSuperficial > properties.total) {
    indexAggravated += indexSuperficial - properties.total;
  }
  return (
    <Meter
      total={properties.total}
      put={(i) => {
        if (i <= indexAggravated) {
          return XSquare;
        } else if (i <= indexSuperficial) {
          return SlashSquare;
        } else {
          return Square;
        }
      }}
    />
  );
};

export const Humanity = (
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
          return SlashSquare;
        }
      }}
    />
  );
};

export const MasterView = (
  properties: {
    character: Character;
    token: string;
    dark: boolean;
    update: number;
  },
  children: TsxElement[],
): TsxComplexElement => {
  const title =
    properties.character.player != null && properties.character.player != ""
      ? `${properties.character.name} (${properties.character.player})`
      : properties.character.name;

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={locale.app} />
        <meta property="og:image" content={properties.character.image} />
        <meta
          property="og:url"
          content={`${config.host}/${
            properties.dark ? "dark" : ""
          }?token=${properties.token}`}
        />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/styles/main.css" />
        <script>
          {`const context = ${
            JSON.stringify({
              token: properties.token,
              update: properties.update,
              versionstamp: properties.character.versionstamp,
            })
          };`}
        </script>
        <script src="/scripts/characterScript.js" />
      </head>
      <body class={properties.dark && "body-dark"}></body>
      {children}
    </html>
  );
};