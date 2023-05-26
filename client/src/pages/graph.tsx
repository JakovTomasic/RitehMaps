import Map from "../components/Map";
import { allGraphData } from "../data/AllGraphData";
import { submaps } from "../data/submaps";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { Graph } from "../logic/interfaces/Graph";
import { MapNode } from "../types/graph/MapNode";
import { NavigationNode } from '../types/navigation/NavigationNode';
import { NavigationStep } from "../types/navigation/NavigationStep";

export default function GraphPage(){
    return(
        <div className="relative w-fill mx-auto my-0">
            {submaps.map(submap => {
                const navSteps = navigationStepWithAllNodesFromTheSubmap(submap.id);
                return (
                    <div key={submap.id}>
                        <Map layoutImage={submap.path} 
                            enableDrawNodes
                            width={submap.width}
                            height={submap.height}
                            navStep={navSteps}/>
                        <Separator />
                    </div>
                );
            })}
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
