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

export function replaceCharAtIndex(str: string, char: string, index: number) {
    let newLine = '';

    for (let i = 0; i < str.length; i++) {
        if (i === index) {
            newLine = newLine + char;
        } else {
            newLine = newLine + str[i]
        }
    }

    return newLine;
}

export function mergeBinaryStrings(s1: string, s2: string, zero: string = '.', one: string = '#') {
    if (s1.length !== s2.length) {
        throw new Error('Strings dont have matching lengths');
    }

    let mergedLine = ''

    for (let i = 0; i < s1.length; i++) {
        if (s1[i] === one || s2[i] === one) {
            mergedLine = mergedLine + one;
        } else {
            mergedLine = mergedLine + zero;
        }
    }

    return mergedLine;
}

export function reverseString(s: string): string {
    return s.split('').reverse().join('');
}