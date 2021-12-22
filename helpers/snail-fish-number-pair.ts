import {Printable} from "./priority-queue";

export class SnailFishNumberPair extends Printable {
    private parent: SnailFishNumberPair | null;

    private left: SnailFishNumberPair | number;
    private right: SnailFishNumberPair | number;

    private depth: number = 0;

    constructor(left: SnailFishNumberPair | number, right: SnailFishNumberPair | number) {
        super();
        this.parent = null;

        this.left = left;
        this.right = right;

        if (typeof left !== 'number') {
            left.setParent(this);
        }

        if (typeof right !== 'number') {
            right.setParent(this)
        }
    }

    private setParent(p: SnailFishNumberPair) {
        this.parent = p;
    }

    private setLeft(l: SnailFishNumberPair | number) {
        this.left = l;
    }

    private setRight(r: SnailFishNumberPair | number) {
        this.right = r;
    }

    calculateDepth() {
        this.setDepth(0);
    }

    private setDepth(d: number) {
        this.depth = d;
        d++;

        if (typeof this.left !== 'number') {
            this.left.setDepth(d)
        }

        if (typeof this.right !== 'number') {
            this.right.setDepth(d);
        }
    }

    reduce() {
        this.calculateDepth();

        while (!this.isReduced()) {
            const {numbers, depths, nodesInOrder} = this.traverse();

            if (this.needsExploding(depths)) {
                this.explode(nodesInOrder)
            } else if (this.needsSplitting(numbers)) {
                this.split(nodesInOrder);
            }
        }
    }

    testExplode() {
        const {numbers, depths, nodesInOrder} = this.traverse();

        if (this.needsExploding(depths)) {
            this.explode(nodesInOrder)
        } else if (this.needsSplitting(numbers)) {
            this.split(nodesInOrder);
        }
    }

    private explode(nodesInOrder: SnailFishNumberPair[]) {
        const toExplode = this.findLeftMostPairThatNeedsExploding(nodesInOrder);

        if (toExplode) {
            const explParent = toExplode.parent!; // only pairs with depth > 4 can explode, those always have a parent
            const explLeft: number = toExplode.left as number; // only pairs with two normal numbers can explode
            const explRight: number = toExplode.right as number; // only pairs with two normal numbers can explode

            if (explParent.left === toExplode) {
                explParent.setLeft(0);

                if (typeof explParent.right === 'number') {
                    explParent.right = explParent.right + explRight;
                } else {
                    const index = nodesInOrder.indexOf(toExplode) + 1;

                    if (index < nodesInOrder.length) {
                        const node = nodesInOrder[index];

                        if (typeof node.left === 'number') {
                            node.left = node.left + explRight;
                        } else if (typeof node.right === 'number') {
                            node.right = node.right + explRight;
                        }
                    }
                }

                const index = nodesInOrder.indexOf(toExplode) - 1;

                if (index >= 0) {
                    const node = nodesInOrder[index];

                    if (typeof node.right === 'number') {
                        node.right = node.right + explLeft;
                    } else if (typeof node.left === 'number') {
                        node.left = node.left + explLeft;
                    }
                }
            } else if (explParent.right === toExplode){
                explParent.setRight(0);

                if (typeof explParent.left === 'number') {
                    explParent.left = explParent.left + explLeft
                } else {
                    const index = nodesInOrder.indexOf(toExplode) - 1;

                    if (index > 0) {
                        const node = nodesInOrder[index];

                        if (typeof node.right === 'number') {
                            node.right = node.right + explLeft;
                        } else if (typeof node.left === 'number') {
                            node.left = node.left + explLeft;
                        }
                    }
                }

                const index = nodesInOrder.indexOf(toExplode) + 1;

                // console.log({index, length: nodesInOrder.length})

                if (index < nodesInOrder.length) {
                    const node = nodesInOrder[index];

                    // console.log(node);

                    if (typeof node.left === 'number') {
                        node.left = node.left + explRight;
                    } else if (typeof node.right === 'number') {
                        node.right = node.right + explRight;
                    }
                }
            }
        }
    }

    private findLeftMostPairThatNeedsExploding(nodesInOrder: SnailFishNumberPair[]): SnailFishNumberPair | undefined {
        for (let i = 0; i < nodesInOrder.length; i++) {
            const node = nodesInOrder[i];

            if (node.depth > 3) {
                return node;
            }
        }

        return undefined;
    }

    // private findLeftMostPairThatNeedsExploding(): SnailFishNumberPair | undefined {
    //     if (typeof this.left === 'number' && typeof this.right === 'number' && this.depth > 3) {
    //         return this;
    //     } else {
    //         if (typeof this.left !== 'number') {
    //             return this.left.findLeftMostPairThatNeedsExploding();
    //         } else if (typeof this.right !== 'number') {
    //             return this.right.findLeftMostPairThatNeedsExploding();
    //         } else {
    //             return undefined;
    //         }
    //     }
    // }

    private split(nodesInOrder: SnailFishNumberPair[]) {
        const node = nodesInOrder.filter(n =>
            (typeof n.left === 'number' && n.left > 9)
            || (typeof n.right === 'number' && n.right > 9)
        )[0];

        if (node) {
            if (typeof node.left === 'number' && node.left > 9) {
                const l: number = node.left;

                const ll = Math.floor(l / 2);
                const lr = Math.ceil(l / 2);

                const newL = new SnailFishNumberPair(ll, lr);

                newL.parent = node;
                newL.depth = node.depth + 1;

                node.setLeft(newL)

                this.calculateDepth();
            } else if (typeof node.right === 'number' && node.right > 9) {
                const r: number = node.right;

                const rl = Math.floor(r / 2);
                const rr = Math.ceil(r / 2);

                const newR = new SnailFishNumberPair(rl, rr);

                newR.parent = node;
                newR.depth = node.depth + 1;

                node.setRight(newR)

                this.calculateDepth();
            }
        }
    }

    isReduced(): boolean {
        const {numbers, depths} = this.traverse();

        const exploding = this.needsExploding(depths);
        const splitting = this.needsSplitting(numbers);

        return !exploding && !splitting
    }

    private needsExploding(depths: number[]): boolean {
        return depths.filter(d => d > 3).length > 0;
    }

    private needsSplitting(numbers: number[]): boolean {
        return numbers.filter(n => n > 9).length > 0;
    }

    printNumbersOnly(): void {
        const {numbers} = this.traverse();

        console.log(numbers.join(','));
    }

    private traverse() {
        let numbers: number[] = [];
        let depths: number[] = [];
        let nodesLeft: SnailFishNumberPair[] = [];
        let nodesRight: SnailFishNumberPair[] = [];

        if (typeof this.left === 'number') {
            numbers.push(this.left);
            depths.push(this.depth);
        } else {
            const l = this.left.traverse()
            numbers = numbers.concat(l.numbers);
            depths = depths.concat(l.depths);
            nodesLeft = l.nodesInOrder
        }

        if (typeof this.right === 'number') {
            numbers.push(this.right);
            depths.push(this.depth);
        } else {
            const r = this.right.traverse()
            numbers = numbers.concat(r.numbers);
            depths = depths.concat(r.depths);
            nodesRight = r.nodesInOrder
        }

        let nodesInOrder: SnailFishNumberPair[] = [];

        if (nodesLeft.length > 0 && nodesRight.length > 0) {
            nodesInOrder = nodesInOrder.concat(nodesLeft);
            nodesInOrder = nodesInOrder.concat(nodesRight);
        } else {
            nodesInOrder = nodesInOrder.concat(nodesLeft);
            nodesInOrder.push(this);
            nodesInOrder = nodesInOrder.concat(nodesRight);
        }

        return {numbers, depths, nodesInOrder};
    }

    public calculateMagnitude(): number {
        let magnitude = 0;

        if (typeof this.left === 'number') {
            magnitude = magnitude + (3 * this.left);
        } else {
            magnitude = magnitude + (3 * this.left.calculateMagnitude());
        }

        if (typeof this.right === 'number') {
            magnitude = magnitude + (2 * this.right);
        } else {
            magnitude = magnitude + (2 * this.right.calculateMagnitude());
        }

        return magnitude;
    }

    toString(): string {
        let lS = '';

        if (typeof this.left === 'number') {
            lS = '' + this.left;
        } else {
            lS = this.left.toString();
        }

        let rS = ''

        if (typeof this.right === 'number') {
            rS = '' + this.right;
        } else {
            rS = this.right.toString();
        }


        return '[' + lS + ',' + rS + ']';
    }

    static constructFromString(str: string): SnailFishNumberPair {
        const pairs: Map<string, SnailFishNumberPair> = new Map<string, SnailFishNumberPair>();
        let pairCounter: number = 1;

        while (str.includes('[')) {
            let currOpen = 0;
            let foundOpen = false;

            while (currOpen < str.length && !foundOpen) {
                if (str[currOpen] === '[') {
                    foundOpen = true;
                } else {
                    currOpen++;
                }
            }

            let currClose = currOpen + 1;
            let foundClose = false;

            while (currClose < str.length && !foundClose) {
                if (str[currClose] === ']') {
                    foundClose = true;
                } else if (str[currClose] === '[') {
                    currOpen = currClose;
                    currClose++;
                } else {
                    currClose++;
                }
            }

            const before = str.substr(0, currOpen);

            let innerString = str.substr(currOpen, (currClose - currOpen + 1));
            innerString = innerString.replace('[', '');
            innerString = innerString.replace(']', '');

            const after = str.substr(currClose + 1);


            const parts = innerString.split(',');

            let left: number | SnailFishNumberPair;
            let right: number | SnailFishNumberPair;

            if (Number.isInteger(Number.parseInt(parts[0]))) {
                left = Number.parseInt(parts[0])
            } else {
                left = pairs.get(parts[0])!
            }

            if (Number.isInteger(Number.parseInt(parts[1]))) {
                right = Number.parseInt(parts[1]);
            } else {
                right = pairs.get(parts[1])!
            }

            const newPair = new SnailFishNumberPair(left, right);
            pairCounter++;
            const pairKey = 'pair' + pairCounter;

            pairs.set(pairKey, newPair)

            innerString = pairKey;

            str = before + innerString + after;
        }

        const topLevelPair = pairs.get('pair' + pairCounter)!

        topLevelPair.calculateDepth();

        return topLevelPair;
    }

    static add(p1: SnailFishNumberPair, p2: SnailFishNumberPair): SnailFishNumberPair {
        const sum = new SnailFishNumberPair(p1, p2);
        sum.calculateDepth();
        sum.reduce();
        return sum;
    }
}
