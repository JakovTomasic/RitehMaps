import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Map from "../components/Map";
import MapCaption from "../components/MapCaption";
import { MapDrawProps } from "../types/map_draw_elements/MapDrawProps";
import ZoomToggleButton from "./ZoomToggleButton";

type Prop = {
    mapDrawProps: MapDrawProps,
    rotateAngle: number,
    showDeviceOrientationWarning: boolean,
    zoomButtonVisible: boolean,
    zoomEnabledByDefault: boolean,
    onBackClick: () => void,
    onUpdateClick: () => void,
    onNextClick: () => void,
}

export default function NavigationLayout(props: Prop) {
    
    const [enableZoom, setZoom] = useState(props.zoomEnabledByDefault);

    return(
        <>
            <div className="absolute w-fill h-full mx-auto left-0 right-0 my-0 max-w-3xl">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                {
                props.mapDrawProps != null ?
                <>
                    { props.showDeviceOrientationWarning ? <div>Please keep your device parallel to the ground</div> : <></> }
                    <MapCaption imageCaption={props.mapDrawProps.submap.caption} />
                    { props.zoomButtonVisible ?
                        <div className="absolute right-0">
                            <ZoomToggleButton zoomImage={enableZoom ? '/images/focus.svg' : '/images/expand.svg'} 
                                onClick={() => {setZoom(!enableZoom)}} 
                            />
                        </div>
                     : <></> }
                    <div className="w-full border h-2/3">
                        <Map layoutImage={props.mapDrawProps.submap.path} width={props.mapDrawProps.submap.width} 
                        height={props.mapDrawProps.submap.height} centroidCrop={props.mapDrawProps.centroidCrop}
                        rotateAngle={props.rotateAngle} drawElements={props.mapDrawProps.mapElements} enableZoom={enableZoom}/>                    
                    </div>
                </>
                    : <div>Loading...</div>
                }
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12 h-1/7">
                    <Button text='Back' onClick={props.onBackClick} />
                    <Button text='Update' onClick={props.onUpdateClick}/>
                    <Button text='Next' onClick={props.onNextClick} />
                </div>
            </div>
            
        </>
    );
}


