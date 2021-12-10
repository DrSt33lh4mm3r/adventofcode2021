export function removeCharAtIndex(s: string, index: number): string {
    if (index < s.length) {
        s = s.slice(0, index) + s.slice(index + 1);
        return s;
    } else {
        return s;
    }
}