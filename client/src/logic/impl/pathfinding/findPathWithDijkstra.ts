import { MapNode } from "../../../types/graph/MapNode";
import { NeighbourConnection } from "../../../types/graph/NeighbourConnection";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { Graph } from "../../interfaces/Graph";
import { recreatePath } from "./recreatePath";

export function findPathWithDijkstra(startNodeId: string, endNodeFilter: MapNodeFilter, graph: Graph): MapNode[] {

    if (typeof graph.getNode(startNodeId) === "undefined") 
        throw new Error("Start location not valid.");

    let currentDistance: number;
    let currentNodeId: string;
    let destinationNode: MapNode;

    let neighbours: NeighbourConnection[];
    let parents = new Map<string, string>();        //childId, parentId
    let bestDistances = new Map<string, number>();  //nodeId, distance
    
    let SortedSet = require('sorted-set');
    let unvisitedNodes = new SortedSet({
        hash(item: any) { return item.nodeId },
        compare(a: any, b: any) { return a.distance - b.distance; }
    });
    
    bestDistances.set(startNodeId, 0);
    unvisitedNodes.add({ nodeId: startNodeId, distance: 0 });

    while (unvisitedNodes.length > 0) {

        currentNodeId = unvisitedNodes.head().nodeId;
        currentDistance = unvisitedNodes.head().distance;

        if (endNodeFilter.satisfiedBy(graph.getNode(currentNodeId))) {
            destinationNode = graph.getNode(currentNodeId);
            break;
        }

        unvisitedNodes.shift();
        neighbours = graph.getNeighbours(currentNodeId);

        for (let element of neighbours) {

            let neighbourId = element.neighbour.id;
            let neighbourDistance = element.distance;

            if (!bestDistances.has(neighbourId) ||
                currentDistance + neighbourDistance < bestDistances.get(neighbourId)) {

                bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                unvisitedNodes.add({ nodeId: neighbourId, distance: bestDistances.get(neighbourId) })
                parents.set(neighbourId, currentNodeId);
            }
        }
    }

    if (endNodeFilter.satisfiedBy(destinationNode))
        return recreatePath(destinationNode.id, parents, graph);   
    else
        throw new Error("Destination cannot be reached.");
}