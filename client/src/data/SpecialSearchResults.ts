import { Translations } from "../i18n/en";
import { MapNodeFilterByType } from "../types/roomsearch/MapNodeFilterByType";
import { SpecialSearchResult } from "../types/roomsearch/SpecialSearchResult";
import { NodeType } from "./ServerData";

export const NEAREST_MEN_TOILET_ID = "nearest_men_toilet";
export const NEAREST_WOMEN_TOILET_ID = "nearest_women_toilet";

export const specialSearchResults: SpecialSearchResult[] = [
    {
        id: NEAREST_MEN_TOILET_ID,
        name: t => t.search.nearestMenToilet,
        mapNodeFilter: new MapNodeFilterByType(NodeType.MEN_TOILET),
    },
    {
        id: NEAREST_WOMEN_TOILET_ID,
        name: t => t.search.nearestWomenToilet,
        mapNodeFilter: new MapNodeFilterByType(NodeType.WOMEN_TOILET),
    },
];

export function findSpecialSearchResult(id: string): SpecialSearchResult | undefined {
    return specialSearchResults.find((result) => result.id === id);
}

export function isSpecialSearchResultId(id: string | undefined): boolean {
    return id != undefined && findSpecialSearchResult(id) != undefined;
}

/**
 * What a special search is called in the given language, or undefined for any other id.
 *
 * Unlike a room, this name is the app's own, so a field holding one has to be re-read after a
 * language change instead of keeping the text it was filled with.
 */
export function specialSearchResultName(id: string | undefined, t: Translations): string | undefined {
    return id == undefined ? undefined : findSpecialSearchResult(id)?.name(t);
}
