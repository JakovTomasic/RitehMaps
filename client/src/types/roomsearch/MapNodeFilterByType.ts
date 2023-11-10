import { NodeType } from "../../data/Nodes";
import { MapNode } from "../graph/MapNode";
import { MapNodeFilter } from "./MapNodeFilter";

export class MapNodeFilterByType extends MapNodeFilter {
    destinationType: NodeType;

    constructor(destinationType: NodeType){
        super();
        this.destinationType = destinationType
    }

    satisfiedBy(node: MapNode): boolean {
        return node !== undefined && node.nodeType == this.destinationType;
    }
}