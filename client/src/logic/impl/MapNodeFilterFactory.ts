import { allGraphData } from "../../data/AllGraphData";
import { specialSearchResults } from "../../data/SpecialSearchResults";
import { MapNodeFilter } from "../../types/roomsearch/MapNodeFilter";
import { MapNodeFilterById } from "../../types/roomsearch/MapNodeFilterById";
import { stringEqualsIgnoreLocaleAndCase } from "../../utils/Strings";
import { createGraph } from "./graph/GraphFactory";

export function createMapNodeFilter(id: string): MapNodeFilter | null {
    let constructedGraph = createGraph(allGraphData);
    for (const entry of constructedGraph) {
        if (stringEqualsIgnoreLocaleAndCase(entry[1].node.id, id)) {
            return new MapNodeFilterById(entry[1].node.id);
        }
    }
    for (const node of specialSearchResults) {
        if (stringEqualsIgnoreLocaleAndCase(node.id, id)) {
            return node.mapNodeFilter;
        }
    }
    return null;
}
