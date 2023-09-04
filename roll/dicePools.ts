import { Character } from "../character.ts"
import { locale } from "../i18n/locale.ts";

export type DicePoolResult = {
    dices: number,
    modifier: number, 
    difficulty: number
}

export type DicePoolBuilder = (character: Character) => DicePoolResult;

export type DicePools = {
    [name: string]: DicePoolBuilder
}

function createDicePools(array: DicePoolBuilder[]): DicePools {
    const result: DicePools = {};
    for (let index = 0; index < array.length; index++) {
        const name = locale.dicePools.length > index ? locale.dicePools[index] : index.toString();
        result[name] = array[index];
    }
    return result;
}

export const dicePools = createDicePools([
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