export function keys<T extends object>(o: T): (keyof T)[] {
    return Object.keys(o) as (keyof T)[];
}