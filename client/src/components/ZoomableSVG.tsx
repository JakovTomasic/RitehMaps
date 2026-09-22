import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { CentroidScale } from '../types/navigation/CentroidScale';
import { rotatePointClockwise } from '../utils/Geometry';

type Prop = {
    children: any
    width: number
    height: number
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


export default function ZoomableSVG( { children, width, height, centroidCrop, rotateAngle, enableZoom }: Prop ){

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

        if (!enableZoom) {
            svg.on(".zoom", null)
            setTransform({ x: translateX, y: translateY, scale: stepScale })
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
                const rotatedPoint = rotatePointClockwise({x: x, y: y}, rotateAngleRef.current, {x: width/2, y: height/2})
                setTransform({ x: rotatedPoint.x, y: rotatedPoint.y, scale: k })
            })

        svg.call(zoom)
        // LLM says d3 remembers the last transform on the node, so a previous zoom session (or step) would
        // otherwise come back the moment the user touches the map.
        svg.call(zoom.transform, d3.zoomIdentity)

        return () => { svg.on(".zoom", null) }

    }, [translateX, translateY, stepScale, enableZoom, width, height])

    return (
        <svg height="100%" width="100%" ref={svgRef} viewBox={`0, 0, ${viewBoxWidth}, ${viewBoxHeight}`}>
            <g transform={`rotate(${rotateAngle}, ${viewBoxWidth/2}, ${viewBoxHeight/2})`
                + `translate(${transform.x}, ${transform.y})scale(${transform.scale})`}>
                {children}
            </g>
        </svg>
    )
}
