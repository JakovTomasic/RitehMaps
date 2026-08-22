import { Line } from "../general/Line";
import { MapDrawElement } from "./MapDrawElement";

/** Tells the map how a path segment relates to the step the user is currently on. */
export enum PathSegmentRole {
    /** Part of the step the user should follow right now. */
    Active = "active",
    /** Part of a step the user hasn't reached yet. */
    Upcoming = "upcoming",
    /** Part of a step the user already walked through. */
    Completed = "completed",
    /** Not a route at all (graph/debug drawing) - drawn as a plain line. */
    Plain = "plain",
}

export class MapPathLine extends MapDrawElement {
    line: Line;
    color: string;
    /** Stroke width, in percent of the *visible* (cropped) map diagonal. */
    width: number;
    role: PathSegmentRole;
    /**
     * Segments that share a chainId and touch with their endpoints are drawn as a single,
     * continuous path (smooth corners, one arrow animation running through all of them).
     * `null` means the segment is standalone.
     */
    chainId: number | null;

    constructor(
        line: Line,
        color: string,
        width: number,
        role: PathSegmentRole = PathSegmentRole.Plain,
        chainId: number | null = null,
    ) {
        super();
        this.line = line;
        this.color = color;
        this.width = width;
        this.role = role;
        this.chainId = chainId;
    }
}
