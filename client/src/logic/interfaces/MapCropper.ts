import { NavigationStep } from "../../types/NavigationStep";
import { Rectangle } from "../../types/Rectangle";

export interface MapCropper {
    crop(navigationStep: NavigationStep): Rectangle
}
