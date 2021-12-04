import * as lineReader from 'line-reader'
import {BehaviorSubject} from 'rxjs'

export class LineExtractor {
    _lines: string[] = [];
    lines: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(filename: string) {
        lineReader.eachLine(filename, (line, last) => {
            this.addLine(line);
            if(last) {
                this.lines.next(this._lines);
            }
        });
    }

    private addLine(line: string) {
        this._lines.push(line)
    }

    public getLines() {
        return this.lines;
    }
}