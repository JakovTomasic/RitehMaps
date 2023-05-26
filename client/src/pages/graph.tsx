import Map from "../components/Map";
import { allGraphData } from "../data/AllGraphData";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { Graph } from "../logic/interfaces/Graph";
import { MapNode } from "../types/graph/MapNode";
import { NavigationNode } from '../types/NavigationNode';
import { NavigationStep } from "../types/NavigationStep";

export default function GraphPage(){
    return(
        <div className="relative w-fill mx-auto my-0">
            {/* TODO: read aspect ratio for the current image from some json file */}
            <Map layoutImage='/submaps/main_floor_0.svg' enableDrawNodes width={2809.2} height={847.27997} navStep={navigationStepWithAllNodesFromTheSubmap(1)}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_1.svg' enableDrawNodes width={2851.4399} height={875.59998} navStep={navigationStepWithAllNodesFromTheSubmap(2)}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_2.svg' enableDrawNodes width={2742.04} height={1092.48} navStep={navigationStepWithAllNodesFromTheSubmap(3)}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_3.svg' enableDrawNodes width={2952.5999} height={1335.9199} navStep={navigationStepWithAllNodesFromTheSubmap(4)}/>
            <Separator />
            <Map layoutImage='/submaps/lab_floor_0.svg' enableDrawNodes width={2760.1599} height={1083.36} navStep={navigationStepWithAllNodesFromTheSubmap(101)}/>
            <Separator />
            <Map layoutImage='/submaps/lab_floor_1.svg' enableDrawNodes width={2721.6802} height={800.23999} navStep={navigationStepWithAllNodesFromTheSubmap(102)}/>
        </div>
    );
}

function Separator() {
    return <hr className="h-4 my-8 bg-gray-600 border-0"></hr>
}

function navigationStepWithAllNodesFromTheSubmap(submapId: number): NavigationStep {

    let startNode = "main_entrance";
    let constructedGraph = createGraph(allGraphData);
    let graph = new GraphImpl(constructedGraph);
    let visited = new Set<string>();
    visited.add(startNode);
    const resultPath = recursiveWholeGraph(startNode, submapId, graph, visited);
    return new NavigationStep(resultPath);
}

function recursiveWholeGraph(currentNodeId: string, submapId: number, graph: Graph, visited: Set<string>): NavigationNode[] {
    let nodes: NavigationNode[] = [];
    let currentNode: MapNode = graph.getNode(currentNodeId);
    const currentNavNode = new NavigationNode(submapId, currentNode.xCoordinate, currentNode.yCoordinate)

    if (currentNode.submapId == submapId) {
        nodes.push(currentNavNode);
    }

    graph.getNeighbours(currentNodeId).forEach(element => {
        if (!visited.has(element.neighbour.id)) {
            visited.add(element.neighbour.id);

            const resultNodes = recursiveWholeGraph(element.neighbour.id, submapId, graph, visited);
            resultNodes.forEach(node => nodes.push(node));
        }
        
        if (currentNode.submapId == submapId) {
            nodes.push(currentNavNode);
        }
    });

    return nodes;
}
