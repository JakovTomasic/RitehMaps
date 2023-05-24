import { MapNode } from "../../types/graph/MapNode"
import { NeighbourConnection } from "../../types/graph/NeighbourConnection"

export interface Graph {
    getNode(nodeId: number): MapNode | undefined
    getNeighbours(nodeId: number): NeighbourConnection[]
}
