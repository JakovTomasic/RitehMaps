import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";

export class MapCropperImpl implements MapCropper{

    crop(navigationStep: NavigationStep, width: number, height: number): CentroidScale {
        
        var sumX = 0
        var sumY = 0
        var stepScale = 3

        var numOfNodes = navigationStep.nodes.length
        var scaledWidth = width/stepScale
        var scaledHeight = height/stepScale

        navigationStep.nodes.forEach((node) => {
            sumX += node.xCoordinate
            sumY += node.yCoordinate           
        })

        var centroidX = sumX/numOfNodes
        var centroidY = sumY/numOfNodes

        var translateX = -1*centroidX*width/100 + width/stepScale - scaledWidth/2
        var translateY = -1*centroidY*height/100 + height/stepScale - scaledHeight/2

        return {translateX, translateY, stepScale, scaledWidth, scaledHeight}

    }
    
}