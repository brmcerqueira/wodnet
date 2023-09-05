import { Character } from "../character.ts"
import { locale } from "../i18n/locale.ts";

export type ActionResult = {
    dices: number,
    modifier: number, 
    difficulty: number
}

export type ActionBuilder = (character: Character) => ActionResult;

export type Actions = {
    [name: string]: ActionBuilder
}

function createActions(array: ActionBuilder[]): Actions {
    const result: Actions = {};
    for (let index = 0; index < array.length; index++) {
        const name = locale.actions.length > index ? locale.actions[index] : index.toString();
        result[name] = array[index];
    }
    return result;
}

export const actions = createActions([
    c => {
        return {
            dices: c.attributes.social.manipulation + c.skills.social.intimidation,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.physical.strength + c.skills.physical.brawl,
            modifier: -c.health.penalty,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.social.charisma + c.skills.social.performance,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.physical.dexterity + c.skills.social.etiquette,
            modifier: -c.health.penalty,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.physical.stamina + c.skills.physical.athletics,
            modifier: -c.health.penalty,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.wits + c.skills.social.intimidation,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.intelligence + c.skills.physical.larceny,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.social.charisma + c.skills.social.streetwise,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.wits + c.skills.physical.drive,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.social.manipulation + c.skills.social.animalKen,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.wits + c.skills.physical.drive,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.wits + c.skills.physical.survival,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.physical.stamina + c.skills.physical.stealth,
            modifier: -c.health.penalty,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.social.charisma + c.skills.social.intimidation,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.intelligence + c.skills.mental.occult,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.mental.wits + c.skills.physical.craft,
            modifier: 0,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.physical.dexterity + c.skills.social.subterfuge,
            modifier: -c.health.penalty,
            difficulty: 1
        };
    },
    c => {
        return {
            dices: c.attributes.social.manipulation + c.skills.social.persuasion,
            modifier: 0,
            difficulty: 1
        };
    }
]);