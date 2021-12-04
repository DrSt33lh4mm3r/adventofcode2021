import {Puzzle} from "./puzzle";

export class Puzzle_2b extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/2.txt');
    }

    processLines(lines: string[]) {
        let horizontal: number = 0;
        let depth: number = 0;
        let aim: number = 0;


        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split(' ');

            const direction = parts[0];
            const amount = Number.parseInt(parts[1]);

            switch (direction) {
                case 'forward':
                    horizontal = horizontal + amount;
                    depth = depth + (aim * amount);
                    break;
                case 'down':
                    aim = aim + amount;
                    break;
                case 'up':
                    aim = aim - amount;
                    break;
            }
        }

        console.log({horizontal, depth})
        console.log(horizontal * depth);
    }
}

new Puzzle_2b();