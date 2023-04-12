import { MapNode } from "../../types/graph/MapNode";
import { MapNodeFilter } from "../../types/MapNodeFilter";
import { NavigationDirections } from "../../types/NavigationDirections";
import { NavigationNode } from "../../types/NavigationNode";
import { MapNavigator } from "../interfaces/MapNavigator";

export class MapNavigatorImpl implements MapNavigator {
    
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        let path = this.findPathToNearestNode(startNodeId, endNodeFilter);
        let navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findPathToNearestNode(startNodeId: number, endNodeFilter: MapNodeFilter): MapNode[] {
        throw new Error("Method not implemented.");
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        throw new Error("Method not implemented.");
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationDirections {
        throw new Error("Method not implemented.");
    }
}
