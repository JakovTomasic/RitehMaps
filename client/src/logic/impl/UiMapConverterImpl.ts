import { Dot } from "../../types/general/Dot";
import { Line } from "../../types/general/Line";
import { MapDot } from "../../types/map_draw_elements/MapDot";
import { MapDrawElement } from "../../types/map_draw_elements/MapDrawElement";
import { MapDrawProps } from "../../types/map_draw_elements/MapDrawProps";
import { MapPathLine } from "../../types/map_draw_elements/MapPathLine";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";
import { SubmapProvider } from "../interfaces/SubmapProvider";
import { UiMapConverter } from "../interfaces/UiMapConverter";


export class UiMapConverterImpl implements UiMapConverter {

    private submapProvider: SubmapProvider;
    private mapCropper: MapCropper;

    constructor(submapProvider: SubmapProvider, mapCropper: MapCropper) {
        this.submapProvider = submapProvider;
        this.mapCropper = mapCropper;
    }

    convertNavigationToMapDrawElements(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        const navSteps: NavigationStep[] = navDirections?.steps;

        if (navSteps !== undefined && navSteps.length > 0) {
            let mapElements: MapDrawElement[] = [];

            const currentStep = navSteps[currentStepIndex];
            let prevDot = {} as Dot;
            currentStep.nodes.forEach((node, index) => {
                const dot = {x: node.xCoordinate, y: node.yCoordinate} as Dot;
                const mapDot = new MapDot(dot, "#41C7F7", 0.5, 1);
                mapElements.push(mapDot);
                if(index > 0){
                    const line = {dot1: prevDot, dot2: dot} as Line;
                    const mapLine = new MapPathLine(line, "#41C7F7", 0.1);
                    mapElements.push(mapLine);
                }
                prevDot = dot;
            });
            const submap = this.submapProvider.getSubmap(currentStep.nodes[0].submapId);
            const centroidCrop = this.mapCropper.crop(currentStep, submap.width, submap.height);

            return {
                mapElements: mapElements,
                submap: submap,
                centroidCrop: centroidCrop,
            };
        } else {
            return null;
        }
    }
    convertNavigationToMapDrawElements_stepByStep(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    }
    convertNavigationToMapDrawElements_floorByFloor(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements_stepByStep(currentStepIndex, navDirections);
    }
    convertNavigationToMapDrawElements_compass(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements_stepByStep(currentStepIndex, navDirections);
    }
    convertNavigationToMapDrawElements_stepByStepForward(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements_stepByStep(currentStepIndex, navDirections);
    }
}
