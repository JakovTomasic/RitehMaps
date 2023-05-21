import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationNode } from "../../types/navigation/NavigationNode";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapNavigator } from "../interfaces/MapNavigator";

export class SimpleMapNavigatorMockExample implements MapNavigator {
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections {
        return new NavigationDirections([
            new NavigationStep([
                new NavigationNode(1, 831.0047, 507.7395),
                new NavigationNode(1, 1043.5366, 583.6851)
            ]),
            new NavigationStep([
                new NavigationNode(1, 1043.5366, 583.6851),
                new NavigationNode(1, 1956.64501953125, 513.369873046875)
            ]),
            new NavigationStep([
                new NavigationNode(2, 1852.796875, 730.521728515625),
                new NavigationNode(2, 2086.7617, 813.4279)
            ]),
            new NavigationStep([
                new NavigationNode(2, 2086.7617, 813.4279),
                new NavigationNode(2, 2519.26123046875, 794.2449951171875)
            ])
            
        ])
    }
}
