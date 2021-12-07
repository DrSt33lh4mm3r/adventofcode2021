export function incrementForKey<T>(key: T, m: Map<T, number>, defaultValue: number = 0) {
    if (m.has(key)) {
        m.set(key, m.get(key)! + 1);
    } else {
        m.set(key, defaultValue);
    }
}