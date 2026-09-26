import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { CentroidScale } from '../types/navigation/CentroidScale';
import { rotatePointClockwise } from '../utils/Geometry';

type Prop = {
    children: any
    centroidCrop: CentroidScale
    rotateAngle: number
    enableZoom?: boolean
}

type Transform = {
    x: number,
    y: number,
    scale: number,
}

/**
 * The viewBox is the cropped map, so this shows the whole submap fitted into it - the view
 * free zooming starts from, and the one d3's own zoom transform starts at.
 */
const NEUTRAL_TRANSFORM: Transform = { x: 0, y: 0, scale: 1 };

/**
 * Zoom limits, as multiples of the default zoom level (scale 1 = the whole map visible, see
 * NEUTRAL_TRANSFORM). Below 1 the map gets smaller than the view, above 1 it's zoomed in - so
 * MIN_ZOOM_SCALE = 1 means the user can never zoom out past the whole floor.
 */
const MIN_ZOOM_SCALE = 1;
const MAX_ZOOM_SCALE = 16;

/** A pan is a vector, so it is turned around the origin and not around some point on the map. */
const ROTATION_ORIGIN = { x: 0, y: 0 };


export default function ZoomableSVG( { children, centroidCrop, rotateAngle, enableZoom }: Prop ){

    const svgRef = useRef<SVGSVGElement>(null)
    const [transform, setTransform] = useState<Transform>(NEUTRAL_TRANSFORM)

    // Read inside the zoom handler through a ref: in compass mode the angle changes many times a
    // second, and having the effect below depend on it would re-install the zoom behaviour - and
    // reset the user's zoom to identity - just as often.
    const rotateAngleRef = useRef(rotateAngle)
    rotateAngleRef.current = rotateAngle

    const viewBoxWidth = centroidCrop.scaledWidth
    const viewBoxHeight = centroidCrop.scaledHeight

    const { translateX, translateY, stepScale } = centroidCrop;

    // Depends on the crop values rather than on the centroidCrop object: the object is rebuilt on
    // every render of the parent, and re-running this would throw away the user's zoom mid-gesture.
    useEffect(() => {

        const svg = d3.select<SVGSVGElement, unknown>(svgRef.current!)

        const clampedTransform = (transform: Transform) => clamp(transform, viewBoxWidth, viewBoxHeight)

        if (!enableZoom) {
            svg.on(".zoom", null)
            setTransform(clampedTransform({ x: translateX, y: translateY, scale: stepScale }))
            return
        }

        // With zooming on the user drives the transform, starting from the whole map - applying the
        // step crop here instead would show a zoomed in map that snaps back on the first gesture,
        // because d3 keeps its own transform and knows nothing about the crop.
        setTransform(NEUTRAL_TRANSFORM)

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([MIN_ZOOM_SCALE, MAX_ZOOM_SCALE])
            .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
                const { x, y, k } = event.transform
                // The pan gets turned back into map coordinates.
                const rotatedPan = rotatePointClockwise({x: x, y: y}, rotateAngleRef.current, ROTATION_ORIGIN)
                setTransform(clampedTransform({ x: rotatedPan.x, y: rotatedPan.y, scale: k }))
            })

        svg.call(zoom)
        // LLM says d3 remembers the last transform on the node, so a previous zoom session (or step) would
        // otherwise come back the moment the user touches the map.
        svg.call(zoom.transform, d3.zoomIdentity)

        return () => { svg.on(".zoom", null) }

    }, [translateX, translateY, stepScale, enableZoom, viewBoxWidth, viewBoxHeight])

    return (
        <svg height="100%" width="100%" ref={svgRef} viewBox={`0, 0, ${viewBoxWidth}, ${viewBoxHeight}`}>
            <g transform={`rotate(${rotateAngle}, ${viewBoxWidth/2}, ${viewBoxHeight/2})`
                + `translate(${transform.x}, ${transform.y})scale(${transform.scale})`}>
                {children}
            </g>
        </svg>
    )
}

/**
 * Keeps the middle of the view on the map, so it can never be panned off the screen entirely.
 */
function clamp(transform: Transform, viewBoxWidth: number, viewBoxHeight: number): Transform {
    return {
        ...transform,
        x: clampValue(transform.x, viewBoxWidth/2 - viewBoxWidth*transform.scale, viewBoxWidth/2),
        y: clampValue(transform.y, viewBoxHeight/2 - viewBoxHeight*transform.scale, viewBoxHeight/2),
    }
}

function clampValue(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}
