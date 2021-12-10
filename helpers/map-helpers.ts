export function incrementForKey<T>(m: Map<T, number>, key: T, defaultValue: number = 0) {
    if (m.has(key)) {
        m.set(key, m.get(key)! + 1);
    } else {
        m.set(key, defaultValue);
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