import assert from "assert";
import { AllGraphData } from "../../../data/AllGraphData";
import { Hallway } from "../../../data/Hallways";
import { Room } from "../../../data/Rooms";
import { MapNode } from "../../../types/graph/MapNode";
import { Dot, Line, calculateLinesIntersection, calculateProjection } from "../../../utils/Geometry";

export type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export function createGraph(graphData: AllGraphData): Map<string, GraphNode> {
    let graph = new Map<string, GraphNode>();
    let hallways = new Map<string, Hallway>();
    let allHallwayProjections = new Map<string, GraphNode[]>();

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
            joinTwoHallways(allHallwayProjections, hallways.get(edge.nodeId1), hallways.get(edge.nodeId2));
        } else if (hallways.has(edge.nodeId1) && node2 !== undefined) {
            addHallwayProjectionOfNode(allHallwayProjections, hallways.get(edge.nodeId1), node2);
        } else if (hallways.has(edge.nodeId2) && node1 !== undefined) {
            addHallwayProjectionOfNode(allHallwayProjections, hallways.get(edge.nodeId2), node1);
        }
    });

    joinAllHallwayProjections(allHallwayProjections, graph);

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

function addHallwayProjectionOfNode(allHallwayProjections: Map<string, GraphNode[]>, hallway: Hallway, node: GraphNode) {
    
    assert(node.node.submapId === hallway.submapId);

    let dot: Dot = {x: node.node.xCoordinate, y: node.node.yCoordinate};
    let line: Line = hallwayToLine(hallway);

    let projection = calculateProjection(dot, line);

    let id: string = `p:${hallway.id}->${node.node.id}`;

    let graphNode: GraphNode = {
        node: {
            id: id,
            submapId: node.node.submapId,
            xCoordinate: projection.x,
            yCoordinate: projection.y,
        },
        neighbours: [node.node]
    };
    node.neighbours.push(graphNode.node);
    addAllHallwayProjection(allHallwayProjections, hallway.id, graphNode);
}

function joinTwoHallways(allHallwayProjections: Map<string, GraphNode[]>, hallway1: Hallway, hallway2: Hallway) {

    assert(hallway1.submapId === hallway2.submapId);

    let line1 = hallwayToLine(hallway1);
    let line2 = hallwayToLine(hallway2);
    let intersection = calculateLinesIntersection(line1, line2);

    let id: string = `p:${hallway1.id}->${hallway2.id}`;

    let graphNode: GraphNode = {
        node: {
            id: id,
            submapId: hallway1.submapId,
            xCoordinate: intersection.x,
            yCoordinate: intersection.y,
        },
        neighbours: []
    };

    addAllHallwayProjection(allHallwayProjections, hallway1.id, graphNode);
    addAllHallwayProjection(allHallwayProjections, hallway2.id, graphNode);
}

function addAllHallwayProjection(allHallwayProjections: Map<string, GraphNode[]>, hallwayId: string, graphNode: GraphNode) {
    if (!allHallwayProjections.has(hallwayId)) {
        allHallwayProjections.set(hallwayId, [graphNode]);
    } else {
        allHallwayProjections.get(hallwayId).push(graphNode);
    }
}

function joinAllHallwayProjections(allHallwayProjections: Map<string, GraphNode[]>, graph: Map<string, GraphNode>) {
    allHallwayProjections.forEach((projections: GraphNode[], hallwayId: string) => {
        for (let i = 0; i < projections.length; i++) {
            for (let j = i+1; j < projections.length; j++) {
                let node1 = projections[i];
                let node2 = projections[j];

                if (!graph.has(node1.node.id)) {
                    graph.set(node1.node.id, node1);
                }
                if (!graph.has(node2.node.id)) {
                    graph.set(node2.node.id, node2);
                }

                graph.get(node1.node.id).neighbours.push(node2.node);
                graph.get(node2.node.id).neighbours.push(node1.node);
            }
        }
    });
}

function hallwayToLine(hallway: Hallway): Line {
    return {
        dot1: {x: hallway.x1, y: hallway.y1},
        dot2: {x: hallway.x2, y: hallway.y2},
    }
}