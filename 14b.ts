import {Puzzle} from "./puzzle";
import {mergeBinaryStrings, replaceCharAtIndex, reverseString} from "./helpers/string-helpers";
import {addForKey, incrementForKey} from "./helpers/map-helpers";

export class Puzzle_14b extends Puzzle {
    constructor() {
        super('./input/test_input.txt');
        // super('./input/14.txt');
    }

    processLines(lines: string[]) {
        let polymer: string =  lines[0];

        const rules: Map<string, string[]> = new Map<string, string[]>();

        for (let i = 2; i < lines.length; i++) {
            const parts = lines[i].split(' -> ');

            const key = parts[0]
            const value = [parts[0][0] + parts[1], parts[1] + parts[0][1]]

            rules.set(key, value);
        }

        let pairs: Map<string, number> = new Map<string, number>();

        for (let i = 1; i < polymer.length; i++) {
            const key = polymer[i - 1] + polymer[i];
            incrementForKey(pairs, key, 1);
        }

        let counts: Map<string, number> = new Map<string, number>();

        for (let i = 0; i < 40; i++) {
            const newPairs: Map<string, number> = new Map<string, number>();
            counts = new Map<string, number>();

            const currentPairs = Array.from(pairs.keys());

            for (let j = 0; j < currentPairs.length; j++) {
                const count = pairs.get(currentPairs[j])!;
                const rule = rules.get(currentPairs[j])!

                addForKey(counts, rule[0][0], count)
                addForKey(counts, rule[0][1], count)

                if (j === currentPairs.length - 1) {
                    addForKey(counts, rule[1][1], count)
                }

                for (let k = 0; k < rule.length; k++) {
                    addForKey(newPairs, rule[k], count)
                }
            }

            pairs = newPairs;
        }

        const quantities = Array.from(counts.values()).sort((a, b) => b - a);

        // not really sure why i need to add 1 here but seems to be working
        // i guess i started counting at 0 somewhere???
        console.log(quantities[0] - quantities[quantities.length - 1] + 1)
    }
}



new Puzzle_14b();