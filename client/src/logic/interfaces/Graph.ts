import { MapNode } from "../../types/graph/MapNode"
import { NeighbourConnection } from "../../types/graph/NeighbourConnection"

export interface Graph {
    getNode(nodeId: string): MapNode | undefined
    getNeighbours(nodeId: string): NeighbourConnection[]
}
