import {Puzzle} from "./puzzle";
import {BingoBoard} from "./helpers/bingo-board";

export class Puzzle_4b extends Puzzle {
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

                if (!b.hasBoardWon()) {
                    b.markNumber(n);
                }
            }
        }

        let triesNeeded: number = 0;
        let index = -1;

        for (let j = 0; j < bingoBoards.length; j++) {
            const b = bingoBoards[j];

            if (b.callsNeededToWin() > triesNeeded) {
                triesNeeded = b .callsNeededToWin();
                index = j;
            }
        }

        console.log('Board ' + (index + 1) + ' won last with a score of ' + bingoBoards[index].calculateScore());
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

new Puzzle_4b();