import { MapNode } from "../../../types/graph/MapNode";
import { Dot } from "../../../types/general/Dot";
import { Line } from "../../../types/general/Line";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import { NavigationStep } from "../../../types/navigation/NavigationStep";
import { rotatePointClockwise } from "../../../utils/Geometry";
import { SubmapProvider } from "../../interfaces/SubmapProvider";
import { Hallway } from "../../../data/ServerData";

export function nodeToDot(node: MapNode): Dot {
    return {x: node.xCoordinate, y: node.yCoordinate};
}

export function navNodeToDot(node: NavigationNode): Dot {
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

export function relativeToAbsoluteCoordinates(dot: Dot, width: number, height: number) : Dot {
    const absX = dot.x * width / 100;
    const absY = dot.y * height / 100;
    return {x: absX, y: absY};
}

export function absoluteToRelativeCoordinates(dot: Dot, width: number, height: number) : Dot {
    const relX = dot.x / width * 100;
    const relY = dot.y / height * 100;
    return {x: relX, y: relY};
}

export function navNodeToAbsoluteDot(node: NavigationNode, submapProvider: SubmapProvider): Dot {
    const width = submapProvider.getSubmap(node.submapId).width;
    const height = submapProvider.getSubmap(node.submapId).height;
    return relativeToAbsoluteCoordinates(navNodeToDot(node), width, height);
}

export function rotateRelativePointClockwise(
    point: Dot,
    angle: number, 
    width: number, 
    height: number,
    centerOfRotation: Dot = {x: width / 2, y: height / 2}
) : Dot {
    const absPoint = relativeToAbsoluteCoordinates({x: point.x, y: point.y}, width, height);
    const rotPoint = rotatePointClockwise({x: absPoint.x, y: absPoint.y}, angle, centerOfRotation);
    const relPoint = absoluteToRelativeCoordinates({x: rotPoint.x, y: rotPoint.y}, width, height);
    return {x: relPoint.x, y: relPoint.y};
}

export function getStepWithRotatedNodes(
    navigationStep: NavigationStep, 
    width: number, 
    height: number,
    rotateAngle: number = 0
): NavigationStep {

    if (rotateAngle == 0) return navigationStep;

    let rotatedNodes: NavigationNode[] = [];

    navigationStep.nodes.forEach((node) => {
        const rotatedPoint = rotateRelativePointClockwise(
            {x: node.xCoordinate, y: node.yCoordinate}, 
            rotateAngle, 
            width, 
            height,
        );
        rotatedNodes.push({
            submapId: node.submapId,
            xCoordinate: rotatedPoint.x,
            yCoordinate: rotatedPoint.y,
        });
    });

    return new NavigationStep(rotatedNodes);
}