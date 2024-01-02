import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { absoluteToRelative, relativeToAbsolute, rotatePointClockwise } from "../../utils/Geometry";
import { MapCropper } from "../interfaces/MapCropper";
import { getNodeBounds } from "./graph/Utils";

export class MapCropperImpl implements MapCropper{

    crop(navigationStep: NavigationStep, width: number, height: number, rotateAngle: number = 0): CentroidScale {

        const origW = width;
        const origH = height;
        /*if(rotateAngle == 90 || rotateAngle == 270) {
            const tmp = width;
            width = height;
            height = tmp;
        }*/

        const {minX, minY, maxX, maxY} = getNodeBounds(navigationStep.nodes, rotateAngle, width, height);

        console.log("minX:", minX, "minY:", minY, "maxX:", maxX,  "maxY:", maxY)

        let centroidX = minX + (maxX - minX)/2;
        let centroidY = minY + (maxY - minY)/2;
        ////////
        const potentialCenter2 = {x: origW/2, y: origH/2};

        const absPoint = relativeToAbsolute({x: centroidX, y: centroidY}, origW, origH);
        const rotatedPoint = rotatePointClockwise({x: absPoint.absX, y: absPoint.absY}, -rotateAngle, potentialCenter2 );
        const relPoint = absoluteToRelative({x: rotatedPoint.x, y: rotatedPoint.y}, origW, origH)

        centroidX = relPoint.relX;
        centroidY = relPoint.relY;
       
        ////////
        console.log("centroidX:", centroidX, "centroidY:", centroidY)

        const stepScale = this.getStepScale(maxX - minX, maxY - minY);

        const scaledWidth = width/stepScale;
        const scaledHeight = height/stepScale;

        let translateX = -1*centroidX*width/100 + scaledWidth/2;
        let translateY = -1*centroidY*height/100 + scaledHeight/2;

        /*const absPoint = relativeToAbsolute({x: translateX, y: translateY}, origW, origH);
        const rotatedPoint = rotatePointClockwise({x: absPoint.absX, y: absPoint.absY}, rotateAngle, potentialCenter2 );
        const relPoint = absoluteToRelative({x: rotatedPoint.x, y: rotatedPoint.y}, origW, origH)

        translateX = relPoint.relX;
        translateY = relPoint.relY;*/

        console.log("translateX:", translateX, "translateY:", translateY)

        
        //const rotatedPoint = rotatePointClockwise({x: translateX, y: translateY}, -rotateAngle, potentialCenter2)

        //translateX = rotatedPoint.x;
       // translateY = rotatedPoint.y;

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