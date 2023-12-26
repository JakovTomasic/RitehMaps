import { Dot } from "../general/Dot";
import { MapDrawElement } from "./MapDrawElement";

export class MapDot extends MapDrawElement {
    dot: Dot;
    color: string;
    radius: number;
    opacity: number;

    constructor(dot: Dot, color: string, radius: number, opacity: number) {
        super();
        this.dot = dot;
        this.color = color;
        this.radius = radius;
        this.opacity = opacity;
    }
}
