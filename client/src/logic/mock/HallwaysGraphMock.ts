import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { mockMapNode } from "../../utils/mockingUtils";
import { Graph } from "../interfaces/Graph";

export class HallwaysGraphMock implements Graph { 

    private graph = new Map<string, NeighbourConnection[]>([

        ["0", [new NeighbourConnection(mockMapNode("1"), 4),
             new NeighbourConnection(mockMapNode("7"), 8)]],

        ["1", [new NeighbourConnection(mockMapNode("0"), 4),
             new NeighbourConnection(mockMapNode("2"), 8),
             new NeighbourConnection(mockMapNode("7"), 11)]],

        ["2", [new NeighbourConnection(mockMapNode("1"), 8),
             new NeighbourConnection(mockMapNode("3"), 7),
             new NeighbourConnection(mockMapNode("5"), 4),
             new NeighbourConnection(mockMapNode("8"), 2)]],

        ["3", [new NeighbourConnection(mockMapNode("2"), 7),
             new NeighbourConnection(mockMapNode("4"), 9),
             new NeighbourConnection(mockMapNode("5"), 14)]],

        ["4", [new NeighbourConnection(mockMapNode("3"), 9),
             new NeighbourConnection(mockMapNode("5"), 10)]],

        ["5", [new NeighbourConnection(mockMapNode("2"), 4),
             new NeighbourConnection(mockMapNode("3"), 14),
             new NeighbourConnection(mockMapNode("4"), 10),
             new NeighbourConnection(mockMapNode("6"), 2)]],

        ["6", [new NeighbourConnection(mockMapNode("5"), 2),
             new NeighbourConnection(mockMapNode("7"), 1),
             new NeighbourConnection(mockMapNode("8"), 6)]],

        ["7", [new NeighbourConnection(mockMapNode("0"), 8),
             new NeighbourConnection(mockMapNode("1"), 11),
             new NeighbourConnection(mockMapNode("6"), 1),
             new NeighbourConnection(mockMapNode("8"), 7)]],

        ["8", [new NeighbourConnection(mockMapNode("2"), 2),
             new NeighbourConnection(mockMapNode("6"), 6),
             new NeighbourConnection(mockMapNode("7"), 7)]]
    ]);
  
    getNode(nodeId: string): MapNode | undefined {
        return this.graph.has(nodeId) ? mockMapNode(nodeId) : undefined;
    }
  
    getNeighbours(nodeId: string): NeighbourConnection[] {
        return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
    }
  }
  