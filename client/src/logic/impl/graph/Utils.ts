import { Hallway } from "../../../data/Hallways";
import { MapNode } from "../../../types/graph/MapNode";
import { NavigationNode } from "../../../types/navigation/NavigationNode";
import ORIGIN_POINT, { Dot } from "../../../types/general/Dot";
import { Line } from "../../../types/general/Line";
import { absoluteToRelative, relativeToAbsolute, rotatePointClockwise } from "../../../utils/Geometry";

export function nodeToDot(node: MapNode): Dot {
  return { x: node.xCoordinate, y: node.yCoordinate };
}

export function hallwayToLine(hallway: Hallway): Line {
  return {
    dot1: { x: hallway.x1, y: hallway.y1 },
    dot2: { x: hallway.x2, y: hallway.y2 },
  };
}

export function getNodeBounds(
  nodes: NavigationNode[],
  rotateAngle: number = 0, 
  width: number, 
  height: number,
): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  nodes.forEach((node) => {

    if(rotateAngle != 0) {
      const potentialCenter = {x: width / 2, y: height / 2};
      const potentialCenter2 = {x: 1404.5999755859375, y: 424.8105163574219};
      const potentialCenter3 = {x: 50, y: 50};

      const absPoint = relativeToAbsolute({x: node.xCoordinate, y: node.yCoordinate}, width, height);
      const rotatedPoint = rotatePointClockwise({x: absPoint.absX, y: absPoint.absY}, rotateAngle, potentialCenter );
      const relPoint = absoluteToRelative({x: rotatedPoint.x, y: rotatedPoint.y}, width, height)

      const rotatedNode: NavigationNode = {
        submapId: node.submapId,
        xCoordinate: relPoint.relX,
        yCoordinate: relPoint.relY,
        //xCoordinate: rotatedPoint.x,
        //yCoordinate: rotatedPoint.y,
      }
    
      minX = Math.min(minX, rotatedNode.xCoordinate);
      minY = Math.min(minY, rotatedNode.yCoordinate);
      maxX = Math.max(maxX, rotatedNode.xCoordinate);
      maxY = Math.max(maxY, rotatedNode.yCoordinate);

    }else{
      
      minX = Math.min(minX, node.xCoordinate);
      minY = Math.min(minY, node.yCoordinate);
      maxX = Math.max(maxX, node.xCoordinate);
      maxY = Math.max(maxY, node.yCoordinate);
    }
  
  });

  return { minX, minY, maxX, maxY };
}

export function sameCoordinates(node1: MapNode, node2: MapNode): boolean {
  return (
    node1.submapId == node2.submapId &&
    node1.xCoordinate == node2.xCoordinate &&
    node1.yCoordinate == node2.yCoordinate
  );
}
