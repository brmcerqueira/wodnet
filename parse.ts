import { parse } from "jsr:@std/csv";
import { locale } from "./i18n/locale.ts";

const data = parse(await Deno.readTextFile("./disciplines.csv"), {
    skipFirstRow: true,
    columns: ["name", "dicePool", "discipline"]
});

function snakeCase(text: string): string {
    const array = text.replace('\'s', 's').replace(/\s+/g, ' ').split(' ');
    return firstCharacter(array.map(e => firstCharacter(e, true)).join(''));
}

const descriptions: string[] = []; 

for (const row of data) {
    const name = snakeCase(row.name);
    const disciplineName = snakeCase(row.discipline);
    const discipline = (locale.disciplines as any)[disciplineName];
    descriptions.push(`{${discipline?.name || `<${disciplineName}>`}} ${discipline[name] || `<${name}>`} [${dicePool(row.dicePool)}]`)
}

console.log(JSON.stringify(descriptions));

function firstCharacter(text: string, upper?: boolean): string {
  const first = text.substring(0, 1);
  return `${upper ? first.toUpperCase() : first.toLowerCase()}${text.substring(1, text.length)}`;
}

function dicePool(text: string): string {
  return text;
}
