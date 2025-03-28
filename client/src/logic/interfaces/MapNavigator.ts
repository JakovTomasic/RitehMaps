import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter"
import { NavigationDirections } from "../../types/navigation/NavigationDirections"

export interface MapNavigator {
    findShortestPath(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections
    findShortestPathForFloorByFloor(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections
    findShortestPathForCompassMode(startNodeId: string, endNodeFilter: MapNodeFilter): NavigationDirections
}
