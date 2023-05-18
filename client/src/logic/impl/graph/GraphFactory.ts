import { AllGraphData } from "../../../data/AllGraphData";
import { MapNode } from "../../../types/graph/MapNode";

export type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export function createGraph(graphData: AllGraphData): Map<string, GraphNode> {
    let graph = new Map<string, GraphNode>();

    graphData.rooms.forEach(room => {
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

    graphData.edges.forEach(edge => {
        let node1: GraphNode = graph[edge.nodeId1]
        let node2: GraphNode = graph[edge.nodeId2]
        node1.neighbours.push(node2.node)
        node2.neighbours.push(node1.node)
    });

    return graph;
}
