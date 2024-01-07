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

export default function NavigationLayout(
    { mapDrawProps, rotateAngle, showDeviceOrientationWarning,
        zoomButtonVisible, zoomEnabledByDefault, onBackClick, onUpdateClick, onNextClick } : Prop
) {
    
    const [enableZoom, setZoom] = useState(zoomEnabledByDefault);

    return(
        <>
            <div className="absolute w-fill h-full mx-auto left-0 right-0 my-0 max-w-3xl">
                <div className="h-1/8">
                    <Header text='Navigation' backPath='/' />
                </div>
                {
                mapDrawProps != null ?
                <>
                    { showDeviceOrientationWarning ? <div>Please keep your device parallel to the ground</div> : <></> }
                    <MapCaption imageCaption={mapDrawProps.submap.caption} />
                    { zoomButtonVisible ?
                        <div className="absolute right-0">
                            <ZoomToggleButton zoomImage={enableZoom ? '/images/focus.svg' : '/images/expand.svg'} 
                                onClick={() => {setZoom(!enableZoom)}} 
                            />
                        </div>
                     : <></> }
                    <div className="w-full border h-2/3">
                        <Map layoutImage={mapDrawProps.submap.path} width={mapDrawProps.submap.width} 
                        height={mapDrawProps.submap.height} centroidCrop={mapDrawProps.centroidCrop}
                        rotateAngle={rotateAngle} drawElements={mapDrawProps.mapElements} enableZoom={enableZoom}/>                    
                    </div>
                </>
                    : <div>Loading...</div>
                }
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12 h-1/7">
                    <Button text='Back' onClick={onBackClick} />
                    <Button text='Update' onClick={onUpdateClick}/>
                    <Button text='Next' onClick={onNextClick} />
                </div>
            </div>
            
        </>
    );
}


