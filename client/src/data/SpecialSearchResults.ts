import { MapNodeFilterByType } from "../types/roomsearch/MapNodeFilterByType";
import { SpecialSearchResult } from "../types/roomsearch/SpecialSearchResult";
import { NodeType } from "./ServerData";

export const NEAREST_MEN_TOILET_ID = "nearest_men_toilet";
export const NEAREST_WOMEN_TOILET_ID = "nearest_women_toilet";

export const specialSearchResults: SpecialSearchResult[] = [
    {
        id: NEAREST_MEN_TOILET_ID,
        name: "Nearest men toilet",
        mapNodeFilter: new MapNodeFilterByType(NodeType.MEN_TOILET),
    },
    {
        id: NEAREST_WOMEN_TOILET_ID,
        name: "Nearest women toilet",
        mapNodeFilter: new MapNodeFilterByType(NodeType.WOMEN_TOILET),
    },
];

export function findSpecialSearchResult(id: string): SpecialSearchResult | undefined {
    return specialSearchResults.find((result) => result.id === id);
}

export function isSpecialSearchResultId(id: string | undefined): boolean {
    return id != undefined && findSpecialSearchResult(id) != undefined;
}
