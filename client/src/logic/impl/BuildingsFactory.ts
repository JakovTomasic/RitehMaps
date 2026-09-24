import { buildings } from "../../data/submaps";
import { SubMap } from "../../data/ServerData";
import { Submap } from "../../types/Submap";
import { SubmapProvider } from "../interfaces/SubmapProvider";

export type Floor = {
    submap: Submap,
    /** Short enough for a picker button - the floor number. */
    label: string,
}

export type Building = {
    name: string,
    /** Lowest floor first. */
    floors: Floor[],
}

/**
 * The hardcoded buildings (see data/submaps.ts) filled in with the floor plans that can actually
 * be drawn - a floor the server never sent has no caption, and nothing to show.
 */
export function createBuildings(serverSubmaps: SubMap[], submapProvider: SubmapProvider): Building[] {
    return buildings
        .map(building => ({
            name: building.name,
            floors: building.floors
                .filter(floor => serverSubmaps.some(serverSubmap => serverSubmap.id === floor.submapId))
                .map(floor => ({ submap: submapProvider.getSubmap(floor.submapId), label: floor.label })),
        }))
        .filter(building => building.floors.length > 0);
}
