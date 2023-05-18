import { Edge, edges } from "./Edges";
import { Hallway, hallways } from "./Hallways";
import { Room, rooms } from "./Rooms";

export type AllGraphData = {
    rooms: Room[],
    edges: Edge[],
    hallways: Hallway[],
}

export const allGraphData: AllGraphData = {
    rooms: rooms,
    edges: edges,
    hallways: hallways,
}
