import {Puzzle} from "./puzzle";
import {Printable, PriorityQueue} from "./helpers/priority-queue";
import {replaceAll, replaceCharAtIndex} from "./helpers/string-helpers";
import {SnailFishNumberPair} from "./helpers/snail-fish-number-pair";

export class Puzzle_18b extends Puzzle {

    constructor() {
        // super('./input/test_input.txt');
        super('./input/18.txt');
    }

    processLines(lines: string[]) {
        let largestMagnitude = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines.length; j++) {
                if (i !== j) {
                    const p1 = SnailFishNumberPair.constructFromString(lines[i]);
                    const p2 = SnailFishNumberPair.constructFromString(lines[j]);

                    const sum = SnailFishNumberPair.add(p1, p2);
                    sum.reduce();

                    const magnitude = sum.calculateMagnitude();

                    if (magnitude > largestMagnitude) {
                        largestMagnitude = magnitude;
                    }
                }
            }
        }

        console.log(largestMagnitude)
    }

}

new Puzzle_18b();