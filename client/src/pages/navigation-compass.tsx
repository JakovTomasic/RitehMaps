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

const ANGLE_TILT_WARNING_THRESHOLD = 60;

export default function Navigation(){
    
    const router = useRouter();
    const [navDirections, setNavDirections] = useState<NavigationDirections>(undefined);
    const [destinationNode, setDestinationNode] = useState<DestinationNode>(undefined);
    const [compassRotation, setCompassRotation] = useState<number>(0);
    const [showDeviceOrientationWarning, setShowDeviceOrientationWarning] = useState<boolean>(undefined);

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
                const directions: NavigationDirections = mapNav.findShortestPathForCompassMode(
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
    
    const mapDrawProps = uiMapConverter.convertNavigationToMapDrawElements_compass(currentStepIndex, navDirections);
    const submapNorthAngle: number | null = mapDrawProps == null ? null : mapDrawProps.submap.north_angle;
    
    useEffect(() => {

        function handleOrientation(event) {
            if (submapNorthAngle != null) {
                const deviceRotationAngleFromGeologicalNorth = 360-event.alpha || 0;
                const angle = mapRotationCalculator.rotationForCompass(
                    submapNorthAngle,
                    deviceRotationAngleFromGeologicalNorth
                );
                setCompassRotation(angle);

                const betaWarning = Math.abs(event.beta) > ANGLE_TILT_WARNING_THRESHOLD;
                const gammaWarning = Math.abs(event.gamma) > ANGLE_TILT_WARNING_THRESHOLD;
                setShowDeviceOrientationWarning(betaWarning || gammaWarning);
            }
        }

        window.addEventListener('deviceorientationabsolute', handleOrientation);
          
        return () => {
            window.removeEventListener('deviceorientationabsolute', handleOrientation);
        };
    }, [submapNorthAngle]);


    return (
        <NavigationLayout
            mapDrawProps={mapDrawProps}
            rotateAngle={compassRotation}
            showDeviceOrientationWarning={showDeviceOrientationWarning}
            zoomButtonVisible={false}
            zoomEnabledByDefault={false}
            middleLineVisible={true}
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


