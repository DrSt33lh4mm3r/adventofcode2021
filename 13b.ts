import {Puzzle} from "./puzzle";
import {mergeBinaryStrings, replaceCharAtIndex, reverseString} from "./helpers/string-helpers";

export class Puzzle_13b extends Puzzle {
    paper: string[] = [];

    constructor() {
        // super('./input/test_input.txt');
        super('./input/13.txt');
    }

    processLines(lines: string[]) {
        const foldingInstructions: {axis: 'x' | 'y', line: number}[] = [];
        const dots: {x: number, y: number}[] = [];

        let maxX = Number.MIN_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('fold along')) {
                const parts = line.replace('fold along ', '').split('=');
                foldingInstructions.push({axis: parts[0] as 'x' | 'y', line: Number.parseInt(parts[1])})
            } else if (line !== '') {
                const parts = line.split(',').map(p => Number.parseInt(p));

                const x = parts[0];
                const y = parts[1];

                dots.push({x,y});

                if (x > maxX) {
                    maxX = x;
                }

                if (y > maxY) {
                    maxY = y;
                }
            }
        }

        for (let y = 0; y <= maxY; y++) {
            let line = '';

            for (let x = 0; x <= maxX; x++) {
                line = line + '.'
            }

            this.paper.push(line);
        }

        for (let i = 0; i < dots.length; i++) {
            const {x, y} = dots[i];

            let line = this.paper[y];
            line = replaceCharAtIndex(line, '#', x);
            this.paper[y] = line

        }

        for (let i = 0; i < foldingInstructions.length; i++) {
            const {axis, line} = foldingInstructions[i];

            if (axis === 'x') {
                this.foldX(line);
            } else if (axis === 'y') {
                this.foldY(line);
            }
        }

        for (let y = 0; y < this.paper.length; y++) {
            console.log(this.paper[y])
        }
    }

    foldX(line: number) {
        for (let y = 0; y < this.paper.length; y++) {
            const firstHalf = this.paper[y].substr(0, line);
            const secondHalf = reverseString(this.paper[y].substr(line + 1, line));

            const merged = mergeBinaryStrings(firstHalf, secondHalf);

            this.paper[y] = merged;
        }

    }

    foldY(line: number) {
        const columns: string[] = [];

        for (let x = 0; x < this.paper[0].length; x++) {
            let col = '';

            for (let y = 0; y < this.paper.length; y++) {
                col = col + this.paper[y][x];
            }

            columns.push(col);
        }

        for (let i = 0; i < columns.length; i++) {
            const firstHalf = columns[i].substr(0, line);
            const secondHalf = reverseString(columns[i].substr(line + 1, line));

            const merged = mergeBinaryStrings(firstHalf, secondHalf);

            columns[i] = merged;
        }

        this.paper = [];

        for (let x = 0; x < columns[0].length; x++) {
            let newLine: string = '';

            for (let y = 0; y < columns.length; y++) {
                newLine = newLine + columns[y][x];
            }

            this.paper.push(newLine)
        }
    }
}



new Puzzle_13b();