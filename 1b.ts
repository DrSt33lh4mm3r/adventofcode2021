import {LineExtractor} from "./line-extractor";
import {Puzzle} from "./puzzle";

export class Puzzle_1b extends Puzzle {
    lines: string[] = [];
    parsedLines: number[] = [];

    constructor() {
        // super('./input/test_input.txt');
        super('./input/1.txt');
    }

    processLines(lines: string[]) {
        this.lines = lines;

        this.parsedLines = this.lines.map(l => Number.parseInt(l));

        let increases: number = 0;
        let previousSum: null | number = null;

        for (let i = 2; i < this.parsedLines.length; i++) {
            const sum = this.parsedLines[i] +  this.parsedLines[i - 1] + this.parsedLines[i - 2];

            if (previousSum) {
                if (previousSum < sum) {
                    increases++;
                }
            }

            previousSum = sum;
        }

        console.log(increases)
    }
}

new Puzzle_1b();