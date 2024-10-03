import { Node } from "../../data/ServerData";
import { NodesContainer } from "../interfaces/NodesContainer";

export class NodesContainerImpl implements NodesContainer {

    private nodeIds = new Set<string>;

    constructor(nodes: Node[]) {
        nodes.forEach(node => {
            this.nodeIds.add(node.nodeId)
        });
    }

    contains(nodeId: string): boolean {
        return this.nodeIds.has(nodeId);
    }
}