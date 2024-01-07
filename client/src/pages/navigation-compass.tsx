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

const ANGLE_TILT_WARNING_THRESHOLD = 60;

export default function Navigation(){
    
    const router = useRouter();
    const [navDirections, setNavDirections] = useState<NavigationDirections>(undefined);
    const [compassRotation, setCompassRotation] = useState<number>(undefined);
    const [showDeviceOrientationWarning, setShowDeviceOrientationWarning] = useState<boolean>(undefined);

    useEffect(() => {
        if(router.isReady){
            const data = router.query;

            const baseGraph = createGraph(allGraphData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl());
            const mapNav = new MapNavigatorImpl(graphImpl);
        
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

    const submapProvider = new SubmapProviderImpl();
    const mapCropper = new MapCropperImpl();
    const uiMapConverter = new UiMapConverterImpl(submapProvider, mapCropper);
    const mapRotationCalculator = new MapRotationCalculatorImpl(submapProvider);

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    const mapDrawProps = uiMapConverter.convertNavigationToMapDrawElements_compass(currentStepIndex, navDirections);
    
    useEffect(() => {

        function handleOrientation(event) {
            if (mapDrawProps != null) {
                const deviceRotationAngleFromGeologicalNorth = 360-event.alpha || 0;
                const angle = mapRotationCalculator.rotationForCompass(
                    mapDrawProps.submap.north_angle,
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
    }, [mapDrawProps]);


    return (
        <NavigationLayout
            mapDrawProps={mapDrawProps}
            rotateAngle={compassRotation}
            showDeviceOrientationWarning={showDeviceOrientationWarning}
            zoomButtonVisible={false}
            zoomEnabledByDefault={false}
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


