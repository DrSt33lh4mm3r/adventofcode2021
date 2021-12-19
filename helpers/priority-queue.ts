export class PriorityQueue<T extends Printable> {
    values: {value: T, priority: number, uniqueKey: string}[] = [];

    constructor() {
    }

    enqueue(value: T, priority: number) {
        this.values.push({value, priority, uniqueKey: value.toString()});
        this.sort();
    }

    sort() {
        this.values = this.values.sort((a, b) => a.priority - b.priority)
    }

    removeMin() {
        return this.values.shift()!.value;
    }

    size() {
        return this.values.length;
    }

    contains(value: T): boolean {
        // console.log('contains')
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].uniqueKey === value.toString()) {
                return true;
            }
        }

        return false;
    }

    updateKey(value: T, priority: number) {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i].uniqueKey === value.toString()) {
                this.values[i].priority = priority;
                this.sort();
            }
        }
    }
}


export abstract class Printable {
    abstract toString(): string;
}