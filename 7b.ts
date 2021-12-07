import {Puzzle} from "./puzzle";

export class Puzzle_7b extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/7.txt');
    }

    processLines(lines: string[]) {
        const startPositions: number[] = lines[0].split(',').map(n => Number.parseInt(n));

        const costs: Map<number, number> = new Map<number, number>();
        const costsPerDistance: Map<number, number> = new Map<number, number>();

        const possiblePositions: number[] = [];

        let min: number = Number.MAX_SAFE_INTEGER;
        let max: number = Number.MIN_SAFE_INTEGER;

        for(let i = 0; i < startPositions.length; i++) {
            if (startPositions[i] < min) {
                min = startPositions[i];
            }
            if (startPositions[i] > max) {
                max = startPositions[i];
            }
        }

        let tempCost: number = 0;

        for (let i = min; i <= max; i++) {
            possiblePositions.push(i);

            tempCost = tempCost + i;
            costsPerDistance.set(i, tempCost);
        }

        let costOfCheapestPosition: number = Number.MAX_SAFE_INTEGER;
        let cheapestPosition: number = -1;

        for (let i = 0; i < possiblePositions.length; i++) {
            const currentPosition = possiblePositions[i];

            let costForPosition: number = 0;

            for (let j = 0; j < startPositions.length; j++) {
                const distance = Math.abs(currentPosition - startPositions[j]);

                costForPosition = costForPosition + costsPerDistance.get(distance)!;
            }

            if (costForPosition < costOfCheapestPosition) {
                costOfCheapestPosition = costForPosition;
                cheapestPosition = i;
            }

            costs.set(i, costForPosition);
        }

        console.log(costs)
        console.log({cheapestPosition, costOfCheapestPosition})
    }
}

new Puzzle_7b();