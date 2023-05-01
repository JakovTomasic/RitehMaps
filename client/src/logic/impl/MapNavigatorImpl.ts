import { MapNode } from "../../types/graph/MapNode";
import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../types/navigation/NavigationNode";
import { MapNavigator } from "../interfaces/MapNavigator";
import { Graph } from "../interfaces/Graph";
import { NeighbourConnection } from "../../types/graph/NeighbourConnection";

export class MapNavigatorImpl implements MapNavigator {
    static infinity: number = Number.MAX_SAFE_INTEGER;
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        let path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        let navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    /*private*/ findPathToNearestNode(startNodeId: number, endNodeFilter: MapNodeFilter): MapNode[] {

        if (typeof this.graph.getNode(startNodeId) === "undefined") {
            throw new Error("Start location not valid.");
        }

        let path: MapNode[] = [];
        let neighbours: NeighbourConnection[];

        let parents = new Map<number, number>(); //childId, parentId
        let bestDistances = new Map<number, number>(); //nodeId, distance

        let SortedSet = require('sorted-set');
        let unvisitedNodes = new SortedSet({
            hash(item: any) {return item.nodeId},
            compare(a: any, b: any) {return a.distance - b.distance;}
        });

        let currentDistance: number;
        let currentNodeId: number;
        let allVisited: boolean;

        bestDistances.set(startNodeId, 0);
        unvisitedNodes.add({nodeId: startNodeId, distance: 0});

        while (true) {
            currentDistance = MapNavigatorImpl.infinity;
            allVisited = true;

            if (unvisitedNodes.length > 0) {
                currentNodeId = unvisitedNodes.head().nodeId;
                currentDistance = unvisitedNodes.head().distance;
                allVisited = false;
            }

            if (endNodeFilter.satisfies(this.graph.getNode(currentNodeId))) {
                path.push(this.graph.getNode(currentNodeId));
                
                while (parents.has(currentNodeId)) {
                    let parentId = parents.get(currentNodeId);

                    path.push(this.graph.getNode(parentId));
                    currentNodeId = parentId;
                }

                return path.reverse();

            } else if (allVisited) {
                throw new Error("Destination cannot be reached.");
            }

            unvisitedNodes.shift();
            neighbours = this.graph.getNeighbours(currentNodeId);

            for (let element of neighbours) {
                let neighbourId = element.neighbour.id;
                let neighbourDistance = element.distance;
                
                if (currentDistance + neighbourDistance < bestDistances.get(neighbourId)
                    || !bestDistances.has(neighbourId)) {

                    bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                    unvisitedNodes.add({nodeId: neighbourId, distance: bestDistances.get(neighbourId)})
                    parents.set(neighbourId, currentNodeId);
                }
            }
        }
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        throw new Error("Method not implemented.");
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationDirections {
        throw new Error("Method not implemented.");
    }
}
