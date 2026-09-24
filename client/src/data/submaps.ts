import { Translations } from "../i18n/en";
import { Submap } from "../types/Submap";

const NORTH_ANGLE = 30;

export type HardcodedSubMap = {
    id: number;
    path: string;
    width: number;
    height: number;
    north_angle: number;
}

// TODO: somehow get this from the server...?
export const submaps: HardcodedSubMap[] = [
    {
        "id": 1,
        "path": "/submaps/main_floor_0.svg",
        "width": 2809.2,
        "height": 847.27997,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 2,
        "path": "/submaps/main_floor_1.svg",
        "width": 2851.4399,
        "height": 875.59998,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 3,
        "path": "/submaps/main_floor_2.svg",
        "width": 2742.04,
        "height": 1092.48,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 4,
        "path": "/submaps/main_floor_3.svg",
        "width": 2952.5999,
        "height": 1335.9199,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 101,
        "path": "/submaps/lab_floor_0.svg",
        "width": 2760.1599,
        "height": 1083.36,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 102,
        "path": "/submaps/lab_floor_1.svg",
        "width": 2721.6802,
        "height": 800.23999,
        "north_angle": NORTH_ANGLE
    }
];

export type HardcodedFloor = {
    submapId: number;
    /** Short enough for a picker button - the floor number. */
    label: string;
}

export type HardcodedBuilding = {
    /**
     * Picked out of a language rather than stored: unlike a submap caption, this name is the
     * client's own text, so it is translated along with the rest of the ui.
     */
    name: (t: Translations) => string;
    /** Lowest floor first. */
    floors: HardcodedFloor[];
}

/**
 * Which floor plan is which floor of which building, for browsing the map by hand.
 *
 * Hardcoded next to the images for the same reason they are: a submap is a fixed thing. The only
 * thing the server has to say about one is its caption, and that is free text an admin can reword
 * at any time, so it is shown but never parsed. Adding a floor means adding it here too.
 */
export const buildings: HardcodedBuilding[] = [
    {
        name: t => t.map.mainBuilding,
        floors: [
            { submapId: 1, label: "0" },
            { submapId: 2, label: "1" },
            { submapId: 3, label: "2" },
            { submapId: 4, label: "3" },
        ]
    },
    {
        name: t => t.map.labBuilding,
        floors: [
            { submapId: 101, label: "0" },
            { submapId: 102, label: "1" },
        ]
    }
];

/**
 * What a floor plan is called on screen: "Main Building, floor 0", built from the hardcoded
 * buildings so it follows the ui language.
 *
 * The server's caption for the same submap says the same thing, but it is free text written in
 * whichever language the admin used, so it only stands in for a submap missing from `buildings`.
 */
export function submapCaption(submap: Submap, t: Translations): string {
    for (const building of buildings) {
        const floor = building.floors.find(floor => floor.submapId === submap.id);
        if (floor != undefined) {
            return t.map.floorCaption(building.name(t), floor.label);
        }
    }
    return submap.caption;
}