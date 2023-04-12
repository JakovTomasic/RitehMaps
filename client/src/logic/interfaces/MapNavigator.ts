import { MapNodeFilter } from "../../types/MapNodeFilter"
import { NavigationDirections } from "../../types/NavigationDirections"

export interface MapNavigator {
    findShortestPath(startNodeId: number, endNodeFilter: MapNodeFilter): NavigationDirections
}
