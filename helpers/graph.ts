export class UndirectedGraph {
    start: string;
    adjacencyMatrix: Map<string, string[]> = new Map<string, string[]>()

    constructor(start: string) {
        this.start = start;
    }

    addEdge(from: string, to: string) {
        if (this.adjacencyMatrix.has(from)) {
            const prev = new Set(this.adjacencyMatrix.get(from));
            prev.add(to);
            this.adjacencyMatrix.set(from, Array.from(prev));
        } else {
            this.adjacencyMatrix.set(from, [to]);
        }

        if (this.adjacencyMatrix.has(to)) {
            const prev = new Set(this.adjacencyMatrix.get(to));
            prev.add(from);
            this.adjacencyMatrix.set(to, Array.from(prev));
        } else {
            this.adjacencyMatrix.set(to, [from]);
        }
    }

    static constructFromLines(lines: string[]): UndirectedGraph {
        const g = new UndirectedGraph('start');

        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split('-');

            const from = parts[0];
            const to = parts[1];

            g.addEdge(from, to);
        }

        return g;
    }
}