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

    constructor(graph: Graph){
        this.graph = graph;
    }
    
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        let path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        let navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findPathToNearestNode(startNodeId: number, endNodeFilter: MapNodeFilter): MapNode[] {
        let path: MapNode[] = [];
        let bestDistances = new Map<number, number>(); //nodeId, distance
        let visitedNodes = new Map<number, boolean>(); //nodeId, isVisited
        let parents = new Map<number, number>(); //childId, parentId
        let allVisited: boolean;
        let currentDistance: number;
        let currentNodeId: number;
        let neighbours: NeighbourConnection[];

        bestDistances.set(startNodeId, 0);
        visitedNodes.set(startNodeId, false);
  
        while(true){
            currentDistance = MapNavigatorImpl.infinity;
            allVisited = true;

            for (let [nodeId, isVisited] of visitedNodes) {   // pronaći data structure koji je sortiran

                if(!isVisited){
                    if(bestDistances.get(nodeId) < currentDistance){
                        currentDistance = bestDistances.get(nodeId);
                        currentNodeId = nodeId;
                    }
                    allVisited = false;
                }
            }

            if(endNodeFilter.satisfies(this.graph.getNode(currentNodeId))){

                path.push(this.graph.getNode(currentNodeId));

                while(parents.has(currentNodeId)){
                    let parentId = parents.get(currentNodeId);

                    path.push(this.graph.getNode(parentId));
                    currentNodeId = parentId;
                }

                return path.reverse();
            
            }else if(allVisited){
                throw new Error("Destination cannot be reached.");
            }

            visitedNodes.set(currentNodeId, true);
            neighbours = this.graph.getNeighbours(currentNodeId);  

            for(let element of neighbours){

                let neighbourId = element.neighbour.id;
                let neighbourDistance = element.distance;

                if(!bestDistances.has(neighbourId)){
                    bestDistances.set(neighbourId, currentDistance + neighbourDistance);
                    visitedNodes.set(neighbourId, false);
                    parents.set(neighbourId, currentNodeId);
                    continue;
                }
                
                if(currentDistance + neighbourDistance < bestDistances.get(neighbourId)){
                    bestDistances.set(neighbourId, currentDistance + neighbourDistance);
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
