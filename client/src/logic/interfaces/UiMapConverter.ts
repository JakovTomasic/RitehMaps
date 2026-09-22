import { MapDrawProps } from "../../types/map_draw_elements/MapDrawProps";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";

export interface UiMapConverter {
    convertNavigationToMapDrawElements(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null
}
