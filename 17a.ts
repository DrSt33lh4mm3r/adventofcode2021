import {Puzzle} from "./puzzle";
import {Printable, PriorityQueue} from "./helpers/priority-queue";

export class Puzzle_17a extends Puzzle {
    x: {min: number, max: number} = {min: 0, max: 0};
    y: {min: number, max: number} = {min: 0, max: 0};

    constructor() {
        super('./input/test_input.txt');
        // super('./input/16.txt');
    }

    processLines(lines: string[]) {
        this.x = {min: 287, max: 309};
        this.y = {min: -76, max: -48};

        let possibleXValues: number[] = [];

        for (let  x = this.x.max; x >= this.x.min; x--) {
            const possibleX = this.pQ(1, (-2 * x));

            for (let i = 0; i < possibleX.length; i++) {
                if (possibleX[i] > 0 && Number.isInteger(possibleX[i])) {
                    possibleXValues.push(possibleX[i]);
                }
            }
        }

        possibleXValues = possibleXValues.sort((a, b) => b - a);

        // this.simulateThrow(7, 2)
        let currentHighestY = Number.MIN_SAFE_INTEGER;
        let bestX = 0;
        let bestY = 0;

        const hits: {x: number, y: number, highestY: number}[] = [];

        for (let i = 0; i < possibleXValues.length; i++) {
            const x = possibleXValues[i];

            for (let y = 0; y < 100; y++) {
                const sim = this.simulateThrow(x, y);

                if (sim.hitTarget) {
                    hits.push({x, y, highestY: sim.highestY});
                    if (sim.highestY > currentHighestY) {
                        currentHighestY = sim.highestY;
                        bestX = x;
                        bestY = y;
                    }
                }
            }
        }

        console.log(hits.length);
        console.log({bestX, bestY, highestY: currentHighestY});
    }

    simulateThrow(x: number, y: number) {
        let currX = 0;
        let currY = 0;

        let hitTarget: boolean = false;
        let highestY: number = Number.MIN_SAFE_INTEGER;

        while (currX <= this.x.max && currY >= this.y.max) {
            currX = currX + x;
            currY = currY + y;

            if (x > 0) {
                x = x - 1;
            } else if (x < 0) {
                x = x + 1;
            }

            y = y - 1;

            // console.log({x: currX, y: currY});

            if (this.isInBounds(currX, this.x.min, this.x.max)
                && this.isInBounds(currY, this.y.min, this.y.max)) {
                hitTarget = true;
                // console.log({x: currX, y: currY});
            }

            if (currY > highestY) {
                highestY = currY;
            }
        }

        // console.log({hitTarget, highestY});
        return {hitTarget, highestY};
    }

    isInBounds(n: number, nMin: number, nMax: number) {
        return (n >= nMin && n <= nMax)
    }

    pQ(p: number, q: number) {
        const pHalf = p / 2;
        const pHalfSquared = pHalf * pHalf;
        const insideRoot = pHalfSquared - q;
        const root = Math.sqrt(insideRoot);

        const x1 = 0 - pHalf + root;
        const x2 = 0 - pHalf - root;

        return [x1, x2];
    }

}

new Puzzle_17a();