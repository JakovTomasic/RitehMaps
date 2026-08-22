import { Dot } from "../../types/general/Dot";
import { Line } from "../../types/general/Line";
import { MapDot, MapDotKind } from "../../types/map_draw_elements/MapDot";
import { MapDrawElement } from "../../types/map_draw_elements/MapDrawElement";
import { MapDrawProps } from "../../types/map_draw_elements/MapDrawProps";
import { MapPathLine, PathSegmentRole } from "../../types/map_draw_elements/MapPathLine";
import { NavigationDirections } from "../../types/navigation/NavigationDirections";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";
import { SubmapProvider } from "../interfaces/SubmapProvider";
import { UiMapConverter } from "../interfaces/UiMapConverter";

// The step the user is walking right now vs. the rest of the route.
const ACTIVE_COLOR = "#0891B2";
const UPCOMING_COLOR = "#0E7490";
const COMPLETED_COLOR = "#64748B";

// Sizes are percentages of the *visible* (cropped) map diagonal, so they keep the same
// on-screen size no matter how far the current step is zoomed in.
const ACTIVE_LINE_WIDTH = 2.0;
const OTHER_LINE_WIDTH = 1.4;
const MARKER_RADIUS = 2.4;


export class UiMapConverterImpl implements UiMapConverter {

    private submapProvider: SubmapProvider;
    private mapCropper: MapCropper;

    constructor(submapProvider: SubmapProvider, mapCropper: MapCropper) {
        this.submapProvider = submapProvider;
        this.mapCropper = mapCropper;
    }

    convertNavigationToMapDrawElements(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.commonConvertNavigationToMapDrawElements(currentStepIndex, navDirections, 0);
    }
    convertNavigationToMapDrawElements_stepByStep(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.commonConvertNavigationToMapDrawElements(currentStepIndex, navDirections, 0);
    }
    convertNavigationToMapDrawElements_floorByFloor(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.commonConvertNavigationToMapDrawElements(currentStepIndex, navDirections, 0);
    }
    convertNavigationToMapDrawElements_compass(currentStepIndex: number, navDirections: NavigationDirections): MapDrawProps | null {
        return this.commonConvertNavigationToMapDrawElements(currentStepIndex, navDirections, 0);
    }
    convertNavigationToMapDrawElements_stepByStepForward(currentStepIndex: number, navDirections: NavigationDirections, rotateAngle: number): MapDrawProps | null {
        return this.commonConvertNavigationToMapDrawElements(currentStepIndex, navDirections, rotateAngle);
    }

    private commonConvertNavigationToMapDrawElements(currentStepIndex: number, navDirections: NavigationDirections, rotateAngle: number): MapDrawProps | null {
        const navSteps: NavigationStep[] = navDirections?.steps;

        if (navSteps !== undefined && navSteps.length > 0 && currentStepIndex < navSteps.length) {
            const currentStep = navSteps[currentStepIndex];
            const submap = this.submapProvider.getSubmap(currentStep.nodes[0].submapId);
            const centroidCrop = this.mapCropper.crop(currentStep, submap.width, submap.height, rotateAngle);

            let mapElements: MapDrawElement[] = [];
            let currentStepLines: MapDrawElement[] = [];
            let currentStepNodes: MapDrawElement[] = [];

            const isLastStep = currentStepIndex == navSteps.length - 1;

            navSteps.forEach((step, stepIndex) => {

                const isCurrentStep = stepIndex == currentStepIndex;

                let role: PathSegmentRole
                let color: string
                if (isCurrentStep) {
                    role = PathSegmentRole.Active;
                    color = ACTIVE_COLOR;
                } else if (stepIndex < currentStepIndex) {
                    role = PathSegmentRole.Completed;
                    color = COMPLETED_COLOR;
                } else {
                    role = PathSegmentRole.Upcoming;
                    color = UPCOMING_COLOR;
                }

                let prevDot: Dot | null = null;
                step.nodes.forEach((node, index) => {

                    if (node.submapId == submap.id) {
                        const dot = {x: node.xCoordinate, y: node.yCoordinate} as Dot;

                        if (isCurrentStep) {
                            const isFirstNode = index == 0;
                            const isLastNode = index == step.nodes.length - 1;
                            let kind: MapDotKind | null = null;
                            if (isLastNode && isLastStep) {
                                kind = MapDotKind.Destination;
                            } else if (isFirstNode) {
                                kind = MapDotKind.Start;
                            } else if (isLastNode) {
                                kind = MapDotKind.StepEnd;
                            }
                            if (kind != null) {
                                const mapDot = new MapDot(dot, color, MARKER_RADIUS, 1, kind);
                                currentStepNodes.push(mapDot);
                            }
                        }

                        if(prevDot != null){
                            const line = {dot1: prevDot, dot2: dot} as Line;
                            const width = isCurrentStep ? ACTIVE_LINE_WIDTH : OTHER_LINE_WIDTH;
                            // Segments of one step share a chainId, so the map draws them as a
                            // single continuous path (smooth corners, one arrow animation).
                            const mapLine = new MapPathLine(line, color, width, role, stepIndex);
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
}
