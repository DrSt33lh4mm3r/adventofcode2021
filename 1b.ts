import {LineExtractor} from "./line-extractor";

export class Puzzle_1a {
    lines: string[] = [];
    parsedLines: number[] = [];

    constructor() {
        // const inputFile = './input/test_input.txt';
        const inputFile = './input/1.txt';

        const lineExtractor = new LineExtractor(inputFile);
        lineExtractor.getLines().subscribe(lines => {
            if (lines && lines.length > 0) {
                this.processLines(lines);
            }
        });
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

new Puzzle_1a();