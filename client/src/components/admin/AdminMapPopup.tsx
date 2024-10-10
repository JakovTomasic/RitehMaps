import { CentroidScale } from "../../types/navigation/CentroidScale";
import { submaps } from "../../data/submaps";
import { Dot } from "../../types/general/Dot";
import { Line } from "../../types/general/Line";
import { MapDot } from "../../types/map_draw_elements/MapDot";
import { MapDrawElement } from "../../types/map_draw_elements/MapDrawElement";
import { MapPathLine } from "../../types/map_draw_elements/MapPathLine";
import { AllMapsData } from "../../data/ServerData";
import { GraphNode, createGraph } from "../../logic/impl/graph/GraphFactory";
import { navNodeToDot } from "../../logic/impl/graph/Utils";
import MyMap from "../Map";

type Props = {
    submapId: number,
    mapData: AllMapsData,
    nodeToShowId: string | null,
    edgeToShow: { nodeOrHallwayId1: string, nodeOrHallwayId2: string } | null,
    hallwayToShowId: string | null,
    close: () => void,
};

type MapEdge = {
    navNode1: GraphNode,
    navNode2: GraphNode,
}

type StuffToDrawOnMap = {
    nodes: GraphNode[],
    edges: MapEdge[],
}

const basicColor = "#41C7F7";
const accentColor = "#F7A7A7";

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
            const dot: Dot = {x: node.node.xCoordinate, y: node.node.yCoordinate};
            const showThisNode = node.node.id === props.nodeToShowId;
            const e = props.edgeToShow;
            const edgeNodes = [e?.nodeOrHallwayId1, e?.nodeOrHallwayId2];
            const showThisEdge = e !== null &&
                    (edgeNodes.find(n => n === node.originalNodeOrHallwayId1) !== undefined && 
                    edgeNodes.find(n => n === node.originalNodeOrHallwayId2) !== undefined);
            const color = (showThisNode || showThisEdge) ? accentColor : basicColor;
            return new MapDot(dot, color, 0.5, 1);
        })
    );
    mapElements.push(
        ...navSteps.edges.map(edge => {
            const line: Line = {dot1: navNodeToDot(edge.navNode1.node), dot2: navNodeToDot(edge.navNode2.node)};
            const node1Ids = [edge.navNode1.originalNodeOrHallwayId1, edge.navNode1.originalNodeOrHallwayId2];
            const node2Ids = [edge.navNode2.originalNodeOrHallwayId1, edge.navNode2.originalNodeOrHallwayId2];
            let thisIsEdgeToShow: boolean
            if (props.edgeToShow !== null) {
                const e = props.edgeToShow;
                thisIsEdgeToShow = node1Ids.find(n => n === e.nodeOrHallwayId1) !== undefined &&
                                    node2Ids.find(n => n === e.nodeOrHallwayId2) !== undefined;
                thisIsEdgeToShow = thisIsEdgeToShow ||
                                (node1Ids.find(n => n === e.nodeOrHallwayId2) !== undefined &&
                                    node2Ids.find(n => n === e.nodeOrHallwayId1) !== undefined);
            } else if (props.hallwayToShowId !== null) {
                const h = props.hallwayToShowId;
                thisIsEdgeToShow = node1Ids.find(n => n === h) !== undefined &&
                                    node2Ids.find(n => n === h) !== undefined;
            } else {
                thisIsEdgeToShow = false;
            }
            const color = thisIsEdgeToShow ? accentColor : basicColor;
            return new MapPathLine(line, color, 0.1);
        })
    );

    return(
        <div className="fixed top-0 left-0 w-full bg-white flex flex-col">
            { submapName }
            <br/>
            <MyMap layoutImage={submap.path} 
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

    let constructedGraph = createGraph(allMapData);

    let visited = new Set<string>();
    let resultNodes: GraphNode[] = [];
    let resultEdges: MapEdge[] = [];
    for (const startNode of allMapData.nodes) {
        if (visited.has(startNode.nodeId)) continue;
        visited.add(startNode.nodeId);

        makeFlatDfsTree(startNode.nodeId, submapId, constructedGraph, visited, resultNodes, resultEdges);
    }

    return { nodes: resultNodes, edges: resultEdges };
}

function makeFlatDfsTree(
    currentNodeId: string,
    submapId: number,
    graph: Map<string, GraphNode>,
    visited: Set<string>,
    resultNodes: GraphNode[],
    resultEdges: MapEdge[],
) {
    let currentNode: GraphNode = graph.get(currentNodeId)!;

    if (currentNode.node.submapId == submapId) {
        resultNodes.push(currentNode);
    }

    currentNode.neighbours.forEach(element => {
        const neighbour = graph.get(element.id)!;
        if (!visited.has(element.id)) {
            visited.add(element.id);

            makeFlatDfsTree(element.id, submapId, graph, visited, resultNodes, resultEdges);
        
            if (currentNode.node.submapId === submapId && element.submapId === submapId) {
                resultEdges.push({
                    navNode1: currentNode,
                    navNode2: neighbour,
                });
            }
        }
    });
}
