import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";

export interface MapCropper {
    /**
     * Crop around the step, wide enough to keep it visible whatever angle the map is drawn at -
     * compass mode turns the map with the user while the crop stays put, and cropping every view
     * that way keeps the zoom level the same when the compass is switched on.
     * A crop that survives every angle doesn't have to be told which one is current.
     */
    crop(navigationStep: NavigationStep, width: number, height: number): CentroidScale
}
