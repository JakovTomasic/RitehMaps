import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";
import { getNodeBounds, getStepWithRotatedNodes, rotateRelativePointClockwise } from "./graph/Utils";

export class MapCropperImpl implements MapCropper{

    // TODO: remove rotateAngle
    crop(navigationStep: NavigationStep, width: number, height: number, rotateAngle: number): CentroidScale {
        const rotatedStep = getStepWithRotatedNodes(navigationStep, width, height, rotateAngle);
        const {minX, minY, maxX, maxY} = getNodeBounds(rotatedStep.nodes);

        let centroidX = minX + (maxX - minX)/2;
        let centroidY = minY + (maxY - minY)/2;

        const rotatedCentroid = rotateRelativePointClockwise(
            {x: centroidX, y: centroidY}, 
            -rotateAngle,
            width, 
            height
        );

        centroidX = rotatedCentroid.x;
        centroidY = rotatedCentroid.y;
    
        const stepScale = Math.min(this.getStepScale(maxX - minX, maxY - minY), 5);

        const scaledWidth = width/stepScale;
        const scaledHeight = height/stepScale;

        const translateX = -1*centroidX*width/100 + scaledWidth/2;
        const translateY = -1*centroidY*height/100 + scaledHeight/2;

        return {translateX, translateY, stepScale, scaledWidth, scaledHeight};
    }

    private getStepScale(width: number, height: number): number {
        const MIN_SCALE = 2;
        const MAX_SCALE = 10;

        const scaleWithoutMargins = Math.min(100/width, 100/height);
        const marginfactor = 0.9;
        const calculatedScale = scaleWithoutMargins * marginfactor;
        return Math.min(Math.max(calculatedScale, MIN_SCALE), MAX_SCALE);
    }
}