
export interface Graph {
    getNode(nodeId: number): Node | undefined
    getNeighbours(nodeId: number): Node[]
}
