import {Puzzle} from "./puzzle";
import {removeCharAtIndex} from "./helpers/string-helpers";

export class Puzzle_10b extends Puzzle {
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
        scoring.set(')', 1);
        scoring.set(']', 2);
        scoring.set('}', 3);
        scoring.set('>', 4);

        let scores: number[] = [];

        for (let  i = 0; i < lines.length; i++) {
            const line = lines[i];
            let nextExpected: string = "";
            let corrupted: boolean = false;

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
                        j = line.length;
                        corrupted = true;
                    }
                }
            }

            if (nextExpected !== '' && !corrupted) {
                let closingSequence: string = '';

                let score = 0;

                for (let j = nextExpected.length - 1; j >= 0; j--) {
                    closingSequence = closingSequence + nextExpected[j]
                    score = (score * 5) + scoring.get(nextExpected[j])!;
                }

                // console.log('found incomplete line ' + line + ' complete by adding ' + closingSequence + 'for a score of ' + score);
                scores.push(score);
            }
        }
        // console.log(scores)

        scores = scores.sort((a, b) => b - a)
        // console.log(scores)
        console.log('The middle score is ' + scores[Math.floor(scores.length / 2)])

    }
}

new Puzzle_10b();