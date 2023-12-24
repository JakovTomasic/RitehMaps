import assert from "assert";
import { AllGraphData } from "../../../data/AllGraphData";
import { Hallway } from "../../../data/Hallways";
import { Node, NodeType } from "../../../data/Nodes";
import { MapNode } from "../../../types/graph/MapNode";
import { calculateLinesIntersection, calculateProjection } from "../../../utils/Geometry";
import { Dot } from "../../../types/general/Dot";
import { Line } from "../../../types/general/Line";
import { Edge } from "../../../data/Edges";
import { hallwayToLine, nodeToDot, sameCoordinates } from "./Utils";

export type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export function createGraph(graphData: AllGraphData): Map<string, GraphNode> {
    const graph = new Map<string, GraphNode>();

    addAllNodesWithoutConnections(graph, graphData.nodes);
    joinAllAddedGraphNodes(graph, graphData.edges);

    const hallwayNodeProjections = createNodeProjectionsOntoHallways(graph, graphData.hallways, graphData.edges);
    joinAllHallwayProjections(hallwayNodeProjections, graph);

    return graph;
}

function addAllNodesWithoutConnections(graph: Map<string, GraphNode>, nodes: Node[]) {
    nodes.forEach(node => {
        const graphNode: GraphNode = {
            node: {
                id: node.nodeId,
                submapId: node.submapId,
                xCoordinate: node.x,
                yCoordinate: node.y,
                nodeType: node.type,
            },
            neighbours: []
        };
        graph.set(node.nodeId, graphNode);
    });
}

function joinAllAddedGraphNodes(graph: Map<string, GraphNode>, edges: Edge[]) {
    edges.forEach(edge => {
        const node1: GraphNode | undefined = graph.get(edge.nodeId1);
        const node2: GraphNode | undefined = graph.get(edge.nodeId2);
        
        if (node1 !== undefined && node2 !== undefined) {
            node1.neighbours.push(node2.node);
            node2.neighbours.push(node1.node);
        }
    });
}

function createNodeProjectionsOntoHallways(
    graph: Map<string, GraphNode>,
    hallways: Hallway[],
    edges: Edge[]
): Map<string, GraphNode[]> {
    const hallwaysMap = new Map<string, Hallway>();
    const allHallwayProjections = new Map<string, GraphNode[]>();

    hallways.forEach(hallway => {
        hallwaysMap.set(hallway.id, hallway);
    });

    edges.forEach(edge => {
        const node1: GraphNode | undefined = graph.get(edge.nodeId1);
        const node2: GraphNode | undefined = graph.get(edge.nodeId2);
        
        if (hallwaysMap.has(edge.nodeId1) && hallwaysMap.has(edge.nodeId2)) {
            joinTwoHallways(allHallwayProjections, hallwaysMap.get(edge.nodeId1), hallwaysMap.get(edge.nodeId2));
        } else if (hallwaysMap.has(edge.nodeId1) && node2 !== undefined) {
            projectNodeOntoHallway(allHallwayProjections, hallwaysMap.get(edge.nodeId1), node2);
        } else if (hallwaysMap.has(edge.nodeId2) && node1 !== undefined) {
            projectNodeOntoHallway(allHallwayProjections, hallwaysMap.get(edge.nodeId2), node1);
        }
    });

    return allHallwayProjections;
}

function joinTwoHallways(allHallwayProjections: Map<string, GraphNode[]>, hallway1: Hallway, hallway2: Hallway) {

    assert(hallway1.submapId === hallway2.submapId);

    const line1 = hallwayToLine(hallway1);
    const line2 = hallwayToLine(hallway2);
    const intersection = calculateLinesIntersection(line1, line2);

    const projectionId: string = `p:${hallway1.id}->${hallway2.id}`;

    const graphNode: GraphNode = {
        node: {
            id: projectionId,
            submapId: hallway1.submapId,
            xCoordinate: intersection.x,
            yCoordinate: intersection.y,
            nodeType: NodeType.NAVIGATION_MIDNODE,
        },
        neighbours: []
    };

    addHallwayProjection(allHallwayProjections, hallway1.id, graphNode);
    addHallwayProjection(allHallwayProjections, hallway2.id, graphNode);
}

function projectNodeOntoHallway(allHallwayProjections: Map<string, GraphNode[]>, hallway: Hallway, node: GraphNode) {
    
    assert(node.node.submapId === hallway.submapId);

    const dot: Dot = nodeToDot(node.node);
    const line: Line = hallwayToLine(hallway);

    const projection = calculateProjection(dot, line);

    const projectionId: string = `p:${hallway.id}->${node.node.id}`;

    const graphNode: GraphNode = {
        node: {
            id: projectionId,
            submapId: node.node.submapId,
            xCoordinate: projection.x,
            yCoordinate: projection.y,
            nodeType: NodeType.NAVIGATION_MIDNODE,
        },
        neighbours: [node.node]
    };

    if (!sameCoordinates(node.node, graphNode.node)) {
        node.neighbours.push(graphNode.node);
        addHallwayProjection(allHallwayProjections, hallway.id, graphNode);
    } else {
        addHallwayProjection(allHallwayProjections, hallway.id, node);
    }
}

function addHallwayProjection(hallwayProjections: Map<string, GraphNode[]>, hallwayId: string, graphNode: GraphNode) {
    if (!hallwayProjections.has(hallwayId)) {
        hallwayProjections.set(hallwayId, [graphNode]);
    } else {
        hallwayProjections.get(hallwayId).push(graphNode);
    }
}

function joinAllHallwayProjections(allHallwayProjections: Map<string, GraphNode[]>, graph: Map<string, GraphNode>) {
    allHallwayProjections.forEach((projections: GraphNode[], hallwayId: string) => {
        for (let i = 0; i < projections.length; i++) {
            const node1 = projections[i];
            if (!graph.has(node1.node.id)) {
                graph.set(node1.node.id, node1);
            }

            for (let j = i+1; j < projections.length; j++) {
                const node2 = projections[j];

                if (!graph.has(node2.node.id)) {
                    graph.set(node2.node.id, node2);
                }

                graph.get(node1.node.id).neighbours.push(node2.node);
                graph.get(node2.node.id).neighbours.push(node1.node);
            }
        }
    });
}
