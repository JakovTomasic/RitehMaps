import { CentroidScale } from "../../types/navigation/CentroidScale";
import { submaps } from "../../data/submaps";
import { Dot } from "../../types/general/Dot";
import { Line } from "../../types/general/Line";
import { MapDot } from "../../types/map_draw_elements/MapDot";
import { MapDrawElement } from "../../types/map_draw_elements/MapDrawElement";
import { MapPathLine } from "../../types/map_draw_elements/MapPathLine";
import { AllMapsData } from "../../data/ServerData";
import Map from "../Map";
import { SubmapProviderImpl } from "../../logic/impl/SubmapProviderImpl";
import { createGraph } from "../../logic/impl/graph/GraphFactory";
import { GraphImpl } from "../../logic/impl/graph/GraphImpl";
import { Graph } from "../../logic/interfaces/Graph";
import { MapNode } from "../../types/graph/MapNode";
import { NavigationNode } from "../../types/navigation/NavigationNode";
import { navNodeToDot } from "../../logic/impl/graph/Utils";

type Props = {
    submapId: number,
    mapData: AllMapsData,
    close: () => void,
};

type MapEdge = {
    navNode1: NavigationNode,
    navNode2: NavigationNode,
}

type StuffToDrawOnMap = {
    nodes: NavigationNode[],
    edges: MapEdge[],
}

export default function AdminMapPopup(props: Props) {

    const submap = submaps.find(s => s.id === props.submapId);
    const submapName = props.mapData.submaps.find(s => s.id === props.submapId)?.caption;

    if (!submap || !submapName) return <></>;

    const navSteps = navigationStepWithAllNodesFromTheSubmap(props.submapId, props.mapData);
    const fullScale: CentroidScale = {
        translateX: 0,
        translateY: 0,
        stepScale: 1,
        scaledWidth: submap.width,
        scaledHeight: submap.height,
    }

    const mapElements: MapDrawElement[] = [];
    mapElements.push(
        ...navSteps.nodes.map(node => {
            const dot: Dot = {x: node.xCoordinate, y: node.yCoordinate};
            return new MapDot(dot, "#41C7F7", 0.5, 1);
        })
    );
    mapElements.push(
        ...navSteps.edges.map(edge => {
            const line: Line = {dot1: navNodeToDot(edge.navNode1), dot2: navNodeToDot(edge.navNode2)};
            return new MapPathLine(line, "#41C7F7", 0.1);
        })
    );

    console.log("yay");
    return(
        <div className="absolute w-full flex-1 mx-auto my-0 bg-white flex flex-col">
            { submapName }
            <br/>
            <Map layoutImage={submap.path} 
                enableDrawNodes={true}
                enableZoom={true}
                width={submap.width}
                height={submap.height}
                drawElements={mapElements}
                centroidCrop={fullScale}
                rotateAngle={0}/>

            <button className="text-5xl" onClick={props.close}>Close</button>
        </div>
    );
}

function navigationStepWithAllNodesFromTheSubmap(submapId: number, allMapData: AllMapsData): StuffToDrawOnMap {

    let startNode = allMapData.nodes[0].nodeId;

    let constructedGraph = createGraph(allMapData);
    let graph = new GraphImpl(constructedGraph, new SubmapProviderImpl(allMapData.submaps));

    let visited = new Set<string>();
    visited.add(startNode);

    let resultNodes: NavigationNode[] = [];
    let resultEdges: MapEdge[] = [];
    makeFlatDfsTree(startNode, submapId, graph, visited, resultNodes, resultEdges);

    return { nodes: resultNodes, edges: resultEdges };
}

function makeFlatDfsTree(
    currentNodeId: string,
    submapId: number,
    graph: Graph,
    visited: Set<string>,
    resultNodes: NavigationNode[],
    resultEdges: MapEdge[],
) {
    let currentNode: MapNode = graph.getNode(currentNodeId)!;
    const currentNavNode = new NavigationNode(submapId, currentNode.xCoordinate, currentNode.yCoordinate)

    if (currentNode.submapId == submapId) {
        resultNodes.push(currentNavNode);
    }

    graph.getNeighbours(currentNodeId).forEach(element => {
        if (!visited.has(element.neighbour.id)) {
            visited.add(element.neighbour.id);

            makeFlatDfsTree(element.neighbour.id, submapId, graph, visited, resultNodes, resultEdges);
        
            if (currentNode.submapId === submapId && element.neighbour.submapId === submapId) {
                resultEdges.push({
                    navNode1: currentNode,
                    navNode2: element.neighbour,
                });
            }
        }
    });
}
