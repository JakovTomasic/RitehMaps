import { Line } from "../general/Line";
import { MapDrawElement } from "./MapDrawElement";

export class MapPathLine extends MapDrawElement {
    line: Line;
    color: string;
    width: number;

    constructor(line: Line, color: string, width: number) {
        super();
        this.line = line;
        this.color = color;
        this.width = width;
    }
}
