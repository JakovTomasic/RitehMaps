import { MapNode } from "../../types/graph/MapNode";
import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";

export class MapNodeFilterMock extends MapNodeFilter{
    destinationId: number;

    constructor(destinationId: number){
        super();
        this.destinationId = destinationId
    }
    satisfies(node: MapNode): boolean {
        return (node instanceof MapNode && node.id == this.destinationId);
    }
}