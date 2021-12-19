import {Puzzle} from "./puzzle";
import {mergeBinaryStrings, replaceCharAtIndex, reverseString} from "./helpers/string-helpers";
import {incrementForKey} from "./helpers/map-helpers";

export class Puzzle_14a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/14.txt');
    }

    processLines(lines: string[]) {
        let polymer: string =  lines[0];

        const rules: Map<string, string> = new Map<string, string>();

        for (let i = 2; i < lines.length; i++) {
            const parts = lines[i].split(' -> ');

            const key = parts[0]
            const value = parts[1]

            rules.set(key, value);
        }

        for (let i = 0; i < 10; i++) {
            let newPolymer = polymer[0];

            for (let x = 1; x < polymer.length; x++) {
                const key = polymer[x - 1] + polymer[x];
                const value = rules.get(key);

                newPolymer = newPolymer + value + polymer[x];
            }

            polymer = newPolymer;
        }

        const counts: Map<string, number> = new Map<string, number>();

        for (let i = 0; i < polymer.length; i++) {
            incrementForKey(counts, polymer[i], 1)
        }

        const quantities = Array.from(counts.values()).sort((a, b) => b - a);

        console.log(quantities[0] - quantities[quantities.length - 1])
    }
}



new Puzzle_14a();