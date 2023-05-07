import { MapNode } from "../../../types/graph/MapNode";
import { Graph } from "../../interfaces/Graph";

/**
 * Recreates the path in the correct order (from start node to destination node) using the given `parents` map.
 * 
 * @param parents The first element (key) is the child node ID, and the second element (value) is the parent node ID. 
 */

export function recreatePath(destinationNodeId: number, parents: Map<number, number>, graph: Graph): MapNode[] {

    let path: MapNode[] = [];
    let parentId: number;
    let parentNode: MapNode;
    let destinationNode: MapNode = graph.getNode(destinationNodeId);

    if(destinationNode === undefined)
        throw new Error("Node with id = " + destinationNodeId + " does not exist in the provided graph.");

    path.push(destinationNode);

    while (parents.has(destinationNodeId)) {
        parentId = parents.get(destinationNodeId);
        parentNode = graph.getNode(parentId);

        if(parentNode === undefined)
            throw new Error("Node with id = " + parentId + " does not exist in the provided graph.");

        path.push(parentNode);
        destinationNodeId = parentId;
    }
    return path.reverse();
}
