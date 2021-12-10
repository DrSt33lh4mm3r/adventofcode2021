import {Puzzle} from "./puzzle";
import {removeCharAtIndex, replaceAll} from "./helpers/string-helpers";
import {incrementForKey, reverseMap} from "./helpers/map-helpers";

export class Puzzle_8b extends Puzzle {
    digits: Map<string, number> = new Map<string, number>();

    constructor() {
        // super('./input/test_input.txt');
        super('./input/8.txt');
    }

    // git config --global user.email "alexander.gruetzner@googlemail.com"

    processLines(lines: string[]) {
        this.digits.set('abcefg', 0);
        this.digits.set('cf', 1);
        this.digits.set('acdeg', 2);
        this.digits.set('acdfg', 3);
        this.digits.set('bcdf', 4);
        this.digits.set('abdfg', 5);
        this.digits.set('abdefg', 6);
        this.digits.set('acf', 7);
        this.digits.set('abcdefg', 8);
        this.digits.set('abcdfg', 9);

        let sum: number = 0;

        for (let i = 0; i < lines.length; i++) {
            sum = sum + this.processSingleLine(lines[i]);
        }

        console.log(sum)
    }

    processSingleLine(line: string) {
        const parts = line.split(' | ');
        const definitions = parts[0].split(' ');
        let output = parts[1];

        const solvedDefinitions = this.calculateDefinitions(definitions)

        const alphabet = 'abcdefg';

        for (let i = 0; i < alphabet.length; i++) {
            const a = alphabet[i];
            const r = solvedDefinitions.get(a)!
            output = replaceAll(output, a, r.toUpperCase());
        }

        output = output.toLowerCase();

        const groups: string[] = output.split(' ');

        let resultString: string = '';

        for (let i = 0; i < groups.length; i++) {
            const t = groups[i].split('').sort().join('');
            resultString = resultString + this.translateGroupToDigit(t);
        }

        return Number.parseInt(resultString);
    }

    private translateGroupToDigit(group: string): number {
        return this.digits.get(group)!
    }

    private calculateDefinitions(definitions: string[]) {
        const groups: Map<number, string[]> = new Map<number, string[]>();
        const solved: Map<string, string> = new Map<string, string>();

        for (let i = 0; i < definitions.length; i++) {
            const definition = definitions[i];
            const size = definition.length;

            if (groups.has(size)) {
                const prev = groups.get(size)!;
                prev.push(definition);
                groups.set(size, prev);
            } else {
                groups.set(size, [definition])
            }
        }

        /*
                RULES
                 1. the char included in the single string with length 3, that is not included in the
                    single string with length 2 MUST represent segment a
                 2. the char that has a count of 2 in the strings with length 6, that is included in the
                    single string with length 2 MUST represent segment c
                 3. the other char in the single string with length 2 MUST represent segment f
                 4. the char that has a count of 2 in the strings with length 6, that is NOT included in the
                    single string with length 4 MUST represent segment e
                 5. the remaining char with a count of 2 in the strings with length 6 MUST represent segment d
                 6. the char in the single string with length 4, that has not been solved by previous rules,
                    MUST represent segment b
                 7. there should only one char be left that has not been solved yet, it therefore
                    MUST represent segment g
         */

        // RULE 1
        const s2 = groups.get(2)![0];
        const s3 = groups.get(3)![0];

        let solve1: string = '';

        for (let i = 0; i < s3.length; i++) {
            if (!s2.includes(s3[i])) {
                solve1 = s3[i];
            }
        }

        solved.set(solve1, 'a');

        // RULE 2
        let countOf2 = this.getCharsWithSpecificCount(groups.get(6)!, 2);
        let solve2: string = '';

        for (let i = 0; i < countOf2.length; i++) {
            if (groups.get(2)![0].includes(countOf2[i])) {
                solve2 = countOf2[i];
            }
        }

        solved.set(solve2, 'c');
        countOf2 = countOf2.replace(solve2, '');

        // RULE 3
        const solve3 = groups.get(2)![0].replace(solve2, '')[0];
        solved.set(solve3, 'f');

        // RULE 4
        let solve4: string = '';

        for (let i = 0; i < countOf2.length; i++) {
            if (!groups.get(4)![0].includes(countOf2[i])) {
                solve4 = countOf2[i];
            }
        }

        solved.set(solve4, 'e');

        // RULE 5
        solved.set(countOf2.replace(solve4, ''), 'd');

        // RULE 6
        const s4 = groups.get(4)![0];

        let solvedChars = Array.from(solved.keys()).join('');
        let solve6: string = '';

        for (let i = 0; i < s4.length; i++) {
            if (!solvedChars.includes(s4[i])) {
                solve6 = s4[i]
            }
        }

        solved.set(solve6, 'b');

        // RULE 7
        solvedChars = Array.from(solved.keys()).join('');
        const alphabet = 'abcdefg';
        let solve7: string = '';

        for (let i = 0; i < alphabet.length; i++) {
            if (!solvedChars.includes(alphabet[i])) {
                solve7 = alphabet[i]
            }
        }

        solved.set(solve7, 'g')

        return solved;
        // return reverseMap(solved);
    }

    getCharsWithSpecificCount(a: string[], count: number) {
        const counts = this.countCharsInStringArray(a);
        let chars: string = '';

        const keys = Array.from(counts.keys());

        for (let i = 0; i < keys.length; i++) {
            if (counts.get(keys[i])! === count) {
                chars = chars + keys[i];
            }
        }

        return chars;
    }

    countCharsInStringArray(a: string[]) {
        const counts: Map<string, number> = new Map<string, number>();

        for (let i = 0; i < a.length; i++) {
            const s = a[i];

            for (let j = 0; j < s.length; j++) {
                incrementForKey(counts, s[j], 1);
            }
        }

        return counts;
    }

}

new Puzzle_8b();