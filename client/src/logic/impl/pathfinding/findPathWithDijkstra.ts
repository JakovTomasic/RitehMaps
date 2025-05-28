import { MapNode } from "../../../types/graph/MapNode";
import { NeighbourConnection } from "../../../types/graph/NeighbourConnection";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { Graph } from "../../interfaces/Graph";
import { recreatePath } from "./recreatePath";
import SortedSet from "sorted-set";


const COST_OF_ADDING_NEW_NODE_TO_THE_PATH = 1;

export function findPathWithDijkstra(startNodeId: string, endNodeFilter: MapNodeFilter, graph: Graph): MapNode[] {
    return findPathWithDijkstraDebug(startNodeId, endNodeFilter, graph, COST_OF_ADDING_NEW_NODE_TO_THE_PATH);
}

export function findPathWithDijkstraDebug(startNodeId: string, endNodeFilter: MapNodeFilter, graph: Graph, costOfAddingNewNode: number): MapNode[] {

    if (typeof graph.getNode(startNodeId) === "undefined") 
        throw new Error("Start location not valid: " + startNodeId);

    let currentDistance: number;
    let currentNodeId: string;
    let destinationNode: MapNode | undefined;
    let destinationDistance: number = Infinity;

    let neighbours: NeighbourConnection[];
    let parents = new Map<string, string>();        //childId, parentId
    let bestDistances = new Map<string, number>();  //nodeId, distance
    
    let unvisitedNodes = new SortedSet({
        hash: function (item: any) { return item.nodeId },
        compare: function (a: any, b: any) { return a.distance - b.distance; }
    });
    
    bestDistances.set(startNodeId, 0);
    unvisitedNodes.add({ nodeId: startNodeId, distance: 0 });

    while (unvisitedNodes.length > 0) {

        currentNodeId = unvisitedNodes.head().nodeId;
        currentDistance = unvisitedNodes.head().distance;
        unvisitedNodes.shift();
        
        if (currentDistance !== bestDistances.get(currentNodeId)) {
            // This is a duplicate node in the sorted set, better path has already been found so ignore this one
            continue;
        }

        let currentNode = graph.getNode(currentNodeId)
        if (currentNode !== undefined && endNodeFilter.satisfiedBy(currentNode)) {
            destinationNode = currentNode
            break;
        }

        neighbours = graph.getNeighbours(currentNodeId);

        for (let element of neighbours) {

            let neighbourId = element.neighbour.id;
            let neighbourDistance = element.distance + costOfAddingNewNode;

            let bestDistance = bestDistances.get(neighbourId)

            if (bestDistance === undefined || currentDistance + neighbourDistance < bestDistance) {

                bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                unvisitedNodes.add({ nodeId: neighbourId, distance: bestDistances.get(neighbourId) })
                parents.set(neighbourId, currentNodeId);
            }
        }
    }

    if (destinationNode !== undefined && endNodeFilter.satisfiedBy(destinationNode))
        return recreatePath(destinationNode.id, parents, graph);   
    else
        throw new Error("Destination cannot be reached.");
}