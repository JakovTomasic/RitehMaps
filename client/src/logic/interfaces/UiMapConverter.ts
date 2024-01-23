import { MapDrawProps } from "../../types/map_draw_elements/MapDrawProps";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";

export interface UiMapConverter {
    convertNavigationToMapDrawElements(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null
    convertNavigationToMapDrawElements_stepByStep(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null
    convertNavigationToMapDrawElements_stepByStepForward(currentStepIndex: number, navDirections: NavigationDirections, rotateAngle: number): MapDrawProps | null
    convertNavigationToMapDrawElements_floorByFloor(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null
    convertNavigationToMapDrawElements_compass(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null
}
