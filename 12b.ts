import {Puzzle} from "./puzzle";
import {UndirectedGraph} from "./helpers/graph";
import {addToArray} from "./helpers/map-helpers";
import {isAllUpperCase} from "./helpers/string-helpers";
import {LineExtractor} from "./line-extractor";

export class Puzzle_12b extends Puzzle {
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
            // console.log(completedPaths.size)
            const newPaths: string[] = [];

            for (let i = 0; i < this.paths.length; i++) {
                const currentPath = this.paths[i];
                const currentStartingNode = currentPath.split(',')[0];

                if (currentStartingNode !== 'start') {
                    const e = this.edges.get(currentStartingNode)!;

                    for (let j = 0; j < e.length; j++) {
                        const currentEdge = e[j];

                        let canBeAdded: boolean = false;
                        let double: boolean = false;

                        if (isAllUpperCase(currentEdge)) {
                            canBeAdded = true;
                        } else if(currentEdge === 'end') {
                            canBeAdded = false;
                        } else {
                            // lowercase
                            if (currentPath.split(',').includes(currentEdge)) {
                                if (currentEdge === 'start' || currentEdge === 'end') {
                                    // cant visit start or end more than once
                                    canBeAdded = false;
                                } else if (currentPath.includes('|')) {
                                    // already one duplicate
                                    canBeAdded = false
                                } else {
                                    // no duplicate yet
                                    canBeAdded = true;
                                    double = true;
                                }

                            } else {
                                // no duplicates yet
                                canBeAdded = true;
                            }
                        }

                        if (canBeAdded) {
                            let newPath = currentEdge + ',' + currentPath;

                            if (double) {
                                newPath = newPath + '|' + currentEdge;
                            }

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

        // this.checkIfCorrect(completedPaths);
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
        const completedPathsArray = Array.from(completedPaths.values()).map(line => line.split('|')[0])
        completedPaths = new Set<string>(completedPathsArray);

        const correctLines: string[] = [
            'start,A,b,A,b,A,c,A,end',
            'start,A,b,A,b,A,end',
            'start,A,b,A,b,end',
            'start,A,b,A,c,A,b,A,end',
            'start,A,b,A,c,A,b,end',
            'start,A,b,A,c,A,c,A,end',
            'start,A,b,A,c,A,end',
            'start,A,b,A,end',
            'start,A,b,d,b,A,c,A,end',
            'start,A,b,d,b,A,end',
            'start,A,b,d,b,end',
            'start,A,b,end',
            'start,A,c,A,b,A,b,A,end',
            'start,A,c,A,b,A,b,end',
            'start,A,c,A,b,A,c,A,end',
            'start,A,c,A,b,A,end',
            'start,A,c,A,b,d,b,A,end',
            'start,A,c,A,b,d,b,end',
            'start,A,c,A,b,end',
            'start,A,c,A,c,A,b,A,end',
            'start,A,c,A,c,A,b,end',
            'start,A,c,A,c,A,end',
            'start,A,c,A,end',
            'start,A,end',
            'start,b,A,b,A,c,A,end',
            'start,b,A,b,A,end',
            'start,b,A,b,end',
            'start,b,A,c,A,b,A,end',
            'start,b,A,c,A,b,end',
            'start,b,A,c,A,c,A,end',
            'start,b,A,c,A,end',
            'start,b,A,end',
            'start,b,d,b,A,c,A,end',
            'start,b,d,b,A,end',
            'start,b,d,b,end',
            'start,b,end',
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



new Puzzle_12b();