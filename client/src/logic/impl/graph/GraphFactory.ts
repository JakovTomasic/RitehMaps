import { Edge } from "../../../data/edges";
import { Hallway } from "../../../data/hallways";
import { Room } from "../../../data/rooms";
import { MapNode } from "../../../types/graph/MapNode";

export type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export function createGraph(rooms: Room[], edges: Edge[], hallways: Hallway[]): Map<string, GraphNode> {
    let graph = new Map<string, GraphNode>();

    rooms.forEach(room => {
        let graphNode: GraphNode = {
            node: {
                id: room.nodeId,
                submapId: room.submapId,
                xCoordinate: room.x,
                yCoordinate: room.y,
            },
            neighbours: []
        }
        graph[room.nodeId] = graphNode
    });

    edges.forEach(edge => {
        let node1: GraphNode = graph[edge.nodeId1]
        let node2: GraphNode = graph[edge.nodeId2]
        node1.neighbours.push(node2.node)
        node2.neighbours.push(node1.node)
    });

    return graph;
}
