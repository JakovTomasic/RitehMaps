import { useState } from "react";
import Button from "./Button";
import MyMap from "./Map";
import MapCaption from "./MapCaption";
import { MapDrawProps } from "../types/map_draw_elements/MapDrawProps";
import ZoomToggleButton from "./ZoomToggleButton";
import { DestinationNode } from "../types/navigation/DestinationNode";
import { createHomeUrl } from "../pages";
import { Link } from "wouter";
import CompassToggleButton from "./CompassToggleButton";
import CompassFacingOverlay from "./CompassFacingOverlay";
import Banner from "./Banner";
import { useTranslations } from "../i18n";

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

    const t = useTranslations();

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
                        {t.navigation.editSearch}
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
                    <Banner text={props.compass.error} tone="warning" />
                }

                { props.showDeviceOrientationWarning &&
                    <Banner text={t.compass.keepLevel} tone="error" />
                }

                {
                props.mapDrawProps != null ?
                    <div className="w-full flex-1 overflow-hidden relative">
                        { props.middleLineVisible ?
                            <CompassFacingOverlay waitingForHeading={props.compass?.waitingForHeading === true} />
                        : <></> }
                        <MyMap layoutImage={props.mapDrawProps.submap.path} width={props.mapDrawProps.submap.width}
                        height={props.mapDrawProps.submap.height} centroidCrop={props.mapDrawProps.centroidCrop}
                        rotateAngle={props.rotateAngle} drawElements={props.mapDrawProps.mapElements} enableZoom={enableZoom}/>
                    </div>
                    : <></>
                }

                <div className="z-10 flex items-center justify-between gap-3 px-4 py-3 bg-white
                    border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <Button text={t.navigation.back} enabled={!props.isFirstStep} onClick={props.onBackClick} variant="secondary" />
                    { showProgress &&
                        <span className="text-xs font-medium text-gray-400 text-center">
                            {t.navigation.stepLabel} <span style={{ whiteSpace: 'nowrap' }}> {t.navigation.stepValue(props.currentStepIndex! + 1, props.totalSteps!)} </span>
                        </span>
                    }
                    <Button
                        text={props.isLastStep ? t.navigation.finish : t.navigation.next}
                        enabled={true}
                        onClick={props.isLastStep ? () => { setNavigationFinished(true) } : props.onNextClick}
                    />
                </div>
            </div>
        </>
        :
        <>
            <div className="absolute w-full h-full left-0 top-0 flex flex-col bg-gray-50">

                {/*
                  The card centers itself with `my-auto` rather than `justify-center`: the content
                  is taller than the strip left above the buttons on a phone held sideways,
                  and auto margins center without clipping the overflow, so it
                  scrolls in that case instead of losing its bottom half.
                */}
                <div className="flex-1 overflow-y-auto flex justify-center px-4 py-6">
                    <div className="my-auto w-full max-w-96 flex flex-col items-center text-center
                        bg-white px-6 py-8 rounded-2xl shadow-md border border-gray-100">

                        { props.destination.name?.trim()?.length > 0 ?
                            <>
                                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                                    {t.navigation.arrivedAt}
                                </p>
                                <h1 className="mt-1.5 text-2xl font-semibold text-gray-800 tracking-tight break-words">
                                    { props.destination.name }
                                </h1>
                                { props.destination.room != undefined &&
                                    <p className="mt-1 text-base font-medium text-gray-600 break-words">
                                        { t.navigation.room(props.destination.room) }
                                    </p>
                                }
                            </>
                            :
                            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                                {t.navigation.arrived}
                            </h1>
                        }

                        { props.mapDrawProps != null &&
                            <p className="mt-2 text-sm font-medium text-gray-500">
                                { props.mapDrawProps.submap.caption }
                            </p>
                        }
                    </div>
                </div>

                <div className="z-10 flex items-center justify-between gap-3 px-4 py-3 bg-white
                    border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <Button text={t.navigation.backToMap} enabled={true} onClick={() => setNavigationFinished(false)} variant="secondary" />
                    <Link href={createHomeUrl()}>
                        <Button text={t.navigation.newSearch} enabled={true} />
                    </Link>
                </div>
            </div>
        </>
    );
}


