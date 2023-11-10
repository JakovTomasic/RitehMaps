import { MapNodeFilterByType } from "../types/roomsearch/MapNodeFilterByType";
import { SpecialSearchResult } from "../types/roomsearch/SpecialSearchResult";
import { NodeType } from "./Nodes";


export const specialSearchResults: SpecialSearchResult[] = [
    {
        id: "nearest_men_toilet",
        name: "Nearest men toilet",
        mapNodeFilter: new MapNodeFilterByType(NodeType.MEN_TOILET),
    },
    {
        id: "nearest_women_toilet",
        name: "Nearest women toilet",
        mapNodeFilter: new MapNodeFilterByType(NodeType.WOMEN_TOILET),
    },
];
