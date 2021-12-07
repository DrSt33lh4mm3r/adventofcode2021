import {Puzzle} from "./puzzle";

export class Puzzle_5a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/5.txt');
    }

    processLines(lines: string[]) {
        const board: Map<string, number> = new Map<string, number>();

        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split(' -> ');

            const point1 = parts[0].split(',').map(n => Number.parseInt(n));
            const point2 = parts[1].split(',').map(n => Number.parseInt(n));

            const x1 = point1[0];
            const y1 = point1[1];

            const x2 = point2[0];
            const y2 = point2[1];

            if (x1 === x2) {
                const y = [y1, y2].sort((a, b) => a - b);

                for (let j = y[0]; j <= y[1]; j++) {
                    const key = x1 + ',' + j;

                    if (board.has(key)) {
                        board.set(key, board.get(key)! + 1)
                    } else {
                        board.set(key, 1);
                    }
                }
            } else if (y1 === y2) {
                const x = [x1, x2].sort((a, b) => a - b);

                for (let j = x[0]; j <= x[1]; j++) {
                    const key = j + ',' + y1;

                    if (board.has(key)) {
                        board.set(key, board.get(key)! + 1)
                    } else {
                        board.set(key, 1);
                    }
                }
            }
        }

        const keys = Array.from(board.keys());

        let count = 0;

        keys.forEach(k => {
            if (board.get(k)! > 1) {
                count++;
            }
        })

        console.log('There are ' + count + ' points where at least two lines overlap');
    }
}

new Puzzle_5a();