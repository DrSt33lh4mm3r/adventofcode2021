export function removeCharAtIndex(s: string, index: number): string {
    if (index < s.length) {
        s = s.slice(0, index) + s.slice(index + 1);
        return s;
    } else {
        return s;
    }
}

export function replaceAll(s: string, find: string, replace: string) {
    const parts = s.split(find);
    return parts.join(replace);
}

export function isAllUpperCase(str: string) {
    return str == str.toUpperCase();
}