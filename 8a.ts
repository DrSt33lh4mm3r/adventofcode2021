import {Puzzle} from "./puzzle";
import {removeCharAtIndex} from "./helpers/string-helpers";

export class Puzzle_8a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/8.txt');
    }

    processLines(lines: string[]) {
        let counter: number = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            const parts = line.split(' | ')[1].split(' ')

            for (let j = 0; j < parts.length; j++) {
                if ([2, 3, 4, 7].includes(parts[j].length)) {
                    counter++;
                }
            }
        }

        console.log(counter)
    }


}

new Puzzle_8a();