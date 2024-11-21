import { Character, Damage } from "../../character.ts";
import { locale } from "../../i18n/locale.ts";
import { buildCharacterSolver } from "../solver/buildCharacterSolver.ts";
import {
    CommandOptions,
    CommandOptionType,
    commands,
    option,
    treatKey,
} from "./common.ts";

function buildDamageOptions(): CommandOptions {
    return option(locale.damage.superficial, {
        property: "superficial",
        description: locale.damage.superficial,
        type: CommandOptionType.INTEGER,
        minValue: -20,
        maxValue: 20,
    }).option(locale.damage.aggravated, {
        property: "aggravated",
        description: locale.damage.aggravated,
        type: CommandOptionType.INTEGER,
        minValue: -20,
        maxValue: 20,
    }).build;
}

function damageParse(
    get: (character: Character) => Damage,
): (
    character: Character,
    input: { superficial?: number; aggravated?: number },
) => number {
    return (c, i) => {
        const damage = get(c);
        if (i.superficial) {
            damage.superficial = i.superficial;
        }

        if (i.aggravated) {
            damage.aggravated = i.aggravated;
        }
        return 0;
    };
}

commands[treatKey(locale.health)] = {
    description: `${locale.commands.sheet.description} ${locale.health}`,
    options: buildDamageOptions(),
    solve: buildCharacterSolver(damageParse((c) => c.health)),
};

commands[treatKey(locale.willpower)] = {
    description: `${locale.commands.sheet.description} ${locale.willpower}`,
    options: buildDamageOptions(),
    solve: buildCharacterSolver(damageParse((c) => c.willpower)),
};
