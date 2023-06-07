import Button from "../components/Button";
import Header from "../components/Header";
import DirectionsCard from "../components/DirectionsCard";
import Map from "../components/Map";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { MapNodeFilterById } from "../types/roomsearch/MapNodeFilterById";
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



export default function Navigation(){
    
    const router = useRouter();
    const [navDirections, setNavDirections] = useState<NavigationDirections>(undefined);

    useEffect(() => {
        if(router.isReady){
            const data = router.query;

            const baseGraph = createGraph(allGraphData);
            const graphImpl = new GraphImpl(baseGraph, new SubmapProviderImpl());
            const mapNav = new MapNavigatorImpl(graphImpl);
        
            const directions: NavigationDirections = mapNav.findShortestPath(
                data.startNodeId as string,
                new MapNodeFilterById(data.endNodeId as string)
            )
            setNavDirections(directions);
        }
    }, [router.isReady]);

    const navSteps: NavigationStep[] = navDirections?.steps;

    const submap = new SubmapProviderImpl();

    const [currentStepIndex, updateCurrentStepIndex] = useState(0);
    
    let currentStep: NavigationStep | undefined;
    let submapImage: Submap | undefined;
    let centroidCrop: CentroidScale
    if (navSteps !== undefined && navSteps.length > 0) {
        currentStep = navSteps[currentStepIndex];
        submapImage = submap.getSubmapImage(currentStep.nodes[0].submapId);
        const mapCropper = new MapCropperImpl()
        centroidCrop = mapCropper.crop(currentStep, submapImage.width, submapImage.height)
    } else {
        currentStep = undefined;
        submapImage = undefined;
        centroidCrop = undefined;
    }


    return(
        <>
            <div className="relative w-fill h-screen mx-auto my-0">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                {
                    currentStep !== undefined && submapImage !== undefined && centroidCrop !== undefined ?
                        <Map layoutImage={submapImage.path} width={submapImage.width} 
                        height={submapImage.height} navStep={currentStep} centroidCrop={centroidCrop}/>
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


