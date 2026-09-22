import { CentroidScale } from "../../types/navigation/CentroidScale";
import { NavigationStep } from "../../types/navigation/NavigationStep";
import { MapCropper } from "../interfaces/MapCropper";
import { getNodeBounds, getStepWithRotatedNodes, rotateRelativePointClockwise } from "./graph/Utils";

/** A crop shows the whole map at the very least - below 1 it would only add empty space around it. */
const MIN_ROTATION_PROOF_SCALE = 1;
/** Leaves a bit of map visible around the step instead of ending the view right on top of it. */
const ROTATION_PROOF_MARGIN = 0.9;
/**
 * How much wider than its usual crop a step may be shown so that turning the map doesn't push it
 * out of view.
 *
 * These floor plans are more than three times as wide as they are tall, and so is the view cut out
 * of them - so a corridor that fits across it comfortably needs the whole floor plan's worth of
 * room the moment it is turned upright. Backing out that far turns the map into a diagram nobody
 * can walk with, so past this much the step is allowed to run off the view instead, the way the
 * road ahead does in any other navigation app.
 */
const MAX_ROTATION_ZOOM_OUT = 1.5;

export class MapCropperImpl implements MapCropper{

    // TODO: remove rotateAngle
    crop(navigationStep: NavigationStep, width: number, height: number, rotateAngle: number): CentroidScale {
        return this.cropWithScale(navigationStep, width, height, rotateAngle, scale => scale);
    }

    cropForAnyRotation(navigationStep: NavigationStep, width: number, height: number): CentroidScale {
        return this.cropWithScale(navigationStep, width, height, 0, (scale, stepWidth, stepHeight) => {
            // In compass mode the map keeps turning under a view that stays the same shape, so a
            // step only stays inside it as long as the circle it spins in does - and that circle
            // is as wide as the step's diagonal.
            const diameter = Math.sqrt(
                (stepWidth*width/100)**2 + (stepHeight*height/100)**2
            );
            const fittingScale = diameter <= 0
                ? scale
                : Math.min(width, height) * ROTATION_PROOF_MARGIN / diameter;
            // Fit the whole step in when that is cheap, and settle for a step that reaches past
            // the edges when it isn't - see MAX_ROTATION_ZOOM_OUT.
            return Math.max(
                Math.min(scale, fittingScale),
                scale / MAX_ROTATION_ZOOM_OUT,
                MIN_ROTATION_PROOF_SCALE,
            );
        });
    }

    private cropWithScale(
        navigationStep: NavigationStep,
        width: number,
        height: number,
        rotateAngle: number,
        adjustScale: (scale: number, stepWidth: number, stepHeight: number) => number,
    ): CentroidScale {
        const rotatedStep = getStepWithRotatedNodes(navigationStep, width, height, rotateAngle);
        const {minX, minY, maxX, maxY} = getNodeBounds(rotatedStep.nodes);

        let centroidX = minX + (maxX - minX)/2;
        let centroidY = minY + (maxY - minY)/2;

        const rotatedCentroid = rotateRelativePointClockwise(
            {x: centroidX, y: centroidY},
            -rotateAngle,
            width,
            height
        );

        centroidX = rotatedCentroid.x;
        centroidY = rotatedCentroid.y;

        const stepScale = adjustScale(
            Math.min(this.getStepScale(maxX - minX, maxY - minY), 5),
            maxX - minX,
            maxY - minY,
        );

        const scaledWidth = width/stepScale;
        const scaledHeight = height/stepScale;

        const translateX = -1*centroidX*width/100 + scaledWidth/2;
        const translateY = -1*centroidY*height/100 + scaledHeight/2;

        return {translateX, translateY, stepScale, scaledWidth, scaledHeight};
    }

    private getStepScale(width: number, height: number): number {
        const MIN_SCALE = 2;
        const MAX_SCALE = 10;

        const scaleWithoutMargins = Math.min(100/width, 100/height);
        const marginfactor = 0.9;
        const calculatedScale = scaleWithoutMargins * marginfactor;
        return Math.min(Math.max(calculatedScale, MIN_SCALE), MAX_SCALE);
    }
}
