import { Character } from "./character.ts";

export type ActionResult = {
  dices: number;
  modifier: number;
  difficulty: number;
};

export type ActionBuilder = (character: Character) => ActionResult;

export const actions: ActionBuilder[] = [
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.brawl,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.performance,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.social.etiquette,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.social.intimidation,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.skills.physical.larceny,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.streetwise,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.drive,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.animalKen,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.drive,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.survival,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.physical.stealth,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.skills.mental.occult,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.craft,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.social.subterfuge,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.persuasion,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.performance,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.wits,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.intimidation,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.intimidation,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.social.intimidation,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.social.intimidation,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.performance,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.skills.social.etiquette,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.insight,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.physical.athletics,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.drive,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.drive,
      modifier: -c.willpower.penalty,
      difficulty: 3,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.larceny,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.skills.physical.larceny,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.skills.mental.technology,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.drive,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.mental.awareness,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + c.skills.social.streetwise,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.stealth,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.social.streetwise,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.larceny,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.larceny,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.mental.awareness,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.stealth,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.mental.awareness,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma + c.skills.social.animalKen,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.attributes.mental.resolve,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 4,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.animalism?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure +
        (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + c.attributes.mental.intelligence,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.social.subterfuge,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure +
        (c.disciplines.auspex?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.humanity.total,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.attributes.social.composure,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.occult,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.mental.occult,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.occult,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.bloodSorcery?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.skills.mental.occult,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.dexterity + c.skills.physical.athletics,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.intelligence,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.dominate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.animalism?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.survival,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.medicine,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.medicine,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.strength + c.skills.physical.brawl,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.medicine,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.skills.mental.medicine +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve +
        (c.disciplines.oblivion?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + c.skills.mental.occult +
        (c.disciplines.fortitude?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.wits,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.intelligence +
        (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.mental.awareness,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation + c.skills.social.performance,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.potence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.intelligence,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.social.composure,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.social.composure,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.social.composure,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.obfuscate?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.attributes.social.composure,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.manipulation +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.intelligence,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.charisma +
        (c.disciplines.presence?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.social.composure + c.attributes.mental.resolve,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.wits + c.skills.physical.survival,
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.protean?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.mental.resolve + (c.disciplines.protean?.length || 0),
      modifier: -c.willpower.penalty,
      difficulty: 1,
    };
  },
  (c) => {
    return {
      dices: c.attributes.physical.stamina + c.attributes.mental.resolve,
      modifier: -c.health.penalty,
      difficulty: 1,
    };
  },
];
