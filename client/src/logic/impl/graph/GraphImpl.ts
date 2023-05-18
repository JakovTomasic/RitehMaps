import { MapNode } from "../../../types/graph/MapNode";
import { NeighbourConnection } from "../../../types/graph/NeighbourConnection";
import { Graph } from "../../interfaces/Graph";
import { GraphNode } from "./GraphFactory";

export class GraphImpl implements Graph {

    private graph = new Map<string, GraphNode>();

    constructor(graph: Map<string, GraphNode>) {
        this.graph = graph;
    }

    getNode(nodeId: string): MapNode | undefined {
        return this.graph.get(nodeId).node;
    }

    getNeighbours(nodeId: string): NeighbourConnection[] {
        let node: GraphNode = this.graph.get(nodeId);
        return node.neighbours.map(neighbour => {
            let connection: NeighbourConnection = {
                neighbour: neighbour,
                distance: 0,
            };
            return connection;
        });
    }
}
