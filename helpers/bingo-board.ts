export class BingoBoard {
    private boardSize = 5;

    private numbers: number[][] = [];
    private marked: boolean[][] = [];

    private lastNumberCalled: number = NaN;
    private numbersCalled: number = 0;

    private hasWon: boolean = false;

    constructor(lines: string[]) {
        for (let i = 0; i < this.boardSize; i++) {
            const parts = lines[i].split(' ').filter(l => l !== ' ' && l !== '');

            this.numbers.push(parts.map(n => Number.parseInt(n)));
            this.marked.push(this.numbers[i].map(n => false))
        }
    }

    markNumber(n: number) {
        if (this.hasWon) {
            // no need to mark anymore
            return;
        }

        this.lastNumberCalled = n;
        this.numbersCalled++;

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                this.marked[i][j] = this.marked[i][j] || this.numbers[i][j] === n;
            }
        }
    }

    hasBoardWon() {
        if (this.hasWon) {
            return true;
        }

        for (let i = 0; i < this.boardSize; i++) {
            let lineWinner = true;

            for (let j = 0; j < this.boardSize; j++) {
                lineWinner = lineWinner && this.marked[i][j];
            }

            if (lineWinner){
                this.hasWon = true;
                return true;
            }
        }

        for (let j = 0; j < this.boardSize; j++) {
            let colWinner = true;

            for (let i = 0; i < this.boardSize; i++) {
                colWinner = colWinner && this.marked[i][j];
            }

            if (colWinner){
                this.hasWon = true;
                return true;
            }
        }

        return false;
    }

    calculateScore() {
        let unmarkedSum = 0;

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (!this.marked[i][j]) {
                    unmarkedSum = unmarkedSum + this.numbers[i][j];
                }
            }
        }

        const score = unmarkedSum * this.lastNumberCalled;

        return score;
    }

    callsNeededToWin() {
        return this.numbersCalled
    }
}