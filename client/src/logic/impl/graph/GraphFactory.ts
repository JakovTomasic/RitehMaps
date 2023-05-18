import { AllGraphData } from "../../../data/AllGraphData";
import { Hallway } from "../../../data/Hallways";
import { Room } from "../../../data/Rooms";
import { MapNode } from "../../../types/graph/MapNode";
import { Dot, Line, calculateProjection } from "../../../utils/Geometry";

export type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export function createGraph(graphData: AllGraphData): Map<string, GraphNode> {
    let graph = new Map<string, GraphNode>();
    let hallways = new Map<string, Hallway>();

    addAllRoomsWithoutConnections(graph, graphData.rooms);

    graphData.hallways.forEach(hallway => {
        hallways.set(hallway.id, hallway);
    });

    graphData.edges.forEach(edge => {
        let node1: GraphNode | undefined = graph.get(edge.nodeId1);
        let node2: GraphNode | undefined = graph.get(edge.nodeId2);
        
        if (node1 !== undefined && node2 !== undefined) {
            node1.neighbours.push(node2.node);
            node2.neighbours.push(node1.node);
        } else if (hallways.has(edge.nodeId1) && hallways.has(edge.nodeId2)) {
            // TODO: join two hallways
        } else if (hallways.has(edge.nodeId1) && node2 !== undefined) {
            joinHallwayAndGraphNode(graph, hallways.get(edge.nodeId1), node2);
        } else if (hallways.has(edge.nodeId2) && node1 !== undefined) {
            joinHallwayAndGraphNode(graph, hallways.get(edge.nodeId2), node1);
        }
    });

    return graph;
}

function addAllRoomsWithoutConnections(graph: Map<string, GraphNode>, rooms: Room[]) {
    rooms.forEach(room => {
        let graphNode: GraphNode = {
            node: {
                id: room.nodeId,
                submapId: room.submapId,
                xCoordinate: room.x,
                yCoordinate: room.y,
            },
            neighbours: []
        };
        graph.set(room.nodeId, graphNode);
    });
}

function joinHallwayAndGraphNode(graph: Map<string, GraphNode>, hallway: Hallway, node: GraphNode) {
    
    let dot: Dot = {x: node.node.xCoordinate, y: node.node.yCoordinate};
    let line: Line = {
        dot1: {x: hallway.x1, y: hallway.y1},
        dot2: {x: hallway.x2, y: hallway.y2},
    }

    let projection = calculateProjection(dot, line);

    let id: string = `p:${hallway.id}->${node.node.id}`;
    // TODO: check if already created? Join with other nodes on this same hallway.

    let graphNode: GraphNode = {
        node: {
            id: id,
            submapId: node.node.submapId, // TODO: assert same submap id
            xCoordinate: projection.x,
            yCoordinate: projection.y,
        },
        neighbours: [node.node] // TODO: add other connection from this graph
    };
    node.neighbours.push(graphNode.node);
    graph.set(id, graphNode);
}
