import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { NavigationDirections } from "../types/navigation/NavigationDirections";
import { useEffect, useMemo, useState } from "react";
import { MapNavigatorImpl } from "../logic/impl/pathfinding/MapNavigatorImpl";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { MapCropperImpl } from "../logic/impl/MapCropperImpl";
import { createMapNodeFilter } from "../logic/impl/MapNodeFilterFactory";
import { UiMapConverterImpl } from "../logic/impl/UiMapConverterImpl";
import NavigationLayout from "../components/NavigationLayout";
import { DestinationNode } from "../types/navigation/DestinationNode";
import { useLocation } from "wouter";
import { useSearchParams } from "../utils/React";
import { AllMapsData } from "../data/ServerData";
import { createHomeUrl } from "./index";
import { MapRotationCalculatorImpl } from "../logic/impl/MapRotationCalculatorImpl";
import { CompassAvailability, useCompass } from "../utils/Compass";

export const NAVIGATION_PATH = "/nav";
const START_NODE_ID_PARAM_KEY = "startId";
const START_NAME_PARAM_KEY = "startName";
const DESTINATION_NODE_ID_PARAM_KEY = "endId";
const DESTINATION_NAME_PARAM_KEY = "endName";
const MODE_PARAM_KEY = "mode";

export enum NavigationMode {
    /** One step per floor. */
    Quick = "quick",
    /** Multiple steps per floor. */
    Detailed = "detailed",
}

export type NavigationRoute = {
    startNodeId: string,
    /** Optional: it can be left empty */
    startName?: string,
    destinationId: string,
    destinationName: string,
}

export function createNavigationUrl(route: NavigationRoute, mode: NavigationMode): string {
    const object: Record<string, string> = {};
    object[START_NODE_ID_PARAM_KEY] = route.startNodeId;
    if (route.startName != undefined && route.startName.length > 0) {
        object[START_NAME_PARAM_KEY] = route.startName;
    }
    object[DESTINATION_NODE_ID_PARAM_KEY] = route.destinationId;
    object[DESTINATION_NAME_PARAM_KEY] = route.destinationName;
    object[MODE_PARAM_KEY] = mode;
    const params = new URLSearchParams(object).toString()
    return `${NAVIGATION_PATH}?${params}`;
}

type Props = {
    allMapsData: AllMapsData,
}

export default function Navigation(props: Props){
    
    const [location, navigate] = useLocation();
    const searchParams = useSearchParams();
    const params = parseParams(searchParams);

    const [navDirections, setNavDirections] = useState<NavigationDirections>(new NavigationDirections([]));
    const [destinationNode, setDestinationNode] = useState<DestinationNode>({ name: "" });

    const submapProvider = new SubmapProviderImpl(props.allMapsData.submaps);
    const mapCropper = new MapCropperImpl();
    const uiMapConverter = new UiMapConverterImpl(submapProvider, mapCropper);
    const mapRotationCalculator = new MapRotationCalculatorImpl(submapProvider);

    const compass = useCompass();

    useEffect(() => {
        if (params != null) {
            setDestinationNode({ name: params.destinationName });

            const baseGraph = createGraph(props.allMapsData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl(props.allMapsData.submaps));
            const mapNav = new MapNavigatorImpl(graphImpl, submapProvider);
        
            const destinationNodeFilter = createMapNodeFilter(params.destinationId, props.allMapsData);
            if (destinationNodeFilter != null) {
                const directions: NavigationDirections = params.mode === NavigationMode.Quick
                    ? mapNav.findShortestPathForFloorByFloor(params.startId as string, destinationNodeFilter)
                    : mapNav.findShortestPath(params.startId as string, destinationNodeFilter)
                setNavDirections(directions);
            } else {
                throw new Error(`Destination node id not valid: ${params.destinationId}`);
            }
        } else {
            throw new Error(`Navigation error - params aren't valid "${searchParams}"`);
        }
    }, []);

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);

    // Memoized because the heading changes many times a second while the user turns: rebuilding
    // these would hand the map a brand new (but identical) set of elements every time, and the map
    // would throw away and redraw its whole overlay - arrow animations and all - on each of them.
    // The compass isn't part of it: the crop already leaves room for the map to turn in, so
    // switching it on rotates the very same view instead of redrawing it at another zoom level.
    const mapDrawProps = useMemo(
        () => uiMapConverter.convertNavigationToMapDrawElements(currentStepIndex, navDirections),
        [currentStepIndex, navDirections],
    );

    // How far the map has to be turned for the direction the user faces to point up the screen.
    const rotateAngle = (compass.heading == null || mapDrawProps == null)
        ? 0
        : mapRotationCalculator.rotationForCompass(mapDrawProps.submap.north_angle, compass.heading) ?? 0;


    return (
        <>
        { mapDrawProps === null ?
            <>Error</>
            :
            <NavigationLayout
                mapDrawProps={mapDrawProps}
                rotateAngle={rotateAngle}
                showDeviceOrientationWarning={compass.tilted}
                zoomButtonVisible={true}
                zoomEnabledByDefault={params?.mode === NavigationMode.Quick}
                middleLineVisible={compass.enabled}
                compass={{
                    enabled: compass.enabled,
                    available: compass.availability !== CompassAvailability.Unavailable,
                    checking: compass.availability === CompassAvailability.Unknown,
                    error: compass.error,
                    onToggle: compass.toggle,
                }}
                isFirstStep={currentStepIndex == 0}
                isLastStep={navDirections != undefined && currentStepIndex == navDirections.steps.length - 1}
                destination={destinationNode}
                onBackClick={() => {
                    if(currentStepIndex > 0) {
                        updateCurrentStepIndex(currentStepIndex-1)
                    }
                }}
                onUpdateClick={() => {navigate(createHomeUrl({
                    startNodeId: params?.startId,
                    startText: params?.startName,
                    destinationNodeId: params?.destinationId,
                    destinationText: params?.destinationName,
                }))}}
                onNextClick={() => {
                    if(currentStepIndex < navDirections.steps.length-1) {
                        updateCurrentStepIndex(currentStepIndex+1)
                    }
                }}
                currentStepIndex={currentStepIndex}
                totalSteps={navDirections.steps.length}
            />
        }
        </>
    );
}

type params = {
    startId: string,
    startName: string | undefined,
    destinationId: string,
    destinationName: string,
    mode: NavigationMode,
}

function parseParams(params: URLSearchParams): params | null {
    const startId = params.get(START_NODE_ID_PARAM_KEY);
    const startName = params.get(START_NAME_PARAM_KEY);
    const destinationId = params.get(DESTINATION_NODE_ID_PARAM_KEY);
    const destinationName = params.get(DESTINATION_NAME_PARAM_KEY);
    const mode = params.get(MODE_PARAM_KEY);
    if (startId != null && destinationId != null && destinationName != null) {
        return {
            startId: startId,
            startName: startName ?? undefined,
            destinationId: destinationId,
            destinationName: destinationName,
            mode: mode === NavigationMode.Quick ? NavigationMode.Quick : NavigationMode.Detailed,
        }
    } else {
        return null;
    }
}