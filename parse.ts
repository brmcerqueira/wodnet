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

let actions = "";

for (const row of data) {
  if (row.dicePool !== '-') {
    const name = snakeCase(row.name);
    const disciplineName = snakeCase(row.discipline);
    const discipline = (locale.disciplines as any)[disciplineName];

    const array = row.dicePool.split(" vs ");
    
    for (let index = 0; index < array.length; index++) {
      const pool = array[index]
      const text = `{${discipline?.name || `<${disciplineName}>`}}${index == 1 ? "(Resistido)" : ""} ${discipline[name] || `<${name}>`} [${dicePool(pool)}]`;
      if (descriptions.indexOf(text) == -1) {
        descriptions.push(text);

        let health = false;

        actions += `(c) => {return {dices: ${pool.split(" + ").map(e => {
        let name = snakeCase(e);

        if ((locale.attributes.physical as any)[name]) {
          health = true;
          name = "c.attributes.physical." + name;
        }
        else if ((locale.attributes.social as any)[name]) {
          name = "c.attributes.social." + name;
        }
        else if ((locale.attributes.mental as any)[name]) {
          name = "c.attributes.mental." + name;
        }
        else if ((locale.skills.physical as any)[name]) {
          name = "c.skills.physical." + name;
        }
        else if ((locale.skills.social as any)[name]) {
          name = "c.skills.social." + name;
        }
        else if ((locale.skills.mental as any)[name]) {
          name = "c.skills.mental." + name;
        }
        else if ((locale.disciplines as any)[name]) {
          name = `(c.disciplines.${name}?.length || 0)`;
        }
        else {
          name = `<${name}>`
        }

        return name;
      }).join(" + ")},modifier: -c.${health ? "health": "willpower"}.penalty,difficulty: 1,};},`;
      }
    }
  }
}

console.log(JSON.stringify(descriptions));
console.log(JSON.stringify(actions));

function firstCharacter(text: string, upper?: boolean): string {
  const first = text.substring(0, 1);
  return `${upper ? first.toUpperCase() : first.toLowerCase()}${text.substring(1, text.length)}`;
}

function dicePool(text: string): string {
  return text.split(" + ").map(e => {
    const name = snakeCase(e);
    return (locale.attributes.physical as any)[name] 
    || (locale.attributes.social as any)[name] 
    || (locale.attributes.mental as any)[name]
    || (locale.skills.physical as any)[name] 
    || (locale.skills.social as any)[name] 
    || (locale.skills.mental as any)[name]
    || (locale.disciplines as any)[name]?.name
    || (locale as any)[name]
    || `<${name}>`
  }).join(" + ");
}
