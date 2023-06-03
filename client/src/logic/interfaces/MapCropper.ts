import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";

export interface MapCropper {
    crop(navigationStep: NavigationStep, width: number, height: number): CentroidScale
}
