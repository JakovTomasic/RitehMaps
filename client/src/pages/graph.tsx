import Map from "../components/Map";
import { allGraphData } from "../data/AllGraphData";
import { submaps } from "../data/submaps";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { createGraph } from "../logic/impl/graph/GraphFactory";
import { GraphImpl } from "../logic/impl/graph/GraphImpl";
import { Graph } from "../logic/interfaces/Graph";
import { MapNode } from "../types/graph/MapNode";
import { CentroidScale } from "../types/navigation/CentroidScale";
import { NavigationNode } from '../types/navigation/NavigationNode';
import { NavigationStep } from "../types/navigation/NavigationStep";
import { Dot } from "../types/general/Dot";
import { Line } from "../types/general/Line";
import { MapDot } from "../types/map_draw_elements/MapDot";
import { MapPathLine } from "../types/map_draw_elements/MapPathLine";
import { MapDrawElement } from "../types/map_draw_elements/MapDrawElement";

export default function GraphPage(){
    return(
        <div className="relative w-fill mx-auto my-0">
            {submaps.map(submap => {
                const navSteps = navigationStepWithAllNodesFromTheSubmap(submap.id);
                const fullScale: CentroidScale = {
                    translateX: 0,
                    translateY: 0,
                    stepScale: 1,
                    scaledWidth: submap.width,
                    scaledHeight: submap.height,
                }

                let mapElements: MapDrawElement[] = [];
                let prevDot = {} as Dot;
                navSteps.nodes.forEach((node, index) => {
                    const dot = {x: node.xCoordinate, y: node.yCoordinate} as Dot;
                    const mapDot = new MapDot(dot, "#41C7F7", 0.5, 1);
                    mapElements.push(mapDot);
                    if(index > 0){
                        const line = {dot1: prevDot, dot2: dot} as Line;
                        const mapLine = new MapPathLine(line, "#41C7F7", 0.1);
                        mapElements.push(mapLine);
                    }
                    prevDot = dot;        
                })
                return (
                    <div key={submap.id}>
                        <Map layoutImage={submap.path} 
                            enableDrawNodes={true}
                            enableZoom={true}
                            width={submap.width}
                            height={submap.height}
                            drawElements={mapElements}
                            centroidCrop={fullScale}
                            rotateAngle={0}/>
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
    let graph = new GraphImpl(constructedGraph, new SubmapProviderImpl());

    let visited = new Set<string>();
    visited.add(startNode);

    let nodesPath: NavigationNode[] = [];
    makeFlatDfsTree(startNode, submapId, graph, visited, nodesPath);

    return new NavigationStep(nodesPath);
}

function makeFlatDfsTree(
    currentNodeId: string,
    submapId: number,
    graph: Graph,
    visited: Set<string>,
    resultNodes: NavigationNode[],
) {
    let currentNode: MapNode = graph.getNode(currentNodeId);
    const currentNavNode = new NavigationNode(submapId, currentNode.xCoordinate, currentNode.yCoordinate)

    if (currentNode.submapId == submapId) {
        resultNodes.push(currentNavNode);
    }

    graph.getNeighbours(currentNodeId).forEach(element => {
        const edge = `${currentNodeId}==>${element.neighbour.id}`;
        if (!visited.has(edge)) {
            visited.add(edge);

            makeFlatDfsTree(element.neighbour.id, submapId, graph, visited, resultNodes);
        
            if (currentNode.submapId == submapId) {
                resultNodes.push(currentNavNode);
            }
        }
    });
}
