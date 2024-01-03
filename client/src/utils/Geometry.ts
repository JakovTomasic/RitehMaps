import ORIGIN_POINT, { Dot } from "../types/general/Dot";
import { Line } from "../types/general/Line";
import { degreesToRadians, radiansToDegrees } from "./Math";

export function eucledianDistance(dot1: Dot, dot2: Dot): number {
    const dx = dot1.x - dot2.x;
    const dy = dot1.y - dot2.y;
    return Math.sqrt(dx*dx + dy*dy);
}

export function calculateVectorMagnitude(vector: Dot): number {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

export function lineToVector(line: Line): Dot {
    const lineVector = {
        x: line.dot2.x - line.dot1.x,
        y: line.dot2.y - line.dot1.y,
    };
    return lineVector;
}

export function normalizeVector(vector: Dot): Dot {
    const vectorLength = calculateVectorMagnitude(vector)
    const normalizedVector: Dot = {
        x: vector.x / vectorLength,
        y: vector.y / vectorLength,
    };
    return normalizedVector;
}

export function calculateDotProduct(vector1: Dot, vector2: Dot): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}

export function calculateCrossProduct(vector1: Dot, vector2: Dot): number {
    return vector1.x * vector2.y - vector1.y * vector2.x;
}

export function calculateProjection(dot: Dot, line: Line): Dot {
    // Calculate the vector between the two dots on the line
    const lineVector = lineToVector(line);

    // Calculate the vector between the dot and the first dot on the line
    const dotVector: Dot = {
        x: dot.x - line.dot1.x,
        y: dot.y - line.dot1.y,
    };

    // Calculate the dot product of the line vector and dot vector
    const dotProduct = calculateDotProduct(lineVector, dotVector);

    // Calculate the squared magnitude of the line vector
    const lineMagnitudeSquared = calculateVectorMagnitude(lineVector) ** 2;

    // Calculate the scalar projection
    const scalarProjection = dotProduct / lineMagnitudeSquared;

    // Calculate the coordinates of the projection
    const projection = {
        x: line.dot1.x + scalarProjection * lineVector.x,
        y: line.dot1.y + scalarProjection * lineVector.y,
    };

    return projection;
}

export function calculateLinesIntersection(line1: Line, line2: Line): Dot | null {
    const { dot1: line1Dot1, dot2: line1Dot2 } = line1;
    const { dot1: line2Dot1, dot2: line2Dot2 } = line2;
  
    const xDiffLine1 = line1Dot1.x - line1Dot2.x;
    const yDiffLine1 = line1Dot1.y - line1Dot2.y;
    const xDiffLine2 = line2Dot1.x - line2Dot2.x;
    const yDiffLine2 = line2Dot1.y - line2Dot2.y;
  
    const denominator = xDiffLine1 * yDiffLine2 - yDiffLine1 * xDiffLine2;
  
    if (denominator === 0) {
      // The lines are parallel, no intersection
      return null;
    }
  
    const c1 = line1Dot1.x * line1Dot2.y - line1Dot1.y * line1Dot2.x;
    const c2 = line2Dot1.x * line2Dot2.y - line2Dot1.y * line2Dot2.x;
  
    const intersectionX = (c1 * xDiffLine2 - c2 * xDiffLine1) / denominator;
    const intersectionY = (c1 * yDiffLine2 - c2 * yDiffLine1) / denominator;
  
    const intersection: Dot = { x: intersectionX, y: intersectionY };
  
    return intersection;
}

/** Caution: Always returns an angle smaller (or equal to) 180 degrees */
export function findAngleBetweenTwoVectors(vector1: Dot, vector2: Dot): number {
    const dotProduct = calculateDotProduct(vector1, vector2);
    const magnitude1 = calculateVectorMagnitude(vector1);
    const magnitude2 = calculateVectorMagnitude(vector2);
    const magnitudeProduct = magnitude1 * magnitude2;

    return radiansToDegrees(Math.acos(dotProduct/magnitudeProduct));
}

export function findAngleFromReferenceLine(reference: Line, line: Line): number {
    let referenceVector = normalizeVector(lineToVector(reference));
    let lineVector = normalizeVector(lineToVector(line));

    const dotProduct = calculateDotProduct(referenceVector, lineVector);    
    const crossProduct = calculateCrossProduct(referenceVector, lineVector);

    let angle = radiansToDegrees(Math.atan2(crossProduct, dotProduct));

    return (angle > 0) ? (360 - angle) : (-angle);
}

export function rotatePointClockwise(point: Dot, angle: number, referencePoint: Dot = ORIGIN_POINT): Dot {
    const radAngle = degreesToRadians(angle);
    const rotatedPoint : Dot = {
        x:
            (point.x - referencePoint.x) * Math.cos(-radAngle) -
            (point.y - referencePoint.y) * Math.sin(-radAngle) +
            referencePoint.x,
        y:
            (point.x - referencePoint.x) * Math.sin(-radAngle) +
            (point.y - referencePoint.y) * Math.cos(-radAngle) +
            referencePoint.y,
    };
    return rotatedPoint;
}