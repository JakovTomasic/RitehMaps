import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { NavigationDirections } from "../types/navigation/NavigationDirections";
import { useEffect, useState } from "react";
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

export const NAVIGATION_PATH = "/nav";
const START_NODE_ID_PARAM_KEY = "startId";
const DESTINATION_NODE_ID_PARAM_KEY = "endId";
const DESTINATION_NAME_PARAM_KEY = "endName";

export function createNavigationUrl(startNodeId: string, destinationId: string, destinationName: string): string {
    const object: any = {};
    object[START_NODE_ID_PARAM_KEY] = startNodeId;
    object[DESTINATION_NODE_ID_PARAM_KEY] = destinationId;
    object[DESTINATION_NAME_PARAM_KEY] = destinationName;
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

    useEffect(() => {
        if (params != null) {
            setDestinationNode({ name: params.destinationName });

            const baseGraph = createGraph(props.allMapsData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl(props.allMapsData.submaps));
            const mapNav = new MapNavigatorImpl(graphImpl, submapProvider);
        
            const destinationNodeFilter = createMapNodeFilter(params.destinationId, props.allMapsData);
            if (destinationNodeFilter != null) {
                const directions: NavigationDirections = mapNav.findShortestPath(
                    params.startId as string,
                    destinationNodeFilter
                )
                setNavDirections(directions);
            } else {
                throw new Error(`Destination node id not valid: ${params.destinationId}`);
            }
        } else {
            throw new Error(`Navigation error - params aren't valid "${searchParams}"`);
        }
    }, []);

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    const mapDrawProps = uiMapConverter.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    
    
    return (
        <>
        { mapDrawProps === null ?
            <>Error</>
            :
            <NavigationLayout
                mapDrawProps={mapDrawProps}
                rotateAngle={0}
                showDeviceOrientationWarning={false}
                zoomButtonVisible={true}
                zoomEnabledByDefault={false}
                middleLineVisible={false}
                isFirstStep={currentStepIndex == 0}
                isLastStep={navDirections != undefined && currentStepIndex == navDirections.steps.length - 1}
                destination={destinationNode}
                onBackClick={() => {
                    if(currentStepIndex > 0) {
                        updateCurrentStepIndex(currentStepIndex-1)
                    }
                }}
                onUpdateClick={() => {navigate('/')}}
                onNextClick={() => {
                    if(currentStepIndex < navDirections.steps.length-1) {
                        updateCurrentStepIndex(currentStepIndex+1)
                    }
                }}
            />
        }
        </>
    );
}

type params = {
    startId: string,
    destinationId: string,
    destinationName: string,
}

function parseParams(params: URLSearchParams): params | null {
    const startId = params.get(START_NODE_ID_PARAM_KEY);
    const destinationId = params.get(DESTINATION_NODE_ID_PARAM_KEY);
    const destinationName = params.get(DESTINATION_NAME_PARAM_KEY);
    if (startId != null && destinationId != null && destinationName != null) {
        return {
            startId: startId,
            destinationId: destinationId,
            destinationName: destinationName,
        }
    } else {
        return null;
    }
}