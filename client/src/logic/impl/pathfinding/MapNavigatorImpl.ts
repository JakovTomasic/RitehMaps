import { MapNode } from "../../../types/graph/MapNode";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { MapNavigator } from "../../interfaces/MapNavigator";
import { Graph } from "../../interfaces/Graph";
import { findPathWithDijkstra } from "./findPathWithDijkstra";
import { NavigationStep } from "../../../types/navigation/NavigationStep";
import { dijkstraSlow } from "./dijkstraSlow";
import { dijkstraFast } from "./dijkstraFast";

export class MapNavigatorImpl implements MapNavigator {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections {
        const path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        const navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findPathToNearestNode(startNodeId: string, endNodeFilter: MapNodeFilter): MapNode[] {

        console.profile("Fast Dijkstra profiling");
        //console.profile("Slow Dijkstra profiling");
        
        const result: MapNode[] = dijkstraFast(startNodeId, endNodeFilter, this.graph);
       // const result: MapNode[] = dijkstraSlow(startNodeId, endNodeFilter, this.graph);

        console.profileEnd("Fast Dijkstra profiling");
        //console.profileEnd("Slow Dijkstra profiling");

        return result;
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        return path.map(node => new NavigationNode(node.submapId, node.xCoordinate, node.yCoordinate));
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationDirections {
        const steps: NavigationStep[] = [];
        let currentStepNodes: NavigationNode[] = [];
        let previousNode: NavigationNode = null;
        path.forEach(node => {
            
            if (previousNode !== null && node.submapId !== previousNode.submapId) {
                steps.push(new NavigationStep(currentStepNodes))
                currentStepNodes = []
            }
            currentStepNodes.push(node);

            previousNode = node
        });

        if (currentStepNodes.length > 0) {
            steps.push(new NavigationStep(currentStepNodes))
        }
        
        return new NavigationDirections(steps);
    }
}
