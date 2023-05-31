import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { Graph } from "../interfaces/Graph";

export class EndNodesGraphMock implements Graph {

    private graph = new Map<string, NeighbourConnection[]>([

        ["0", [new NeighbourConnection(new MapNode("1", 1, 0, 0), 10),
             new NeighbourConnection(new MapNode("4", 1, 0, 0), 17),
             new NeighbourConnection(new MapNode("3", 1, 0, 0), 4)]],

        ["1", [new NeighbourConnection(new MapNode("0", 1, 0, 0), 10),
             new NeighbourConnection(new MapNode("4", 1, 0, 0), 7),
             new NeighbourConnection(new MapNode("2", 1, 0, 0), 3)]],

        ["2", [new NeighbourConnection(new MapNode("1", 1, 0, 0), 3)]],

        ["3", [new NeighbourConnection(new MapNode("0", 1, 0, 0), 4),
             new NeighbourConnection(new MapNode("4", 1, 0, 0), 15),
             new NeighbourConnection(new MapNode("5", 1, 0, 0), 2)]],

        ["4", [new NeighbourConnection(new MapNode("3", 1, 0, 0), 15),
             new NeighbourConnection(new MapNode("1", 1, 0, 0), 7)]],

        ["5", [new NeighbourConnection(new MapNode("3", 1, 0, 0), 2)]],
    ]);

    getNode(nodeId: string): MapNode | undefined {
        return this.graph.has(nodeId) ? new MapNode(nodeId, 1, 0, 0) : undefined;
    }

    getNeighbours(nodeId: string): NeighbourConnection[] {
        return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
    }
}