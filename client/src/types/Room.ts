
export class Room {
    id: number;
    endNodeId: number;
    names: string[];

    constructor(id: number, endNodeId: number, names: string[]) {
        this.id = id;
        this.endNodeId = endNodeId;
        this.names = names;
    }
}
