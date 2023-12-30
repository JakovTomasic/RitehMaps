
export function round(num: number, decimalPlaces: number = 0): number {
    const decimalDivider = 10**decimalPlaces;
    return Math.round(num * decimalDivider) / decimalDivider;
}

export function radiansToDegrees(radAngle: number): number {
    return radAngle * (180.0 / Math.PI);
};