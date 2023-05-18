import { edges } from "../../data/edges";
import { rooms } from "../../data/rooms";
import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { Graph } from "../interfaces/Graph";

type GraphNode = {
    node: MapNode;
    neighbours: MapNode[];
}

export class GraphImpl implements Graph {

    graph = new Map<string, GraphNode>();

    constructor() {
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
            this.graph[room.nodeId] = graphNode
        });

        edges.forEach(edge => {
            let node1: GraphNode = this.graph[edge.nodeId1]
            let node2: GraphNode = this.graph[edge.nodeId2]
            node1.neighbours.push(node2.node)
            node2.neighbours.push(node1.node)
        })
    }

    getNode(nodeId: string): MapNode | undefined {
        return this.graph[nodeId].node
    }

    getNeighbours(nodeId: string): NeighbourConnection[] {
        let node: GraphNode = this.graph[nodeId]
        return node.neighbours.map(neighbour => {
            let connection: NeighbourConnection = {
                neighbour: neighbour,
                distance: 0,
            }
            return connection
        })
    }
}
