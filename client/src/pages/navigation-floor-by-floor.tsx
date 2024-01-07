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
import NavigationLayout from "../components/NavigationLayout";

export default function SubmapNavigation(){
    
    const router = useRouter();
    const [navDirections, setNavDirections] = useState<NavigationDirections>(undefined);

    useEffect(() => {
        if(router.isReady){
            const data = router.query;

            const baseGraph = createGraph(allGraphData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl());
            const mapNav = new MapNavigatorImpl(graphImpl);
        
            const destinationNodeFilter = createMapNodeFilter(data.endNodeId as string);
            if (destinationNodeFilter != null) {
                const directions: NavigationDirections = mapNav.findShortestPathForFloorByFloor(
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

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    const mapDrawProps = uiMapConverter.convertNavigationToMapDrawElements(currentStepIndex, navDirections);
    
    
    return (
        <NavigationLayout
            mapDrawProps={mapDrawProps}
            rotateAngle={0}
            showDeviceOrientationWarning={false}
            zoomButtonVisible={false}
            zoomEnabledByDefault={true}
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


