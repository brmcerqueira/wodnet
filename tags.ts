import { batch } from "./batch.ts";
import { locale } from "./i18n/locale.ts";
import * as kanka from "./kanka.ts";

export const Standard = buildTagKey(locale.standard);
export const CharacterLinks = buildTagKey(locale.characterLinks);
export const Templates = buildTagKey(locale.template);

export type Tag = { name: string; type: string };

const tags: Tag[] = [];

export const Player = buildTag(locale.player);
export const Character = buildTag(locale.character, Templates);
export const Animalism = buildTag(locale.disciplines.animalism.name, Templates);
export const Auspex = buildTag(locale.disciplines.auspex.name, Templates);
export const Dominate = buildTag(locale.disciplines.dominate.name, Templates);
export const BloodSorcery = buildTag(
  locale.disciplines.bloodSorcery.name,
  Templates,
);
export const Fortitude = buildTag(locale.disciplines.fortitude.name, Templates);
export const Protean = buildTag(locale.disciplines.protean.name, Templates);
export const Obfuscate = buildTag(locale.disciplines.obfuscate.name, Templates);
export const Potence = buildTag(locale.disciplines.potence.name, Templates);
export const Presence = buildTag(locale.disciplines.presence.name, Templates);
export const Celerity = buildTag(locale.disciplines.celerity.name, Templates);
export const Rituals = buildTag(locale.disciplines.rituals.name, Templates);
export const ThinBloodAlchemy = buildTag(
  locale.disciplines.thinBloodAlchemy.name,
  Templates,
);

export function setup(): number {
  if (batch.percent == 0) {
    buildTags();
  }

  return batch.percent;
}

async function buildTags() {
  batch.total = tags.length;

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];

    const kankaTag: kanka.KankaTagBody = {
      name: tag.name,
      type: tag.type,
    };

    await batch.run(async () => {
      const kankaTags = await kanka.getTagsByName(tag.name);

      return (kankaTags.data.length > 0
        ? await kanka.updateTag(kankaTags.data[0].id, kankaTag)
        : await kanka.createTag(kankaTag)).data != undefined;
    });
  }
}

function buildTag(name: string, type?: string): Tag {
  const tag: Tag = {
    name: buildTagKey(name),
    type: type || Standard,
  };
  tags.push(tag);
  return tag;
}

function buildTagKey(name: string): string {
  return `[${locale.app}] ${name}`;
}
