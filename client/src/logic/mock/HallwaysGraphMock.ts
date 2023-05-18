import { HallwayNode } from "../../types/graph/HallwayNode";
import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { Graph } from "../interfaces/Graph";

export class HallwaysGraphMock implements Graph { 

    private graph = new Map<number, NeighbourConnection[]>([

        [0, [new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 4),
             new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 8)]],

        [1, [new NeighbourConnection(new HallwayNode(0, 1, 0, 0, 0, 0), 4),
             new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 8),
             new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 11)]],

        [2, [new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 8),
             new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 7),
             new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 4),
             new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 2)]],

        [3, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 7),
             new NeighbourConnection(new HallwayNode(4, 1, 0, 0, 0, 0), 9),
             new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 14)]],

        [4, [new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 9),
             new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 10)]],

        [5, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 4),
             new NeighbourConnection(new HallwayNode(3, 1, 0, 0, 0, 0), 14),
             new NeighbourConnection(new HallwayNode(4, 1, 0, 0, 0, 0), 10),
             new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 2)]],

        [6, [new NeighbourConnection(new HallwayNode(5, 1, 0, 0, 0, 0), 2),
             new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 1),
             new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 6)]],

        [7, [new NeighbourConnection(new HallwayNode(0, 1, 0, 0, 0, 0), 8),
             new NeighbourConnection(new HallwayNode(1, 1, 0, 0, 0, 0), 11),
             new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 1),
             new NeighbourConnection(new HallwayNode(8, 1, 0, 0, 0, 0), 7)]],

        [8, [new NeighbourConnection(new HallwayNode(2, 1, 0, 0, 0, 0), 2),
             new NeighbourConnection(new HallwayNode(6, 1, 0, 0, 0, 0), 6),
             new NeighbourConnection(new HallwayNode(7, 1, 0, 0, 0, 0), 7)]]
    ]);
  
    getNode(nodeId: number): MapNode | undefined {
        return this.graph.has(nodeId) ? new HallwayNode(nodeId, 1, 0, 0, 0, 0) : undefined;
    }
  
    getNeighbours(nodeId: number): NeighbourConnection[] {
        return this.graph.has(nodeId) ? this.graph.get(nodeId) : [];
    }
  }
  