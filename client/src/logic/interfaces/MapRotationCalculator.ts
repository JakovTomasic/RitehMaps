import { NavigationDirections } from "../../types/navigation/NavigationDirections"

export interface MapRotationCalculator {
    rotationForStepByStepForward(currentStepIndex: number, navDirections: NavigationDirections): number | null
    rotationForCompass(submapNorthAngle: number, deviceRotationAngleFromGeologicalNorth: number): number | null
}
