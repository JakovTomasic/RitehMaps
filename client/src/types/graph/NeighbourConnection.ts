import { MapNode } from "./MapNode";

export class NeighbourConnection {
    neighbour: MapNode;
    distance: number;

    constructor(neighbour: MapNode, distance: number) {
        this.neighbour = neighbour;
        this.distance = distance;
    }
}