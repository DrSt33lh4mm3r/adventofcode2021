import {Puzzle} from "./puzzle";
import {BingoBoard} from "./helpers/bingo-board";

export class Puzzle_4a extends Puzzle {
    lines: string[] = [];
    constructor() {
        // super('./input/test_input.txt');
        super('./input/4.txt');
    }

    processLines(lines: string[]) {
        const drawnNumbers = lines[0].split(',').map(n => Number.parseInt(n));

        const bingoBoards = this.buildBingoBoards(lines);

        for (let i = 0; i < drawnNumbers.length; i++) {
            const n = drawnNumbers[i]
            for (let j = 0; j < bingoBoards.length; j++) {
                const b = bingoBoards[j];

                b.markNumber(n);

                if(b.hasBoardWon()) {
                    console.log('Board won with score: ' + b.calculateScore());
                    return;
                }
            }
        }
    }

    private buildBingoBoards(lines: string[]) {
        lines.push('')

        const boards: BingoBoard[] = [];

        let tempBoard: string[] = []

        for (let i = 2; i < lines.length; i++) {
            if (lines[i] === '') {
                boards.push(new BingoBoard(tempBoard));
                tempBoard = [];
            } else {
                tempBoard.push(lines[i]);
            }
        }

        return boards;
    }
}

new Puzzle_4a();