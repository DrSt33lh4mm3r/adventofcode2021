import {LineExtractor} from "./line-extractor";

export abstract class Puzzle {
    constructor(inputFile: string) {
        const lineExtractor = new LineExtractor(inputFile);
        lineExtractor.getLines().subscribe(lines => {
            if (lines && lines.length > 0) {
                const startTime = Math.floor(Date.now());

                this.processLines(lines);

                const endTime = Math.floor(Date.now());
                this.displayTime(startTime, endTime);
            }
        });
    }

    abstract processLines(lines: string[]): void;

    private displayTime(startTime: number, endTime: number) {
        let difference = endTime - startTime;

        if (difference > 60000) {
            difference = difference / 60000;
            console.log('calculation took ' + difference + ' minutes');
        } else if (difference > 1000) {
            difference = difference / 1000;
            console.log('calculation took ' + difference + ' seconds');
        } else {
            console.log('calculation took ' + difference + ' milliseconds');
        }
    }
}