import { MapNode } from "../../types/graph/MapNode";
import { NavigationNode } from "../../types/NavigationNode";
import { NavigationStep } from "../../types/NavigationStep";
import { MapNavigator } from "../interfaces/MapNavigator";

export class MapNavigatorImpl implements MapNavigator {
    findPathSteps(startNodeId: number, endNodeId: number): NavigationStep[] {
        return [
            new NavigationStep([
                new NavigationNode(1, 0, 0),
                new NavigationNode(1, 50, 50)
            ]),
            new NavigationStep([
                new NavigationNode(1, 50, 50),
                new NavigationNode(1, 100, 100)
            ])
        ]
    }
}
