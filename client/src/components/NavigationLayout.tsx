import { useState } from "react";
import Button from "./Button";
import Header from "./Header";
import Map from "./Map";
import MapCaption from "./MapCaption";
import { MapDrawProps } from "../types/map_draw_elements/MapDrawProps";
import ZoomToggleButton from "./ZoomToggleButton";
import { DestinationNode } from "../types/navigation/DestinationNode";
import FinishFlag from "./FinishFlag";

type Prop = {
    mapDrawProps: MapDrawProps,
    rotateAngle: number,
    showDeviceOrientationWarning: boolean,
    zoomButtonVisible: boolean,
    zoomEnabledByDefault: boolean,
    middleLineVisible: boolean,
    isFirstStep: boolean,
    isLastStep: boolean,
    destination: DestinationNode,
    onBackClick: () => void,
    onUpdateClick: () => void,
    onNextClick: () => void,
}

export default function NavigationLayout(props: Prop) {
    
    const [navigationFinished, setNavigationFinished] = useState(false);
    const [enableZoom, setZoom] = useState(props.zoomEnabledByDefault);

    return(
        !navigationFinished ?
        <>
            <div className="absolute w-fill h-full mx-auto left-0 right-0 my-0 max-w-3xl">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                {
                props.mapDrawProps != null ?
                <>
                    { props.showDeviceOrientationWarning ?
                        <div className="text-3xl text-red-700 font-semibold text-center tracking-tight">
                            Please keep your device parallel to the ground
                        </div> : <></>
                    }
                    <MapCaption imageCaption={props.mapDrawProps.submap.caption} />
                    { props.zoomButtonVisible ?
                        <div className="absolute right-0">
                            <ZoomToggleButton zoomImage={enableZoom ? '/images/focus.svg' : '/images/expand.svg'} 
                                onClick={() => {setZoom(!enableZoom)}} 
                            />
                        </div>
                     : <></> }
                    <div className="w-full border h-2/3">
                        { props.middleLineVisible ?
                            <div className="absolute w-full h-full flex flex-col items-center">
                                <img className="h-16" src="/images/arrow_up.png"></img>
                            </div>
                        : <></> }
                        <Map layoutImage={props.mapDrawProps.submap.path} width={props.mapDrawProps.submap.width} 
                        height={props.mapDrawProps.submap.height} centroidCrop={props.mapDrawProps.centroidCrop}
                        rotateAngle={props.rotateAngle} drawElements={props.mapDrawProps.mapElements} enableZoom={enableZoom}/>                    
                    </div>
                </>
                    : <div>Loading...</div>
                }
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12 h-1/7">
                    <Button text='Back' enabled={!props.isFirstStep} onClick={props.onBackClick} />
                    {/* <Button text='Update' enabled={true} onClick={props.onUpdateClick} /> */}
                    <Button
                        text={props.isLastStep ? 'Finish' : 'Next'}
                        enabled={true}
                        onClick={props.isLastStep ? () => { setNavigationFinished(true) } : props.onNextClick}
                    />
                </div>
            </div>
        </>
        :
        <>
            <div className="absolute w-fill h-full mx-auto left-0 right-0 my-0 max-w-3xl">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                <div className="w-full h-2/3 flex flex-col items-center">

                    <div className="flex-[0.1]" />
                    <div className="text-3xl font-semibold text-center text-gray-800 tracking-tight">
                        You have reached your destination!
                    </div>
                    <div className="flex-[0.1]" />
                    { props.destination.name?.trim()?.length > 0 ?
                        <div className="text-2xl font-semibold text-center
                                text-gray-100 tracking-tight p-10 bg-cyan-600 rounded-3xl">
                            { props.destination.name }
                        </div> : <></>
                    }
                    <div className="flex-[0.3]" />
                    <div className="w-full flex flex-col items-center pl-10">
                        <FinishFlag />
                    </div>
                </div>
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12 h-1/7">
                    <Button text='Back' enabled={!props.isFirstStep} onClick={() => setNavigationFinished(false)} />
                    {/* <Link href={'/'}>
                        <Button text='Home' enabled={true} />
                    </Link> */}
                </div>
            </div>
        </>
    );
}


