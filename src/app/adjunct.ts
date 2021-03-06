import {Character} from './character';
import {Tag} from './tag';

export interface Adjunct {
  automatic: boolean;
  get(character: Character): number;
  has(character: Character, tags: Tag[]): boolean;
}

export const adjuncts: { [name: string]: Adjunct } = {
  'rapidity': <Adjunct>{
    automatic: false,
    get: c => c.disciplines.celerity,
    has: (c, t) => t.indexOf(Tag.Dexterity) > -1
    && (t.indexOf(Tag.Athletics) + t.indexOf(Tag.Dodge) + t.indexOf(Tag.Firearms) > -3)
    && (c.disciplines ? c.disciplines.celerity >= 3 : false)
  },
  'prowess': <Adjunct>{
    automatic: true,
    get: c => c.disciplines.potence,
    has: (c, t) => t.indexOf(Tag.Strength) > -1
      && (c.disciplines ? c.disciplines.potence >= 1 : false)
  }
};
