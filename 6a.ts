import {Puzzle} from "./puzzle";

export class Puzzle_6a extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/6.txt');
    }

    processLines(lines: string[]) {
        const population: number[] = lines[0].split(',').map(n => Number.parseInt(n));

        // console.log('Initial state: ' + population.join(','))

        const days = 80;

        const daysToReproduce = 6;
        const daysToMaturity = 8;

        for (let i = 0; i < days; i++) {
            let newBorn = 0;

            for (let j = 0; j < population.length; j++) {
                population[j] = population[j] - 1;

                if (population[j] < 0) {
                    population[j] = daysToReproduce;
                    newBorn++;
                }
            }

            for (let j = 0; j < newBorn; j++) {
                population.push(daysToMaturity)
            }

            // console.log('Initial state: ' + population.join(','))
        }

        console.log('Population Size: ' + population.length)
    }
}

new Puzzle_6a();