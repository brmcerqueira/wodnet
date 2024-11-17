export function keys<T extends object>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[];
}

export function treatDiscipline(text: string): { name: string, value: number } {
    const index = text.lastIndexOf("●") + 1;
    return {
        name: text.substring(index).trimStart(),
        value: index
    }
}