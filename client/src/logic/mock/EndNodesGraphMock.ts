import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { mockMapNode } from "../../utils/mockingUtils";
import { Graph } from "../interfaces/Graph";

export class EndNodesGraphMock implements Graph {

    private graph = new Map<string, NeighbourConnection[]>([

        ["0", [new NeighbourConnection(mockMapNode("1"), 10),
             new NeighbourConnection(mockMapNode("4"), 17),
             new NeighbourConnection(mockMapNode("3"), 4)]],

        ["1", [new NeighbourConnection(mockMapNode("0"), 10),
             new NeighbourConnection(mockMapNode("4"), 7),
             new NeighbourConnection(mockMapNode("2"), 3)]],

        ["2", [new NeighbourConnection(mockMapNode("1"), 3)]],

        ["3", [new NeighbourConnection(mockMapNode("0"), 4),
             new NeighbourConnection(mockMapNode("4"), 15),
             new NeighbourConnection(mockMapNode("5"), 2)]],

        ["4", [new NeighbourConnection(mockMapNode("3"), 15),
             new NeighbourConnection(mockMapNode("1"), 7)]],

        ["5", [new NeighbourConnection(mockMapNode("3"), 2)]],
    ]);

    getNode(nodeId: string): MapNode | undefined {
        return this.graph.has(nodeId) ? mockMapNode(nodeId) : undefined;
    }

    getNeighbours(nodeId: string): NeighbourConnection[] {
        return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
    }
}