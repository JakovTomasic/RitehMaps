import { MapNode } from "../../../types/graph/MapNode";
import { Graph } from "../../interfaces/Graph";

/**
 * Recreates the path in the correct order (from start node to destination node) using the given `parents` map.
 * 
 * @param parents The first element (key) is the child node ID, and the second element (value) is the parent node ID. 
 */
export function recreatePath(destinationNodeId: string, parents: Map<string, string>, graph: Graph): MapNode[] {

    let path: MapNode[] = [];
    let parentId: string | undefined;
    let parentNode: MapNode | undefined;
    let destinationNode = graph.getNode(destinationNodeId);

    if(destinationNode === undefined)
        throw new Error("Node with id = " + destinationNodeId + " does not exist in the provided graph.");

    path.push(destinationNode);

    while (parents.has(destinationNodeId)) {
        parentId = parents.get(destinationNodeId);
        if(parentId === undefined)
            throw new Error("Destination node with id = " + destinationNodeId + " doesn't have a parent.");
        parentNode = graph.getNode(parentId);

        if(parentNode === undefined)
            throw new Error("Node with id = " + parentId + " does not exist in the provided graph.");

        path.push(parentNode);
        destinationNodeId = parentId;
    }
    return path.reverse();
}
