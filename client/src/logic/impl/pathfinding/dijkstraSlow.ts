import { MapNode } from "../../../types/graph/MapNode";
import { NeighbourConnection } from "../../../types/graph/NeighbourConnection";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { Graph } from "../../interfaces/Graph";

export function dijkstraSlow(startNodeId: string, endNodeFilter: MapNodeFilter, graph: Graph): MapNode[] {
   
    if (typeof graph.getNode(startNodeId) === "undefined") 
        throw new Error("Start location not valid: " + startNodeId);

    let currentDistance: number;
    let currentNodeId: string;
  
    let neighbours: NeighbourConnection[];
    let parents = new Map<string, string>();       //childId, parentId
    let bestDistances = new Map<string, number>(); //nodeId, distance

    let visitedNodes = new Map<string, boolean>(); //nodeId, isVisited
    let allVisited: boolean;

    let path: MapNode[] = [];

    bestDistances.set(startNodeId, 0);
    visitedNodes.set(startNodeId, false);

    while (true) {
        currentDistance = Infinity;
        allVisited = true;

        for (let [nodeId, isVisited] of visitedNodes) { 

            if (!isVisited) {
                if (bestDistances.get(nodeId) < currentDistance) {
                    currentDistance = bestDistances.get(nodeId);
                    currentNodeId = nodeId;
                }
                allVisited = false;
            }
        }

        if (endNodeFilter.satisfiedBy(graph.getNode(currentNodeId))) {

            path.push(graph.getNode(currentNodeId));

            while (parents.has(currentNodeId)) {
                let parentId = parents.get(currentNodeId);

                path.push(graph.getNode(parentId));
                currentNodeId = parentId;
            }

            return path.reverse();

        } else if (allVisited) {
            throw new Error("Destination cannot be reached.");
        }

        visitedNodes.set(currentNodeId, true);
        neighbours = graph.getNeighbours(currentNodeId);

        for (let element of neighbours) {
            let neighbourId = element.neighbour.id;
            let neighbourDistance = element.distance;

            if (!bestDistances.has(neighbourId)) {
                bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                visitedNodes.set(neighbourId, false);
                parents.set(neighbourId, currentNodeId);
                continue;
            }

            if (currentDistance + neighbourDistance < bestDistances.get(neighbourId)) {
                bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                parents.set(neighbourId, currentNodeId);
            }
        }
    }
}