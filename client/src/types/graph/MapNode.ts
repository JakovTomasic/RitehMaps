
export abstract class MapNode {
    id: string;
    submapId: number;
    xCoordinate: number;
    yCoordinate: number;

    constructor(
        id: string,
        submapId: number,
        xCoordinate: number,
        yCoordinate: number,
    ) {
        this.id = id;
        this.submapId = submapId;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}
