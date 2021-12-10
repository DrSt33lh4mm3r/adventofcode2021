import {Puzzle} from "./puzzle";
import {removeCharAtIndex} from "./helpers/string-helpers";

export class Puzzle_10a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/10.txt');
    }

    processLines(lines: string[]) {
        const opening: string[] = ['(', '[', '{', '<'];
        const closing: Map<string, string> = new Map<string, string>();
        closing.set('(', ')');
        closing.set('[', ']');
        closing.set('{', '}');
        closing.set('<', '>');

        const scoring: Map<string, number> = new Map<string, number>();
        scoring.set(')', 3);
        scoring.set(']', 57);
        scoring.set('}', 1197);
        scoring.set('>', 25137);

        let score: number = 0;

        for (let  i = 0; i < lines.length; i++) {
            const line = lines[i];
            let nextExpected: string = "";

            for (let j = 0; j < line.length; j++) {
                const c = line[j];

                if (opening.includes(c)) {
                    nextExpected = nextExpected + closing.get(c)!;
                } else {
                    const lastPosition = nextExpected.length - 1;
                    const expected = nextExpected[lastPosition];

                    if (c === expected) {
                        nextExpected = removeCharAtIndex(nextExpected, lastPosition);
                    } else {
                        // console.log('Corrupted at index ' + j + ' expected ' + expected + ' but found ' + c);
                        j = line.length;

                        score = score + scoring.get(c)!;
                    }

                }
            }

        }

        console.log('final score: ' + score)

    }


}

new Puzzle_10a();