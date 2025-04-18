import { NodeType } from "../data/ServerData";
import { MapNode } from "../types/graph/MapNode";

export function mockMapNode(id: string): MapNode {
    return new MapNode(id, 1, 0, 0, NodeType.NAVIGATION_MIDNODE)
}
