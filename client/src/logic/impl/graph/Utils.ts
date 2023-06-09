import { Hallway } from "../../../data/Hallways";
import { MapNode } from "../../../types/graph/MapNode";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { Dot, Line } from "../../../utils/Geometry";

export function nodeToDot(node: MapNode): Dot {
    return {x: node.xCoordinate, y: node.yCoordinate};
}

export function hallwayToLine(hallway: Hallway): Line {
    return {
        dot1: {x: hallway.x1, y: hallway.y1},
        dot2: {x: hallway.x2, y: hallway.y2},
    }
}

export function getNodeBounds(nodes: NavigationNode[]): {minX: number, minY: number, maxX: number, maxY: number} {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    nodes.forEach((node) => {
        minX = Math.min(minX, node.xCoordinate);
        minY = Math.min(minY, node.yCoordinate);
        maxX = Math.max(maxX, node.xCoordinate);
        maxY = Math.max(maxY, node.yCoordinate);
    });

    return {minX, minY, maxX, maxY};
}

export function sameCoordinates(node1: MapNode, node2: MapNode): boolean {
    return node1.submapId == node2.submapId &&
        node1.xCoordinate == node2.xCoordinate &&
        node1.yCoordinate == node2.yCoordinate;
}