import { Character } from "../character.ts";
import { locale } from "../i18n/locale.ts";

export type ActionResult = {
  dices: number;
  modifier: number;
  difficulty: number;
};

export type ActionBuilder = (character: Character) => ActionResult;

export type Actions = {
  [name: string]: ActionBuilder;
};

function createActions(array: ActionBuilder[]): Actions {
  const result: Actions = {};
  for (let index = 0; index < array.length; index++) {
    const name = locale.actions.length > index
      ? locale.actions[index]
      : index.toString();
    result[name] = array[index];
  }
  return result;
}

export const actions = createActions([
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
]);
