import {Puzzle} from "./puzzle";

export class Puzzle_3b extends Puzzle {
    lines: string[] = [];
    constructor() {
        // super('./input/test_input.txt');
        super('./input/3.txt');
    }

    processLines(lines: string[]) {
        this.lines = lines;
        const oxygen = this.calculateOxygenGeneratorRating();
        const co2 = this.calculateCO2ScrubberRating();

        console.log(oxygen * co2)
    }

    private countOnesAtPosition(lines: string[], position: number) {
        let oneCount = 0;

        for (let i = 0; i < lines.length; i++) {
            if (lines[i][position] === '1') {
                oneCount++;
            }
        }
        return oneCount;
    }

    private getMostCommonBitAtPosition(lines: string[], position: number, charWhenTied: string): string {
        const oneCount = this.countOnesAtPosition(lines, position);

        if (oneCount > lines.length - oneCount) {
            return '1';
        } else if (oneCount < lines.length - oneCount) {
            return '0';
        } else {
            return charWhenTied
        }
    }

    private getLeastCommonBitAtPosition(lines: string[], position: number, charWhenTied: string): string {
        const oneCount = this.countOnesAtPosition(lines, position);

        if (oneCount > lines.length - oneCount) {
            return '0';
        } else if (oneCount < lines.length - oneCount) {
            return '1';
        } else {
            return charWhenTied
        }
    }

    private calculateOxygenGeneratorRating() {
        let lines: string[] = JSON.parse(JSON.stringify(this.lines));

        const charWhenTied = '1';

        let position = 0;
        let prefix = '';

        while (lines.length > 1) {
            const mostCommonAtPosition = this.getMostCommonBitAtPosition(lines, position, charWhenTied)
            prefix = prefix + mostCommonAtPosition;

            lines = lines.filter(l => l.startsWith(prefix));

            position++;
        }

        const oxygenRating = lines[0];
        const oxygenRatingParsed = Number.parseInt(lines[0], 2);

        console.log({oxygenRating, oxygenRatingParsed})

        return oxygenRatingParsed;
    }

    private calculateCO2ScrubberRating() {
        let lines: string[] = JSON.parse(JSON.stringify(this.lines));

        const charWhenTied = '0';

        let position = 0;
        let prefix = '';

        while (lines.length > 1) {
            const leastCommonAtPosition = this.getLeastCommonBitAtPosition(lines, position, charWhenTied)
            prefix = prefix + leastCommonAtPosition;

            lines = lines.filter(l => l.startsWith(prefix));

            position++;
        }

        const cO2Rating = lines[0];
        const cO2RatingParsed = Number.parseInt(lines[0], 2);

        console.log({cO2Rating, cO2RatingParsed})

        return cO2RatingParsed;
    }
}

new Puzzle_3b();