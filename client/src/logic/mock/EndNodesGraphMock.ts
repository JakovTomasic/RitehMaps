import { EndNode } from "../../types/graph/EndNode";
import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { Graph } from "../interfaces/Graph";

export class EndNodesGraphMock implements Graph {

    private graph = new Map<number, NeighbourConnection[]>([

        [0, [new NeighbourConnection(new EndNode(1, 1, 0, 0), 10),
             new NeighbourConnection(new EndNode(4, 1, 0, 0), 17),
             new NeighbourConnection(new EndNode(3, 1, 0, 0), 4)]],

        [1, [new NeighbourConnection(new EndNode(0, 1, 0, 0), 10),
             new NeighbourConnection(new EndNode(4, 1, 0, 0), 7),
             new NeighbourConnection(new EndNode(2, 1, 0, 0), 3)]],

        [2, [new NeighbourConnection(new EndNode(1, 1, 0, 0), 3)]],

        [3, [new NeighbourConnection(new EndNode(0, 1, 0, 0), 4),
             new NeighbourConnection(new EndNode(4, 1, 0, 0), 15),
             new NeighbourConnection(new EndNode(5, 1, 0, 0), 2)]],

        [4, [new NeighbourConnection(new EndNode(3, 1, 0, 0), 15),
             new NeighbourConnection(new EndNode(1, 1, 0, 0), 7)]],

        [5, [new NeighbourConnection(new EndNode(3, 1, 0, 0), 2)]],
    ]);

    getNode(nodeId: number): MapNode | undefined {
        return this.graph.has(nodeId) ? new EndNode(nodeId, 1, 0, 0) : undefined;
    }

    getNeighbours(nodeId: number): NeighbourConnection[] {
        return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
    }
}