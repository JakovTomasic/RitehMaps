import { MapNode } from "../graph/MapNode";

export abstract class MapNodeFilter {
    abstract satisfies(node: MapNode): boolean
}
