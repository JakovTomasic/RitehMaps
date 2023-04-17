import { NavigationNode } from "./NavigationNode"

export class NavigationStep {
    nodes: NavigationNode[]

    constructor(nodes: NavigationNode[]) {
        this.nodes = nodes;
    }
}
