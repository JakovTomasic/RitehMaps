import { Graph } from "../interfaces/Graph";
import { MapNode } from "../../types/graph/MapNode";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";
import { EndNode } from "../../types/graph/EndNode";

export class GraphMock implements Graph {

    getNode(nodeId: number): MapNode {
        throw new Error("Method not implemented.");
    }
    getNeighbours(nodeId: number): NeighbourConnection[] {
        throw new Error("Method not implemented.");
    }
}
