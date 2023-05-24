import { MapNodeFilter } from "./MapNodeFilter";

export class SearchNodeSuggestion {
    roomName: string;
    destinationFilter: MapNodeFilter

    constructor(roomName: string, destinationFilter: MapNodeFilter) {
        this.roomName = roomName;
        this.destinationFilter = destinationFilter;
    }
}
