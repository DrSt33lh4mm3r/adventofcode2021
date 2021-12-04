import {Puzzle} from "./puzzle";

export class Puzzle_3a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/3.txt');
    }

    processLines(lines: string[]) {
        let gamma = '';
        let epsilon = '';

        for (let pos = 0; pos < lines[0].length; pos++) {
            let oneCount = 0;

            for (let i = 0; i < lines.length; i++) {
                if (lines[i][pos] === '1') {
                    oneCount++;
                }
            }

            if (oneCount > lines.length - oneCount) {
                gamma = gamma + '1';
                epsilon = epsilon + '0'
            } else {
                gamma = gamma + '0';
                epsilon = epsilon + '1'
            }
        }

        const gammaParsed = Number.parseInt(gamma, 2);
        const epsilonParsed = Number.parseInt(epsilon, 2);

        console.log({gamma, epsilon, gammaParsed, epsilonParsed})
        console.log(gammaParsed * epsilonParsed)
    }
}

new Puzzle_3a();