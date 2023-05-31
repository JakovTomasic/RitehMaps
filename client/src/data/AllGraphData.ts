import { Edge, edges } from "./Edges";
import { Hallway, hallways } from "./Hallways";
import { Node, nodes } from "./Nodes";

export type AllGraphData = {
    nodes: Node[],
    edges: Edge[],
    hallways: Hallway[],
}

export const allGraphData: AllGraphData = {
    nodes: nodes,
    edges: edges,
    hallways: hallways,
}
