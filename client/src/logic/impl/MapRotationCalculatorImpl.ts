import { Dot } from "../../types/general/Dot";
import { Line } from "../../types/general/Line";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { findAngleFromReferenceLine } from "../../utils/Geometry";
import { MapRotationCalculator } from "../interfaces/MapRotationCalculator";
import { SubmapProvider } from "../interfaces/SubmapProvider";
import { relativeToAbsoluteCoordinates } from "./graph/Utils";

export class MapRotationCalculatorImpl implements MapRotationCalculator {
    
    private submapProvider: SubmapProvider;

    constructor(submapProvider: SubmapProvider) {
        this.submapProvider = submapProvider;
    }

    rotationForStepByStepForward(currentStepIndex: number, navDirections: NavigationDirections): number | null {
        const navSteps: NavigationStep[] = navDirections?.steps;

        if (navSteps !== undefined && navSteps.length > 0) {
            
            const currentStep = navSteps[currentStepIndex];
            const submap = this.submapProvider.getSubmap(currentStep.nodes[0].submapId);

            if (currentStep.nodes.length >= 2) {
                const firstNode = currentStep.nodes[0];
                const secondNode = currentStep.nodes[1];

                const firstDot: Dot = {x: firstNode.xCoordinate, y: firstNode.yCoordinate};
                const secondDot: Dot = {x: secondNode.xCoordinate, y: secondNode.yCoordinate};

                const line: Line = {dot1: firstDot, dot2: secondDot};
                const referenceLine : Line = {dot1: {x: 0, y: 0}, dot2: {x: 0, y: -1}};
                const absDot1 = relativeToAbsoluteCoordinates(line.dot1, submap.width, submap.height);
                const absDot2 = relativeToAbsoluteCoordinates(line.dot2, submap.width, submap.height);
                const absLine: Line = {dot1: absDot1, dot2: absDot2};
                return findAngleFromReferenceLine(referenceLine, absLine)
            } else {
                return null;
            }
    
        } else {
            return null;
        }
    }

    rotationForCompass(submapNorthAngle: number, deviceRotationAngleFromGeologicalNorth: number): number | null {
        const deviceRotationAngleFromSubmapNorth = deviceRotationAngleFromGeologicalNorth - submapNorthAngle;
        const angleToRotateMapFor = -deviceRotationAngleFromSubmapNorth;

        const angleBetweenZeroAnd360 = (angleToRotateMapFor + 3600) % 360;
        return angleBetweenZeroAnd360;
    }
    
}
