import { Building } from "../logic/impl/BuildingsFactory";
import { useTranslations } from "../i18n";

type Prop = {
    buildings: Building[],
    buildingIndex: number,
    floorIndex: number,
    onBuildingSelect: (index: number) => void,
    onFloorSelect: (index: number) => void,
}

/**
 * The bottom bar of the map screen: which building, and which floor of it, is on screen.
 *
 * Both are one tap away (the whole point of this screen is browsing the floors), with the
 * step buttons around the floors for a thumb that is already down there.
 */
export default function FloorPicker(props: Prop) {

    const t = useTranslations();

    const floors = props.buildings[props.buildingIndex]?.floors ?? [];

    return (
        <div className="z-10 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="mx-auto w-full max-w-lg px-3 py-2.5 flex flex-col gap-2">

                { props.buildings.length > 1 &&
                    <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                        { props.buildings.map((building, index) =>
                            <button
                                key={building.name}
                                onClick={() => props.onBuildingSelect(index)}
                                aria-pressed={index === props.buildingIndex}
                                className={`flex-1 min-w-0 truncate rounded-lg px-3 py-2 text-sm font-semibold transition
                                    ${index === props.buildingIndex
                                        ? "bg-white text-cyan-700 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"}`}
                            >
                                { building.name }
                            </button>
                        )}
                    </div>
                }

                <div className="flex items-center gap-2">

                    <StepButton
                        text="-"
                        label={t.map.floorDown}
                        enabled={props.floorIndex > 0}
                        onClick={() => props.onFloorSelect(props.floorIndex - 1)}
                    />

                    {/* Scrolls sideways rather than shrinking the buttons, should a building ever
                        have more floors than fit across a phone. */}
                    <div className="flex-1 flex justify-center gap-1.5 overflow-x-auto">
                        { floors.map((floor, index) =>
                            <button
                                key={floor.submap.id}
                                onClick={() => props.onFloorSelect(index)}
                                aria-current={index === props.floorIndex}
                                aria-label={t.map.floor(floor.label)}
                                title={floor.submap.caption}
                                className={`shrink-0 h-11 min-w-[2.75rem] px-3 rounded-full text-sm font-semibold transition
                                    ${index === props.floorIndex
                                        ? "bg-cyan-600 text-white shadow-sm"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                { floor.label }
                            </button>
                        )}
                    </div>

                    <StepButton
                        text="+"
                        label={t.map.floorUp}
                        enabled={props.floorIndex < floors.length - 1}
                        onClick={() => props.onFloorSelect(props.floorIndex + 1)}
                    />

                </div>
            </div>
        </div>
    );
}

type StepProp = {
    text: string,
    label: string,
    enabled: boolean,
    onClick: () => void,
}

function StepButton({ text, label, enabled, onClick }: StepProp) {
    return (
        <button
            onClick={onClick}
            disabled={!enabled}
            aria-label={label}
            title={label}
            className={`shrink-0 h-11 w-11 rounded-full border text-xl font-semibold leading-none transition
                ${enabled
                    ? "bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-700"
                    : "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"}`}
        >
            { text }
        </button>
    );
}
