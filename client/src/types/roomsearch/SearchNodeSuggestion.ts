import { MapNodeFilter } from "./MapNodeFilter";

export class SearchNodeSuggestion {
    nodeId: string;
    roomName: string;
    destinationFilter: MapNodeFilter

    constructor(nodeId: string, roomName: string, destinationFilter: MapNodeFilter) {
        this.nodeId = nodeId;
        this.roomName = roomName;
        this.destinationFilter = destinationFilter;
    }
}
