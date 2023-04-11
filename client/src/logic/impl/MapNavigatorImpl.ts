import { MapNode } from "../../types/graph/MapNode";
import { NavigationNode } from "../../types/NavigationNode";
import { NavigationStep } from "../../types/NavigationStep";
import { MapNavigator } from "../interfaces/MapNavigator";

export class MapNavigatorImpl implements MapNavigator {
    findPathSteps(startNodeId: number, endNodeId: number): NavigationStep[] {
        let path = this.findShortestPath(startNodeId, endNodeId);
        let navNodes = this.convertPathToNavigationNodes(path);
        return this.splitNavigationPathIntoSteps(navNodes);
    }

    private findShortestPath(startNodeId: number, endNodeId: number): MapNode[] {
        throw new Error("Method not implemented.");
    }

    private convertPathToNavigationNodes(path: MapNode[]): NavigationNode[] {
        throw new Error("Method not implemented.");
    }

    private splitNavigationPathIntoSteps(path: NavigationNode[]): NavigationStep[] {
        throw new Error("Method not implemented.");
    }
}
