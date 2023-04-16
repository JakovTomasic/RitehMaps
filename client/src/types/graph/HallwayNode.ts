import { MapNode } from "./MapNode";

export class HallwayNode extends MapNode {
    xCoordinate1: number;
    yCoordinate1: number;
    xCoordinate2: number;
    yCoordinate2: number;

    constructor(
        id: number,
        submapId: number,
        xCoordinate1: number,
        yCoordinate1: number,
        xCoordinate2: number,
        yCoordinate2: number
    ) {
        super(id, submapId)
        this.xCoordinate1 = xCoordinate1;
        this.yCoordinate1 = yCoordinate1;
        this.xCoordinate2 = xCoordinate2;
        this.yCoordinate2 = yCoordinate2;
    }
}
