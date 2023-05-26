import { MapNode } from "../graph/MapNode";

export abstract class MapNodeFilter {
    abstract satisfiedBy(node: MapNode): boolean
}
