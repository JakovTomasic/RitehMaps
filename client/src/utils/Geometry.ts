

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