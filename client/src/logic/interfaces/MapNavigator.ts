import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter"
import { NavigationDirections } from "../../types/navigation/NavigationDirections"

export interface MapNavigator {
    findShortestPath(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections
}
