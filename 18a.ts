import {Puzzle} from "./puzzle";
import {Printable, PriorityQueue} from "./helpers/priority-queue";
import {replaceAll, replaceCharAtIndex} from "./helpers/string-helpers";
import {SnailFishNumberPair} from "./helpers/snail-fish-number-pair";

export class Puzzle_18a extends Puzzle {

    constructor() {
        // super('./input/test_input.txt');
        super('./input/18.txt');
    }

    processLines(lines: string[]) {
        let sum = SnailFishNumberPair.constructFromString(lines[0]);

        for (let i = 1; i < lines.length; i++) {
            const summand = SnailFishNumberPair.constructFromString(lines[i]);
            sum = SnailFishNumberPair.add(sum, summand);
            sum.reduce()
        }

        console.log(sum.toString());
        console.log(sum.calculateMagnitude())
    }

}

new Puzzle_18a();