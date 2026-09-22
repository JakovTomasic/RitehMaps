import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";

export interface MapCropper {
    crop(navigationStep: NavigationStep, width: number, height: number, rotateAngle: number): CentroidScale
    /**
     * Crop that keeps the whole step visible whatever angle the map is drawn at - for compass
     * mode, where the map turns with the user while the crop stays put.
     */
    cropForAnyRotation(navigationStep: NavigationStep, width: number, height: number): CentroidScale
}
