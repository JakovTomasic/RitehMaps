
export class Room {
    id: number;
    endNodeId: number;
    names: string[];
    type: string;

    constructor(id: number, endNodeId: number, names: string[], type: string) {
        this.id = id;
        this.endNodeId = endNodeId;
        this.names = names;
        this.type = type;
    }
}
