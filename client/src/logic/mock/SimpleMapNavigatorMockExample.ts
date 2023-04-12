import { MapNodeFilter } from "../../types/MapNodeFilter";
import { NavigationDirections } from "../../types/NavigationDirections";
import { NavigationNode } from "../../types/NavigationNode";
import { NavigationStep } from "../../types/NavigationStep";
import { MapNavigator } from "../interfaces/MapNavigator";

export class SimpleMapNavigatorMockExample implements MapNavigator {
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        return new NavigationDirections([
            new NavigationStep([
                new NavigationNode(1, 0, 0),
                new NavigationNode(1, 50, 50)
            ]),
            new NavigationStep([
                new NavigationNode(1, 50, 50),
                new NavigationNode(1, 100, 100)
            ])
        ])
    }
}
