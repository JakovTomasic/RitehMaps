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

        if (navSteps !== undefined && navSteps.length > 0 && currentStepIndex < navSteps.length) {
            const currentStep = navSteps[currentStepIndex];
            const submap = this.submapProvider.getSubmap(currentStep.nodes[0].submapId);
            const centroidCrop = this.mapCropper.crop(currentStep, submap.width, submap.height);

            let mapElements: MapDrawElement[] = [];
            let currentStepLines: MapDrawElement[] = [];
            let currentStepNodes: MapDrawElement[] = [];

            navSteps.forEach((step, stepIndex) => {

                const isCurrentStep = stepIndex == currentStepIndex;

                let color: string
                if (isCurrentStep) {
                    color = "#41C7F7";
                } else {
                    color = "#AA2244";
                }

                let prevDot: Dot | null = null;
                step.nodes.forEach((node, index) => {

                    if (node.submapId == submap.id) {
                        const dot = {x: node.xCoordinate, y: node.yCoordinate} as Dot;
        
                        if (isCurrentStep) {
                            if (index == 0 || index == step.nodes.length - 1)  {
                                const mapDot = new MapDot(dot, color, 0.5, 1);
                                currentStepNodes.push(mapDot);
                            }
                        }
        
                        if(prevDot != null){
                            const line = {dot1: prevDot, dot2: dot} as Line;
                            const mapLine = new MapPathLine(line, color, 0.15);
                            // TODO: two lines edge isn't smooth!!!
                            if (isCurrentStep) {
                                currentStepLines.push(mapLine);
                            } else {
                                mapElements.push(mapLine);
                            }
                        }
                        prevDot = dot;
                    }
                });
            });

            // Latest element in the list will be drawn on the top
            mapElements = mapElements.concat(currentStepLines);
            mapElements = mapElements.concat(currentStepNodes);

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
        return this.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    }
    convertNavigationToMapDrawElements_compass(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    }
    convertNavigationToMapDrawElements_stepByStepForward(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    }
}
