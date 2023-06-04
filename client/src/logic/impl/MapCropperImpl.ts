import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";
import { getNodeBounds } from "./graph/Utils";

export class MapCropperImpl implements MapCropper{

    crop(navigationStep: NavigationStep, width: number, height: number): CentroidScale {

        const {minX, minY, maxX, maxY} = getNodeBounds(navigationStep.nodes);
        const centroidX = minX + (maxX - minX)/2;
        const centroidY = minY + (maxY - minY)/2;

        const stepScale = this.getStepScale(maxX - minX, maxY - minY);

        const scaledWidth = width/stepScale;
        const scaledHeight = height/stepScale;

        const translateX = -1*centroidX*width/100 + scaledWidth/2;
        const translateY = -1*centroidY*height/100 + scaledHeight/2;

        return {translateX, translateY, stepScale, scaledWidth, scaledHeight};
    }

    private getStepScale(width: number, height: number): number {
        const scaleWithoutMargins = Math.min(100/width, 100/height);
        const marginfactor = 0.9;
        return scaleWithoutMargins * marginfactor;
    }
}