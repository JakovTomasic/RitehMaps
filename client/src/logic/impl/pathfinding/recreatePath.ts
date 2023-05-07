import { MapNode } from "../../../types/graph/MapNode";
import { Graph } from "../../interfaces/Graph";

/**
 * Recreates the path in the correct order from the given `parents` map.
 * 
 * @param lastNodeId the ID of the destination node. This node will be the last element in the returned list.
 * @param parents must be of type `Map<number, number>`. It should contain child nodes mapped to their corresponding parent nodes. The first element (key) is the child node ID, and the second element (value) is the parent node ID. 
 * @param graph must be of type `Graph`. The actual nodes (`MapNode`) are retrieved from this graph using their IDs.
 * @returns a list of `MapNode` elements. This represents the path in the correct order (from start node to destination node). The destination node should be provided through `lastNodeId` parameter.
 */

export function recreatePath(lastNodeId: number, parents: Map<number, number>, graph: Graph): MapNode[] {

    let path: MapNode[] = [];
    let parentId: number;
    let parentNode: MapNode;
    let lastNode: MapNode = graph.getNode(lastNodeId);

    if(lastNode === undefined)
        throw new Error("Node with id = " + lastNodeId + " does not exist in the provided graph.");

    path.push(lastNode);

    while (parents.has(lastNodeId)) {
        parentId = parents.get(lastNodeId);
        parentNode = graph.getNode(parentId);

        if(parentNode === undefined)
            throw new Error("Node with id = " + parentId + " does not exist in the provided graph.");

        path.push(parentNode);
        lastNodeId = parentId;
    }
    return path.reverse();
}
