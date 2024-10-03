import { NodeType } from "../../data/ServerData";

export class MapNode {
    id: string;
    submapId: number;
    xCoordinate: number;
    yCoordinate: number;
    nodeType: NodeType;

    constructor(
        id: string,
        submapId: number,
        xCoordinate: number,
        yCoordinate: number,
        nodeType: NodeType,
    ) {
        this.id = id;
        this.submapId = submapId;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.nodeType = nodeType;
    }
}
