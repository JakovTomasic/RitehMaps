import { MapNode } from "../../types/graph/MapNode"

export interface Graph {
    getNode(nodeId: number): MapNode | undefined
    getNeighbours(nodeId: number): MapNode[]
}
