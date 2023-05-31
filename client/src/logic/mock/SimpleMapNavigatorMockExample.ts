import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../types/navigation/NavigationNode";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapNavigator } from "../interfaces/MapNavigator";

export class SimpleMapNavigatorMockExample implements MapNavigator {
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        return new NavigationDirections([
            new NavigationStep([
                new NavigationNode(2, 29.14, 57.90),
                new NavigationNode(2, 42.20, 58.59),
                new NavigationNode(2, 36.58, 66.58)
            ]),
            new NavigationStep([
                new NavigationNode(2, 36.58, 66.58),
                new NavigationNode(2, 68.60, 58.59)
            ]),
            new NavigationStep([
                new NavigationNode(3, 67.57, 66.87),
                new NavigationNode(3, 76.10, 74.46)
            ]),
            new NavigationStep([
                new NavigationNode(3, 76.10, 74.46),
                new NavigationNode(3, 91.87, 72.7)
            ])
            
        ])
    }
}
