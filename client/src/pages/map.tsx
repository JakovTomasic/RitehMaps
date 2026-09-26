import { useMemo, useState } from "react";
import { Link } from "wouter";
import MyMap from "../components/Map";
import MapCaption from "../components/MapCaption";
import CompassToggleButton from "../components/CompassToggleButton";
import CompassFacingOverlay from "../components/CompassFacingOverlay";
import Banner from "../components/Banner";
import FloorPicker from "../components/FloorPicker";
import { AllMapsData } from "../data/ServerData";
import { createBuildings } from "../logic/impl/BuildingsFactory";
import { submapCaption } from "../data/submaps";
import { MapRotationCalculatorImpl } from "../logic/impl/MapRotationCalculatorImpl";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { MapDrawElement } from "../types/map_draw_elements/MapDrawElement";
import { CentroidScale } from "../types/navigation/CentroidScale";
import { Submap } from "../types/Submap";
import { CompassAvailability, useCompass } from "../utils/Compass";
import { createHomeUrl } from "./index";
import { useTranslations } from "../i18n";

export const MAP_PATH = "/map";

/**
 * Nothing is drawn over the floor plan on this screen. It is a constant because MyMap redraws its
 * whole overlay whenever this list is a different object, and in compass mode this renders often.
 */
const NO_ELEMENTS: MapDrawElement[] = [];

type Props = {
    allMapData: AllMapsData,
}

type Selection = {
    buildingIndex: number,
    floorIndex: number,
}

/**
 * The plain map: one floor at a time, free to zoom and pan, with no route on it. Which floor is
 * shown is the only thing this screen does, so the picker gets the whole bottom bar.
 */
export default function MapPage(props: Props) {

    const t = useTranslations();

    const buildings = useMemo(
        () => createBuildings(props.allMapData.submaps, new SubmapProviderImpl(props.allMapData.submaps), t),
        [props.allMapData, t],
    );

    const [selection, setSelection] = useState<Selection>({ buildingIndex: 0, floorIndex: 0 });

    const building = buildings[selection.buildingIndex];
    const floor = building?.floors[selection.floorIndex];
    const submap: Submap | undefined = floor?.submap;

    const compass = useCompass();
    const mapRotationCalculator = new MapRotationCalculatorImpl(new SubmapProviderImpl(props.allMapData.submaps));

    // How far the map has to be turned for the direction the user faces to point up the screen.
    const rotateAngle = (compass.heading == null || submap == undefined)
        ? 0
        : mapRotationCalculator.rotationForCompass(submap.north_angle, compass.heading) ?? 0;

    // The whole floor, uncropped - MyMap zooms out of this on its own once zooming is enabled.
    // Kept memoized because a new object would have MyMap redraw on every compass reading.
    const wholeSubmapCrop: CentroidScale = useMemo(() => ({
        translateX: 0,
        translateY: 0,
        stepScale: 1,
        scaledWidth: submap?.width ?? 0,
        scaledHeight: submap?.height ?? 0,
    }), [submap]);

    /** Switching buildings stays on the same floor number where the other building has one. */
    function selectBuilding(buildingIndex: number) {
        const floors = buildings[buildingIndex].floors;
        const sameFloor = floors.findIndex(candidate => candidate.label === floor?.label);
        setSelection(current => ({
            buildingIndex: buildingIndex,
            floorIndex: sameFloor >= 0 ? sameFloor : Math.min(current.floorIndex, floors.length - 1),
        }));
    }

    return (
        <div className="absolute w-full h-full left-0 top-0 flex flex-col bg-gray-50">

            {/*
              The floor caption is a whole sentence ("Main Building, floor 0"), so on a phone it
              wraps onto its own line under the controls - the same header the navigation screen has.
            */}
            <div className="z-10 flex flex-wrap items-center gap-x-2 px-3 py-2 bg-white shadow-sm">
                <Link href={createHomeUrl()}>
                    <button
                        className="order-1 flex items-center gap-1 text-sm font-semibold text-cyan-700
                            hover:text-cyan-800 px-2 py-1.5 -ml-2 rounded-md hover:bg-cyan-50 transition"
                    >
                        <span aria-hidden className="leading-none">&larr;</span>
                        {t.map.backToSearch}
                    </button>
                </Link>

                <div className="order-3 w-full min-w-0 pt-0.5 sm:order-2 sm:w-auto sm:flex-1 sm:pt-0 sm:text-center">
                    { submap != undefined &&
                        <MapCaption imageCaption={submapCaption(submap, t)} />
                    }
                </div>

                <div className="order-2 ml-auto flex items-center gap-1.5 shrink-0 sm:order-3 sm:ml-0">
                    <CompassToggleButton
                        enabled={compass.enabled}
                        available={compass.availability !== CompassAvailability.Unavailable}
                        checking={compass.availability === CompassAvailability.Unknown}
                        onClick={compass.toggle}
                    />
                </div>
            </div>

            { compass.error != null &&
                <Banner text={compass.error} tone="warning" />
            }

            { compass.tilted &&
                <Banner text={t.compass.keepLevel} tone="error" />
            }

            { submap != undefined ?
                <>
                    <div className="w-full flex-1 overflow-hidden relative">
                        { compass.enabled &&
                            <CompassFacingOverlay waitingForHeading={compass.heading == null} />
                        }
                        <MyMap
                            layoutImage={submap.path}
                            width={submap.width}
                            height={submap.height}
                            centroidCrop={wholeSubmapCrop}
                            rotateAngle={rotateAngle}
                            drawElements={NO_ELEMENTS}
                            enableZoom={true}
                        />
                    </div>

                    <FloorPicker
                        buildings={buildings}
                        buildingIndex={selection.buildingIndex}
                        floorIndex={selection.floorIndex}
                        onBuildingSelect={selectBuilding}
                        onFloorSelect={floorIndex => setSelection(current => ({ ...current, floorIndex: floorIndex }))}
                    />
                </>
                :
                <div className="flex-1 flex items-center justify-center px-6 text-center text-gray-500 font-medium">
                    {t.map.noFloorPlans}
                </div>
            }

        </div>
    );
}
