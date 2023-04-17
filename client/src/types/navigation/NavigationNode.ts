
export class NavigationNode {
    submapId: number;
    xCoordinate: number;
    yCoordinate: number;

    constructor(
        submapId: number,
        xCoordinate: number,
        yCoordinate: number
    ) {
        this.submapId = submapId;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}
