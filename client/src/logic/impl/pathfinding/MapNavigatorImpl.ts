import { MapNode } from "../../../types/graph/MapNode";
import { MapNodeFilter } from "../../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { MapNavigator } from "../../interfaces/MapNavigator";
import { Graph } from "../../interfaces/Graph";
import { findPathWithDijkstra } from "./findPathWithDijkstra";

export class MapNavigatorImpl implements MapNavigator {
    private graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        let path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        let navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findPathToNearestNode(startNodeId: number, endNodeFilter: MapNodeFilter): MapNode[] {
       return findPathWithDijkstra(startNodeId, endNodeFilter, this.graph);
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        throw new Error("Method not implemented.");
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationDirections {
        throw new Error("Method not implemented.");
    }
}
