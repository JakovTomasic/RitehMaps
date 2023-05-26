import { MapNode } from "../../../types/graph/MapNode";
import { NeighbourConnection } from "../../../types/graph/NeighbourConnection";
import { Dot, eucledianDistance } from "../../../utils/Geometry";
import { Graph } from "../../interfaces/Graph";
import { SubmapProvider } from "../../interfaces/SubmapProvider";
import { GraphNode } from "./GraphFactory";

const STAIRS_DISTANCE: number = 10;

export class GraphImpl implements Graph {

    private submapProvider: SubmapProvider;
    private graph = new Map<string, GraphNode>();

    constructor(graph: Map<string, GraphNode>, submapProvider: SubmapProvider) {
        this.graph = graph;
        this.submapProvider = submapProvider;
    }

    getNode(nodeId: string): MapNode | undefined {
        return this.graph.get(nodeId).node;
    }

    getNeighbours(nodeId: string): NeighbourConnection[] {
        const node: GraphNode = this.graph.get(nodeId);
        return node.neighbours.map(neighbour => {
            const connection: NeighbourConnection = {
                neighbour: neighbour,
                distance: this.getDistance(node.node, neighbour),
            };
            return connection;
        });
    }

    private getDistance(node1: MapNode, node2: MapNode): number {
        // Width for each picture is nearly the same distance (thw width of the building)
        const BUILDING_WIDTH_METERS = 100;

        if (node1.submapId !== node2.submapId) {
            return STAIRS_DISTANCE;
        } else {
            const submap = this.submapProvider.getSubmapImage(node1.submapId);
            const submapHeightMeters = submap.height * BUILDING_WIDTH_METERS / submap.width;
            const metersCoordinate1: Dot = {
                x: node1.xCoordinate * BUILDING_WIDTH_METERS,
                y: node1.yCoordinate * submapHeightMeters,
            }
            const metersCoordinate2: Dot = {
                x: node2.xCoordinate * BUILDING_WIDTH_METERS,
                y: node2.yCoordinate * submapHeightMeters,
            }
            return eucledianDistance(metersCoordinate1, metersCoordinate2);
        }
    }
}
