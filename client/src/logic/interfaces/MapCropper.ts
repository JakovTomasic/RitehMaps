import { NavigationStep } from "../../types/navigation/NavigationStep";
import { Rectangle } from "../../types/navigation/Rectangle";

export interface MapCropper {
    crop(navigationStep: NavigationStep): Rectangle
}
