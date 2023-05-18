

export type Dot = {
    x: number;
    y: number;
};

export type Line = {
    dot1: Dot;
    dot2: Dot;
};

export function calculateProjection(dot: Dot, line: Line): Dot {
    const { dot1, dot2 } = line;

    // Calculate the vector between the two dots on the line
    const lineVector = {
        x: dot2.x - dot1.x,
        y: dot2.y - dot1.y,
    };

    // Calculate the vector between the dot and the first dot on the line
    const dotVector = {
        x: dot.x - dot1.x,
        y: dot.y - dot1.y,
    };

    // Calculate the dot product of the line vector and dot vector
    const dotProduct = lineVector.x * dotVector.x + lineVector.y * dotVector.y;

    // Calculate the squared magnitude of the line vector
    const lineMagnitudeSquared = lineVector.x ** 2 + lineVector.y ** 2;

    // Calculate the scalar projection
    const scalarProjection = dotProduct / lineMagnitudeSquared;

    // Calculate the coordinates of the projection
    const projection = {
        x: dot1.x + scalarProjection * lineVector.x,
        y: dot1.y + scalarProjection * lineVector.y,
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

