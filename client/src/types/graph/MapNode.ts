
export abstract class MapNode {
    id: number;
    submapId: number;

    constructor(id: number, submapId: number) {
        this.id = id;
        this.submapId = submapId;
    }
}
