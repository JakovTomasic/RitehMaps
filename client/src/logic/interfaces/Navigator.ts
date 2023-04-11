import { NavigationStep } from "../../types/NavigationStep"

export interface Navigator {
    findPathSteps(startNodeId: number, endNodeId: number): NavigationStep[]
}
