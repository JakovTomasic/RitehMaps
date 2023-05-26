import { Hallway } from "../../../data/Hallways";
import { MapNode } from "../../../types/graph/MapNode";
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