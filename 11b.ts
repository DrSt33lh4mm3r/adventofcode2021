import {Puzzle} from "./puzzle";
import {removeCharAtIndex} from "./helpers/string-helpers";

export class Puzzle_11b extends Puzzle {
    field: number[][] = [];
    flashed: {x: number, y: number}[] = [];
    flashLevel = 10;
    totalFlashes: number = 0;

    totalTurns: number = 0;

    constructor() {
        // super('./input/test_input.txt');
        super('./input/11.txt');
    }

    processLines(lines: string[]) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const row: number[] = [];
            for (let j = 0; j < line.length; j++) {
                row.push(Number.parseInt(line[j]));
            }
            this.field.push(row)
        }

        let flashedSimultaneous = false;

        while (!flashedSimultaneous) {
            this.turn();

            flashedSimultaneous = true;
            for (let x = 0; x < this.field.length; x++) {
                for (let y = 0; y < this.field[x].length; y++) {
                    if (this.field[x][y] !== 0) {
                        flashedSimultaneous = false;
                    }
                }
            }

            this.totalTurns++;
        }



        console.log(this.totalTurns);
    }

    turn() {
        this.flashed = [];

        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[x].length; y++) {
                this.field[x][y]++;

                if (this.field[x][y] === this.flashLevel) {
                    this.flashed.push({x, y});
                    this.totalFlashes++;
                }
            }
        }

        while (this.flashed.length > 0) {
            const current = this.flashed.shift();

            if (current) {
                this.increaseNeighbors(current);
            }
        }

        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[x].length; y++) {
                if (this.field[x][y] >= 10) {
                    this.field[x][y] = 0;
                }
            }
        }
    }

    increaseNeighbors(current: { x: number; y: number }) {
        const {x, y} = current;

        this.increasePosition(x - 1, y - 1);
        this.increasePosition(x - 1, y);
        this.increasePosition(x - 1, y + 1);

        this.increasePosition(x, y - 1);
        this.increasePosition(x, y + 1);

        this.increasePosition(x + 1, y - 1);
        this.increasePosition(x + 1, y);
        this.increasePosition(x + 1, y + 1);
    }


    increasePosition(x: number, y: number) {
        if (x < 0 || y < 0) {
            return;
        }

        if (x >= this.field.length || x >= this.field.length) {
            return;
        }

        if (this.field[x][y] !== undefined) {
            this.field[x][y]++;

            if (this.field[x][y] === this.flashLevel) {
                this.flashed.push({x, y});
                this.totalFlashes++;
            }
        }
    }
}

new Puzzle_11b();