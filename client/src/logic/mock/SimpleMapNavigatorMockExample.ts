import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../types/navigation/NavigationNode";
import { NavigationStep } from "../../types/navigation/NavigationStep";
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
