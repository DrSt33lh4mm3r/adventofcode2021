import {Puzzle} from "./puzzle";
import {Printable, PriorityQueue} from "./helpers/priority-queue";

export class Puzzle_16a extends Puzzle {
    packages: Packet[] = [];
    sum: number = 0;

    constructor() {
        // super('./input/test_input.txt');
        super('./input/16.txt');
    }

    processLines(lines: string[]) {
        const binary = this.extractBinary(lines[0]);

        this.extractPackets(binary);

        console.log(this.sum)
    }

    extractPackets(binary: string) {
        if (binary.length < 11) {
            return;
        }

        const version = binary.substr(0, 3);
        const typeId = binary.substr(3, 3);
        let payload = binary.substr(6)

        this.packages.push({binary, version, typeId});

        this.sum = this.sum + Number.parseInt(version, 2);

        if (typeId === '100') {
            // literal value
            let rawData: string = '';
            let reachedEnd: boolean = false;
            let rest: string = ''

            while (!reachedEnd) {
                const groupHeader = payload.substr(0, 1)
                const nibble = payload.substr(1, 4);
                rest = payload.substr(5);

                if (groupHeader === '0') {
                    // last group
                    reachedEnd = true;
                }

                rawData = rawData + nibble;

                payload = rest;
            }

            const literalValue = Number.parseInt(rawData, 2);
            console.log('Literal Value: ' + literalValue);

            this.extractPackets(rest);
        } else {
            // operator
            const lengthTypeId = payload.substr(0, 1);

            if (lengthTypeId === '0') {
                // next 15 bits are one number, representing the total length in bits of contained sub-packets
                const lengthOfSubPackets = Number.parseInt(payload.substr(1, 15), 2);

                const subPackets = payload.substr(16, lengthOfSubPackets);
                const rest = payload.substr(16 + lengthOfSubPackets);

                console.log('Operator: LengthTypeId 0; length: ' + lengthOfSubPackets
                    + '; sub-packets: ' + subPackets + '; rest: ' + rest)

                this.extractPackets(subPackets);
                this.extractPackets(rest);
            } else {
                // next 11 bits are one number, representing the number of contained sub-packets
                const numberOfSubPackets = Number.parseInt(payload.substr(1, 11), 2);

                const subPackets = payload.substr(12);

                console.log('Operator: LengthTypeId 1; number of packets: ' + numberOfSubPackets
                    + '; sub-packets: ' + subPackets);

                this.extractPackets(subPackets);
            }

            // this.extractPackages(payload);
        }
    }

    extractBinary(line: string): string {
        let binary: string = '';

        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            binary = binary + this.hexToBinary(c);
        }

        return binary;
    }

    hexToBinary(n: string, length: number = 4): string {
        let b = Number.parseInt(n, 16).toString(2);

        while (b.length < length) {
            b = '0' + b;
        }

        return b;
    }
}

interface Packet {
    binary: string;
    version: string;
    typeId: string;
}

new Puzzle_16a();