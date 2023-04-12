import { NavigationDirections } from "../../types/NavigationDirections"

export interface MapNavigator {
    findPathSteps(startNodeId: number, endNodeId: number): NavigationDirections
}
