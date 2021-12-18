import {Puzzle} from "./puzzle";
import {UndirectedGraph} from "./helpers/graph";
import {addToArray} from "./helpers/map-helpers";
import {isAllUpperCase} from "./helpers/string-helpers";
import {LineExtractor} from "./line-extractor";

export class Puzzle_12a extends Puzzle {
    edges: Map<string, string[]> = new Map<string, string[]>();
    paths = ['end'];

    constructor() {
        // super('./input/test_input.txt');
        super('./input/12.txt');
    }

    processLines(lines: string[]) {
        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split('-');

            addToArray(this.edges, parts[0], parts[1]);
            addToArray(this.edges, parts[1], parts[0]);
        }

        const completedPaths: Set<string> = new Set<string>()

        while(!this.allPathsReachedStart()) {
            const newPaths: string[] = [];

            for (let i = 0; i < this.paths.length; i++) {
                const currentPath = this.paths[i];
                const currentStartingNode = currentPath.split(',')[0];

                if (currentStartingNode !== 'start') {
                    const e = this.edges.get(currentStartingNode)!;

                    for (let j = 0; j < e.length; j++) {
                        const currentEdge = e[j];

                        if ((isAllUpperCase(currentEdge) || currentEdge === 'start') || !currentPath.includes(currentEdge)) {
                            const newPath = currentEdge + ',' + currentPath;
                            newPaths.push(newPath)

                            if (currentEdge === 'start') {
                                completedPaths.add(newPath);
                            }
                        }
                    }
                }
            }
            this.paths = newPaths;
        }

        console.log(completedPaths.size);
    }

    allPathsReachedStart() {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].split(',')[0] !== 'start') {
                return false;
            }
        }
        return true;
    }

    checkIfCorrect(completedPaths: Set<string>) {
        const correctLines: string[] = [
            'start,A,b,A,c,A,end',
            'start,A,b,A,end',
            'start,A,b,end',
            'start,A,c,A,b,A,end',
            'start,A,c,A,b,end',
            'start,A,c,A,end',
            'start,A,end',
            'start,b,A,c,A,end',
            'start,b,A,end',
            'start,b,end'
        ]
        const calculatedLines = Array.from(completedPaths.values())

        let allIncluded: boolean = true;
        let noExtra: boolean = true;

        for (let i = 0; i < correctLines.length; i++) {
            if (!calculatedLines.includes(correctLines[i])) {
                allIncluded = false;
                console.log('Missing Line: ' + correctLines[i]);
            }
        }

        for (let i = 0; i < calculatedLines.length; i++) {
            if (!correctLines.includes(calculatedLines[i])) {
                noExtra = false;
                console.log('Extra Line: ' + calculatedLines[i]);
            }
        }

        console.log({allIncluded, noExtra});
    }
}



new Puzzle_12a();