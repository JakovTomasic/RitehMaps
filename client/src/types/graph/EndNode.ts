import { MapNode } from "./MapNode";

export class EndNode extends MapNode {
    xCoordinate: number;
    yCoordinate: number;

    constructor(
        id: number,
        submapId: number,
        xCoordinate: number,
        yCoordinate: number
    ) {
        super(id, submapId)
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}
