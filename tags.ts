import { locale } from "./i18n/locale.ts";
import * as kanka from "./kanka.ts";

export const Standard = buildTagKey(locale.standard);
export const Disciplines = buildTagKey(locale.disciplines.name);
export const CharacterLinks = buildTagKey(locale.characterLinks);

export type Tag = { name: string, type: string }

const tags: Tag[] = [];

export const Player = buildTag(locale.player);
export const Character = buildTag(locale.character);
export const Animalism = buildTag(locale.disciplines.animalism.name, Disciplines);
export const Auspex = buildTag(locale.disciplines.auspex.name, Disciplines);
export const Dominate = buildTag(locale.disciplines.dominate.name, Disciplines);
export const BloodSorcery = buildTag(locale.disciplines.bloodSorcery.name, Disciplines);
export const Fortitude = buildTag(locale.disciplines.fortitude.name, Disciplines);
export const Protean = buildTag(locale.disciplines.protean.name, Disciplines);
export const Obfuscate = buildTag(locale.disciplines.obfuscate.name, Disciplines);
export const Potence = buildTag(locale.disciplines.potence.name, Disciplines);
export const Presence = buildTag(locale.disciplines.presence.name, Disciplines);
export const Celerity = buildTag(locale.disciplines.celerity.name, Disciplines);
export const Rituals = buildTag(locale.disciplines.rituals.name, Disciplines);
export const ThinBloodAlchemy = buildTag(locale.disciplines.thinBloodAlchemy.name, Disciplines);

export async function setup(
  campaignId: number,
): Promise<string[]> {
      /*TODO tags */
    //const players = await kanka.getCharactersByType(campaignId, "type");

    /*for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];
        
    }*/



  const note = {
    name: locale.characterLinks,
  };

  const notes = await kanka.getNotesByName(campaignId, note.name);

  if (notes.data.length > 0) {
    await kanka.updateNote(campaignId, notes.data[0].id, note);
  } else {
    await kanka.createNote(campaignId, note);
  }

  return [];
}

function buildTag(name: string, type?: string): Tag {
    const tag: Tag = {
        name: buildTagKey(name),
        type: type || Standard
    } 
    tags.push(tag);
    return tag;
}

function buildTagKey(name: string): string {
    return `[${locale.app}] ${name}`;
}