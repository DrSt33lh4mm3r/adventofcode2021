import {Puzzle} from "./puzzle";
import {Printable, PriorityQueue} from "./helpers/priority-queue";

export class Puzzle_15a extends Puzzle {
    riskLevel: number[][] = [];
    totalRisk: number[][] = [];

    maxX = 0;
    maxY = 0;

    openList: PriorityQueue<Point> = new PriorityQueue<Point>()
    closedList: Set<string> = new Set<string>();

    constructor() {
        // super('./input/test_input.txt');
        super('./input/15.txt');
    }

    processLines(lines: string[]) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].split('').map(n => Number.parseInt(n));
            this.riskLevel.push(line);
            this.totalRisk.push(line.map(n => Number.MAX_SAFE_INTEGER));

            this.maxX = line.length - 1;
        }

        this.maxY = lines.length - 1;

        this.totalRisk[0][0] = 0;

        this.aStar();

        console.log(this.totalRisk[this.maxY][this.maxX])
        // console.log(this.closedList)
    }

    aStar() {
        this.openList.enqueue(new Point(0, 0), 0);

        while (this.openList.size() > 0) {
            const currentNode = this.openList.removeMin()!;

            if (currentNode.x === this.maxX && currentNode.y === this.maxY) {
                return;
            }

            // console.log('adding to closedList');
            this.closedList.add(currentNode.toString());

            this.expandNode(currentNode);
        }
    }


    private expandNode(currentNode: Point) {
        // console.log({currentNode})
        const successors = this.getAllSuccessors(currentNode);

        for (let i = 0; i < successors.length; i++) {
            const successor = successors[i];

            // console.log({successor})

            if (this.closedList.has(successor.toString())) {
                // console.log('continue because successor is allready closed')
                // const s = successor.toString();
                // console.log(s)
                // console.log(Array.from(this.closedList.values()))
                continue;
            }

            const tentative_g = this.totalRisk[currentNode.y][currentNode.x]
                + this.riskLevel[successor.y][successor.x];

            if (this.openList.contains(successor) && tentative_g >= this.totalRisk[successor.y][successor.x]) {
                continue;
            }

            this.totalRisk[successor.y][successor.x] = tentative_g;

            const f = tentative_g; // what the fuck is h(successor)??

            // console.log({successor, tentative_g, f})

            if (this.openList.contains(successor)) {
                this.openList.updateKey(successor, f);
            } else {
                this.openList.enqueue(successor, f);
            }
        }
    }

    private getAllSuccessors(p: Point) {
        const successors: Point[] = [];

        // up
        if (p.y - 1 >= 0){
            successors.push(new Point(p.x, p.y - 1))
        }

        // down
        if (p.y + 1 <= this.maxY){
            successors.push(new Point(p.x,p.y + 1))
        }

        // left
        if (p.x - 1 >= 0){
            successors.push(new Point(p.x - 1, p.y))
        }

        // right
        if (p.x + 1 <= this.maxX){
            successors.push(new Point(p.x + 1, p.y))
        }

        return successors;
    }
}

export class Point extends Printable{
    x: number;
    y: number;


    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }


    toString(): string {
        return '' + this.x.toString() + '|' + this.y.toString();
    }
}



new Puzzle_15a();