import {Puzzle} from "./puzzle";

export class Puzzle_9b extends Puzzle {
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

        let lowPoints: {line: number, column: number}[] = [];

        for (let line = 0; line < heightMap.length; line++) {
            for (let column = 0; column < heightMap[line].length; column++) {
                const neighbors = this.getNeighbors(heightMap, line, column)
                const smallestNeighbor = Math.min(...neighbors);

                if (heightMap[line][column] < smallestNeighbor) {
                    lowPoints.push({line, column});
                }
            }
        }

        let basins: number[] = [];

        for (let i = 0; i < lowPoints.length; i++) {
            basins.push(this.findBasin(heightMap, lowPoints[i].line, lowPoints[i].column))
        }

        basins = basins.sort((a, b) => b - a);

        console.log(basins[0] * basins[1] * basins[2]);
    }

    findBasin(heightMap: number[][], line: number, column: number) {
        const neighbors: Map<string, {line: number, column: number, height: number, checked: boolean}> = new Map();

        neighbors.set(line + '|' + column, {line, column, height: heightMap[line][column], checked: false})

        let checking = neighbors.get(Array.from(neighbors.keys()).filter(e => !(neighbors.get(e)!).checked)[0]);

        while (checking) {
            const newNeighbors = this.getNeighborsWithCoords(heightMap, checking.line, checking.column);

            for (let i = 0; i < newNeighbors.length; i++) {
                const n = newNeighbors[i];

                if (!neighbors.has(n.line + '|' + n.column)) {
                    neighbors.set(n.line + '|' + n.column, {line: n.line, column: n.column, height: n.height, checked: false})
                }
            }

            neighbors.set(checking.line + '|' + checking.column, {line: checking.line, column: checking.column, height: heightMap[checking.line][checking.column], checked: true})
            checking = neighbors.get(Array.from(neighbors.keys()).filter(e => !(neighbors.get(e)!).checked)[0]);
        }

        return neighbors.size;
    }

    getNeighborsWithCoords(heightMap: number[][], line: number, column: number): {line: number, column: number, height: number}[] {
        const neighbors: {line: number, column: number, height: number}[] = [];

        try {
            neighbors.push({line: line - 1, column, height: heightMap[line - 1][column]})
        } catch(e) {}
        try {
            neighbors.push({line: line + 1, column, height: heightMap[line + 1][column]})
        } catch(e) {}
        try {
            neighbors.push({line, column: column - 1, height: heightMap[line][column - 1]})
        } catch(e) {}
        try {
            neighbors.push({line, column: column + 1, height: heightMap[line][column + 1]})
        } catch(e) {}

        return neighbors.filter(e => (e.height !== undefined && e.height !== 9));
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

new Puzzle_9b();