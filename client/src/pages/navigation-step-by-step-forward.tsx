import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { useRouter } from "next/router";
import { NavigationDirections } from "../types/navigation/NavigationDirections";
import { useEffect, useState } from "react";
import { MapNavigatorImpl } from "../logic/impl/pathfinding/MapNavigatorImpl";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { allGraphData } from "../data/AllGraphData";
import { MapCropperImpl } from "../logic/impl/MapCropperImpl";
import { createMapNodeFilter } from "../logic/impl/MapNodeFilterFactory";
import { UiMapConverterImpl } from "../logic/impl/UiMapConverterImpl";
import { MapRotationCalculatorImpl } from "../logic/impl/MapRotationCalculatorImpl";
import NavigationLayout from "../components/NavigationLayout";
import { DestinationNode } from "../types/navigation/DestinationNode";

export default function Navigation(){
    
    const router = useRouter();
    const [navDirections, setNavDirections] = useState<NavigationDirections>(undefined);
    const [destinationNode, setDestinationNode] = useState<DestinationNode>(undefined);

    const submapProvider = new SubmapProviderImpl();
    const mapCropper = new MapCropperImpl();
    const uiMapConverter = new UiMapConverterImpl(submapProvider, mapCropper);
    const mapRotationCalculator = new MapRotationCalculatorImpl(submapProvider);

    useEffect(() => {
        if(router.isReady){
            const data = router.query;

            setDestinationNode({ name: data.destinationName as string });

            const baseGraph = createGraph(allGraphData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl());
            const mapNav = new MapNavigatorImpl(graphImpl, submapProvider);
        
            const destinationNodeFilter = createMapNodeFilter(data.endNodeId as string);
            if (destinationNodeFilter != null) {
                const directions: NavigationDirections = mapNav.findShortestPath(
                    data.startNodeId as string,
                    destinationNodeFilter
                )
                setNavDirections(directions);
            } else {
                throw new Error(`Destination node id not valid: ${data.endNodeId}`);
            }
        }
    }, [router.isReady]);

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    const rotateAngle = mapRotationCalculator.rotationForStepByStepForward(currentStepIndex, navDirections);
    const mapDrawProps = uiMapConverter.convertNavigationToMapDrawElements_stepByStepForward(currentStepIndex, navDirections);
    
    return (
        <NavigationLayout
            mapDrawProps={mapDrawProps}
            rotateAngle={rotateAngle}
            showDeviceOrientationWarning={false}
            zoomButtonVisible={false}
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
            onUpdateClick={() => {router.push('/')}}
            onNextClick={() => {
                if(currentStepIndex < navDirections.steps.length-1) {
                    updateCurrentStepIndex(currentStepIndex+1)
                }
            }}
        />
    );
}


