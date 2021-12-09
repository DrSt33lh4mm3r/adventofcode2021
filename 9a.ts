import {Puzzle} from "./puzzle";

export class Puzzle_9a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/9.txt');
    }

    processLines(lines: string[]) {
        const heightMap: number[][] = [];

        for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            const line: number[] = [];

            for (let j = 0; j < l.length; j++) {
                line.push(Number.parseInt(l[j]));
            }

            heightMap.push(line);
        }

        let riskLevelSum = 0;

        for (let line = 0; line < heightMap.length; line++) {
            for (let column = 0; column < heightMap[line].length; column++) {
                const neighbors = this.getNeighbors(heightMap, line, column)
                const smallestNeighbor = Math.min(...neighbors);

                if (heightMap[line][column] < smallestNeighbor) {
                    // console.log('Found LowPoint at line: ' + line + ' column: ' + column);
                    // console.log({lowPoint: heightMap[line][column], neighbors})
                    riskLevelSum = riskLevelSum + heightMap[line][column] + 1
                }
            }
        }

        console.log(riskLevelSum)
    }

    getNeighbors(heightMap: number[][], line: number, column: number) {
        const neighbors: number[] = [];

        try {
            neighbors.push(heightMap[line - 1][column])
        } catch(e) {}
        try {
            neighbors.push(heightMap[line + 1][column])
        } catch(e) {}
        try {
            neighbors.push(heightMap[line][column - 1])
        } catch(e) {}
        try {
            neighbors.push(heightMap[line][column + 1])
        } catch(e) {}

        return neighbors.filter(e => e !== undefined);
    }
}

new Puzzle_9a();