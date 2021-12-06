import {Puzzle} from "./puzzle";
import {BingoBoard} from "./Helpers/bingo-board";

export class Puzzle_6b extends Puzzle {
    constructor() {
        // super('./input/test_input.txt');
        super('./input/6.txt');
    }

    processLines(lines: string[]) {
        const population: number[] = lines[0].split(',').map(n => Number.parseInt(n));

        const groupedPopulation: Map<number, number> = new Map<number, number>();

        for (let i = 0; i < 10; i++) {
            groupedPopulation.set(i, 0);
        }

        for (let i = 0; i < population.length; i++) {
            const key = population[i];
            groupedPopulation.set(key, groupedPopulation.get(key)! + 1);
        }

        const days = 256;

        for (let i = 0; i < days; i++) {
            const population0 = groupedPopulation.get(0)!;
            groupedPopulation.set(0, groupedPopulation.get(1)!);
            groupedPopulation.set(1, groupedPopulation.get(2)!);
            groupedPopulation.set(2, groupedPopulation.get(3)!);
            groupedPopulation.set(3, groupedPopulation.get(4)!);
            groupedPopulation.set(4, groupedPopulation.get(5)!);
            groupedPopulation.set(5, groupedPopulation.get(6)!);
            groupedPopulation.set(6, groupedPopulation.get(7)! + population0);
            groupedPopulation.set(7, groupedPopulation.get(8)!);
            groupedPopulation.set(8, population0);
        }

        let populationSize = 0;

        for (let i = 0; i < 10; i++) {
            populationSize = populationSize + groupedPopulation.get(i)!;
        }

        console.log('Population Size: ' + populationSize)
    }
}

new Puzzle_6b();