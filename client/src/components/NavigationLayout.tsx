import { useState } from "react";
import Button from "./Button";
import MyMap from "./Map";
import MapCaption from "./MapCaption";
import { MapDrawProps } from "../types/map_draw_elements/MapDrawProps";
import ZoomToggleButton from "./ZoomToggleButton";
import { DestinationNode } from "../types/navigation/DestinationNode";
import FinishFlag from "./FinishFlag";
import { createHomeUrl } from "../pages";
import { Link } from "wouter";
import CompassToggleButton from "./CompassToggleButton";

/** What the screen needs to show a compass button, and what happens when it is pressed. */
export type CompassControl = {
    enabled: boolean,
    available: boolean,
    /** True while it is still unknown whether the device has a compass at all. */
    checking: boolean,
    /**
     * True while the mode is on but no heading has arrived yet. Some browsers (brave, most of all)
     * stop running the page while their own permission prompt is up and only pick it back up on
     * the next touch, so the user is told to give it one instead of watching a map that never turns.
     */
    waitingForHeading: boolean,
    /** Why the compass can't be turned on, shown to the user until it clears itself. */
    error: string | null,
    onToggle: () => void,
}

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
    /** Left out on screens that don't offer compass mode. */
    compass?: CompassControl,
    onBackClick: () => void,
    onUpdateClick: () => void,
    onNextClick: () => void,
    currentStepIndex?: number,
    totalSteps?: number,
}

export default function NavigationLayout(props: Prop) {

    const [navigationFinished, setNavigationFinished] = useState(false);
    const [enableZoom, setZoom] = useState(props.zoomEnabledByDefault);

    const showProgress = props.totalSteps != null && props.totalSteps > 1 && props.currentStepIndex != null;

    return(
        !navigationFinished ?
        <>
            <div className="absolute w-full h-full left-0 top-0 flex flex-col bg-gray-50">

                { showProgress &&
                    <div className="h-1 w-full bg-gray-200">
                        <div
                            className="h-1 bg-cyan-500 transition-all duration-300"
                            style={{ width: `${((props.currentStepIndex! + 1) / props.totalSteps!) * 100}%` }}
                        />
                    </div>
                }

                {/*
                  A floor caption is a whole sentence ("Main Building, floor 0"), so on a phone it
                  wraps onto its own line under the controls instead of squeezing between them -
                  `w-full` on a wrapping flex row is what forces that break. From `sm` up there is
                  room for all three, and it goes back to the middle of the row.
                */}
                <div className="z-10 flex flex-wrap items-center gap-x-2 px-3 py-2 bg-white shadow-sm">
                    <button
                        onClick={props.onUpdateClick}
                        className="order-1 flex items-center gap-1 text-sm font-semibold text-cyan-700
                            hover:text-cyan-800 px-2 py-1.5 -ml-2 rounded-md hover:bg-cyan-50 transition"
                    >
                        <span aria-hidden className="leading-none">&larr;</span>
                        Edit search
                    </button>

                    <div className="order-3 w-full min-w-0 pt-0.5 sm:order-2 sm:w-auto sm:flex-1 sm:pt-0 sm:text-center">
                        { props.mapDrawProps != null &&
                            <MapCaption imageCaption={props.mapDrawProps.submap.caption} />
                        }
                    </div>

                    <div className="order-2 ml-auto flex items-center gap-1.5 shrink-0 sm:order-3 sm:ml-0">
                        { props.compass != null &&
                            <CompassToggleButton
                                enabled={props.compass.enabled}
                                available={props.compass.available}
                                checking={props.compass.checking}
                                onClick={props.compass.onToggle}
                            />
                        }
                        { props.zoomButtonVisible &&
                            <ZoomToggleButton zoomImage={enableZoom ? '/images/focus.svg' : '/images/expand.svg'}
                                onClick={() => {setZoom(!enableZoom)}}
                            />
                        }
                    </div>
                </div>

                { props.compass?.error != null &&
                    <div className="bg-amber-50 text-amber-800 text-sm font-medium text-center py-2 px-4 border-b border-amber-100">
                        { props.compass.error }
                    </div>
                }

                { props.showDeviceOrientationWarning &&
                    <div className="bg-red-50 text-red-700 text-sm font-medium text-center py-2 px-4 border-b border-red-100">
                        Please keep your device parallel to the ground
                    </div>
                }

                {
                props.mapDrawProps != null ?
                    <div className="w-full flex-1 overflow-hidden relative">
                        { props.middleLineVisible ?
                            // We explain to user what the arrow means.
                            <div className="absolute w-full h-full flex flex-col items-center pointer-events-none z-10">
                                <img className="h-16 opacity-70" src="/images/arrow_up.png"></img>
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500
                                    bg-white/80 rounded-full px-2 py-0.5">
                                    You are facing this way
                                </span>
                                { props.compass?.waitingForHeading === true &&
                                    <span className="mt-1 text-[11px] font-semibold text-gray-600
                                        bg-white/80 rounded-full px-2 py-0.5">
                                        Tap the map to start the compass
                                    </span>
                                }
                            </div>
                        : <></> }
                        <MyMap layoutImage={props.mapDrawProps.submap.path} width={props.mapDrawProps.submap.width}
                        height={props.mapDrawProps.submap.height} centroidCrop={props.mapDrawProps.centroidCrop}
                        rotateAngle={props.rotateAngle} drawElements={props.mapDrawProps.mapElements} enableZoom={enableZoom}/>
                    </div>
                    : <></>
                }

                <div className="z-10 flex items-center justify-between gap-3 px-4 py-3 bg-white
                    border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <Button text='Back' enabled={!props.isFirstStep} onClick={props.onBackClick} variant="secondary" />
                    { showProgress &&
                        <span className="text-xs font-medium text-gray-400">
                            Step {props.currentStepIndex! + 1} of {props.totalSteps}
                        </span>
                    }
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
            <div className="absolute w-full h-full left-0 top-0 flex flex-col bg-gray-50">
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="text-2xl font-semibold text-gray-800 tracking-tight">
                        You have reached your destination
                    </div>
                    { props.destination.name?.trim()?.length > 0 &&
                        <div className="mt-4 text-xl font-semibold text-white tracking-tight
                                px-8 py-4 bg-cyan-600 rounded-2xl shadow-md">
                            { props.destination.name }
                        </div>
                    }
                    <div className="mt-8">
                        <FinishFlag />
                    </div>
                </div>
                <div className="z-10 flex items-center justify-center gap-3 px-4 py-3 bg-white
                    border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <Button text='Back' enabled={!props.isFirstStep} onClick={() => setNavigationFinished(false)} variant="secondary" />
                    <Link href={createHomeUrl()}>
                        <Button text='Home' enabled={true} />
                    </Link>
                </div>
            </div>
        </>
    );
}


