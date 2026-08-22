import { Dot } from "../general/Dot";
import { MapDrawElement } from "./MapDrawElement";

/** What a dot on the map stands for - decides how it is drawn. */
export enum MapDotKind {
    /** Just a dot (graph/debug drawing). */
    Plain = "plain",
    /** Where the user currently is - pulsing "you are here" puck. */
    Start = "start",
    /** Where the current step ends and the next one continues. */
    StepEnd = "stepEnd",
    /** The final destination. */
    Destination = "destination",
}

export class MapDot extends MapDrawElement {
    dot: Dot;
    color: string;
    /** Radius, in percent of the *visible* (cropped) map diagonal. */
    radius: number;
    opacity: number;
    kind: MapDotKind;

    constructor(
        dot: Dot,
        color: string,
        radius: number,
        opacity: number,
        kind: MapDotKind = MapDotKind.Plain,
    ) {
        super();
        this.dot = dot;
        this.color = color;
        this.radius = radius;
        this.opacity = opacity;
        this.kind = kind;
    }
}
