export function incrementForKey<T>(m: Map<T, number>, key: T, defaultValue: number = 0) {
    if (m.has(key)) {
        m.set(key, m.get(key)! + 1);
    } else {
        m.set(key, defaultValue);
    }
}

export function addForKey<T>(m: Map<T, number>, key: T, toAdd: number) {
    if (m.has(key)) {
        let prev = m.get(key)!
        prev = prev + toAdd;
        m.set(key, prev);
    } else {
        m.set(key, toAdd);
    }
}

export function addToArray<T, U>(m: Map<T, U[]>, key: T, value: U) {
    if (m.has(key)) {
        const prev = m.get(key)!;
        prev.push(value);
        m.set(key, prev);
    } else {
        m.set(key, [value]);
    }
}

export function reverseMap<T, U>(m: Map<T, U>): Map<U, T> {
    const reversed: Map<U, T> = new Map<U, T>();

    const keys: T[] = Array.from(m.keys());

    for (let i = 0; i < keys.length; i++) {
        const k: T = keys[i];
        const v: U = m.get(k)!

        reversed.set(v, k);
    }

    return reversed;
}