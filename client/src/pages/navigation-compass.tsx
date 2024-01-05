import Button from "../components/Button";
import Header from "../components/Header";
import Map from "../components/Map";
import MapCaption from "../components/MapCaption";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { useRouter } from "next/router";
import { NavigationDirections } from "../types/navigation/NavigationDirections";
import { NavigationStep } from "../types/navigation/NavigationStep";
import { useEffect, useState } from "react";
import { MapNavigatorImpl } from "../logic/impl/pathfinding/MapNavigatorImpl";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { allGraphData } from "../data/AllGraphData";
import { Submap } from "../types/Submap";
import { MapCropperImpl } from "../logic/impl/MapCropperImpl";
import { CentroidScale } from "../types/navigation/CentroidScale";
import { createMapNodeFilter } from "../logic/impl/MapNodeFilterFactory";
import { Dot } from "../types/general/Dot";
import { Line } from "../types/general/Line";
import { MapDot } from "../types/map_draw_elements/MapDot";
import { MapPathLine } from "../types/map_draw_elements/MapPathLine";
import { MapDrawElement } from "../types/map_draw_elements/MapDrawElement";

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

    const navSteps: NavigationStep[] = navDirections?.steps;

    const submap = new SubmapProviderImpl();

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    let currentStep: NavigationStep | undefined;
    let mapElements: MapDrawElement[] = [];
    let currentSubmap: Submap | undefined;
    let centroidCrop: CentroidScale;
    let currentSubmapAngleFromNorth: number | undefined;
    if (navSteps !== undefined && navSteps.length > 0) {
        currentStep = navSteps[currentStepIndex];
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
        })
        currentSubmap = submap.getSubmapImage(currentStep.nodes[0].submapId);
        const mapCropper = new MapCropperImpl();
        centroidCrop = mapCropper.crop(currentStep, currentSubmap.width, currentSubmap.height);
        currentSubmapAngleFromNorth = currentSubmap.north_angle;
    } else {
        currentStep = undefined;
        mapElements = undefined;
        currentSubmap = undefined;
        centroidCrop = undefined;
        currentSubmapAngleFromNorth = undefined;
    }

    useEffect(() => {

        function handleOrientation(event) {
            if (currentSubmapAngleFromNorth != undefined) {
                const deviceRotationAngleFromGeologicalNorth = 360-event.alpha || 0;
                const deviceRotationAngleFromSubmapNorth = deviceRotationAngleFromGeologicalNorth - currentSubmapAngleFromNorth;
                const angleToRotateMapFor = -deviceRotationAngleFromSubmapNorth;

                const angleBetweenZeroAnd360 = (angleToRotateMapFor + 3600) % 360;
                setCompassRotation(angleBetweenZeroAnd360);

                const betaWarning = Math.abs(event.beta) > ANGLE_TILT_WARNING_THRESHOLD;
                const gammaWarning = Math.abs(event.gamma) > ANGLE_TILT_WARNING_THRESHOLD;
                setShowDeviceOrientationWarning(betaWarning || gammaWarning);
            }
        }

        window.addEventListener('deviceorientationabsolute', handleOrientation);
          
        return () => {
            window.removeEventListener('deviceorientationabsolute', handleOrientation);
        }
    }, [currentSubmapAngleFromNorth]);


    return(
        <>
            <div className="absolute w-fill h-full mx-auto left-0 right-0 my-0 max-w-3xl">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                {
                currentStep !== undefined && currentSubmap !== undefined && centroidCrop !== undefined ?
                <>
                    { showDeviceOrientationWarning ? <div>Please keep your device parallel to the ground</div> : <></> }
                    <MapCaption imageCaption={currentSubmap.caption} />
                    <div className="w-full border h-2/3">
                        <Map layoutImage={currentSubmap.path} width={currentSubmap.width} 
                        height={currentSubmap.height} centroidCrop={centroidCrop} rotateAngle={compassRotation} 
                        drawElements={mapElements} enableZoom={false}/>                    
                    </div>
                </>
                    : <div>Loading...</div>
                }
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12 h-1/7">
                    <Button text='Back' 
                        onClick={() => {
                            if(currentStepIndex > 0) {
                                updateCurrentStepIndex(currentStepIndex-1)
                            }
                        }}
                    />
                    <Button text='Update' onClick={() => {router.push('/')}}/>
                    <Button text='Next' 
                        onClick={() => {
                            if(currentStepIndex < navSteps.length-1) {
                                updateCurrentStepIndex(currentStepIndex+1)
                            }
                        }}
                    />
                </div>
            </div>
            
        </>
    );
}


