import { NavigationStep } from "../../types/NavigationStep"

export interface MapNavigator {
    findPathSteps(startNodeId: number, endNodeId: number): NavigationStep[]
}
