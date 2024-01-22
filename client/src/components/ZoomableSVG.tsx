import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { CentroidScale } from '../types/navigation/CentroidScale';
import { rotatePointClockwise } from '../utils/Geometry';
import ParentResizeListener from './ParentResizeListener';

// TODO: add this to prop!
const RADIUS = 100;
const CENTER_X = 100;
const CENTER_Y = -200;

type Prop = {
    children: any
    width: number
    height: number
    centroidCrop: CentroidScale
    rotateAngle: number
    enableZoom?: boolean
}

function moveXToCenter(x: number, width: number, viewportWidth: number): number {

}

export default function ZoomableSVG( { children, width, height, centroidCrop, rotateAngle, enableZoom }: Prop ){

    const svgRef = useRef();
    const [scale, setScale] = useState(1);
    const [x, setX] = useState(RADIUS);
    const [y, setY] = useState(RADIUS);
    const [visibleWidth, setVisibleWidth] = useState(0);
    const [visibleHeight, setVisibleHeight] = useState(0);

    if(!enableZoom){
        d3.select(svgRef.current).on(".zoom", null);
        // TODO: what do these lines do?
        width = centroidCrop.scaledWidth;
        height = centroidCrop.scaledHeight;
    }

    useEffect(() => {
        // setScale(1);
        // setScale(width / RADIUS);
        // setX(0);
        // setY(0);
    }, [enableZoom]);

    useEffect(() => {
        if(enableZoom){
            const zoom = d3.zoom().on("zoom", (event) => {
                const { x, y, k } = event.transform;
                const rotatedPoint = rotatePointClockwise({x: x, y: y}, rotateAngle, {x: width/2, y: height/2});
                setScale(k);
                setX(rotatedPoint.x / k);
                setY(rotatedPoint.y / k);
                console.log("xy %d %d", rotatedPoint.x / k, rotatedPoint.y / k);
            });

            d3.select(svgRef.current).call(zoom);
        } else {
            // setX(centroidCrop.translateX);
            // setY(centroidCrop.translateY);
            // setScale(centroidCrop.stepScale);
        }
    }, [centroidCrop, enableZoom]);
    
    function onSvgResize(svgWidth: number, svgHeight: number) {
        const aspectRatio = svgWidth / svgHeight;

        const zoomForWidth = width / RADIUS / 2;
        const zoomForHeight = width / aspectRatio / RADIUS / 2;
        const zoomForWhichBothWidthAndHeightCanFit = Math.min(zoomForWidth, zoomForHeight);

        setScale(zoomForWhichBothWidthAndHeightCanFit);
        const scaleDifference = zoomForWhichBothWidthAndHeightCanFit / scale;
        setX(x / scaleDifference);
        setY(y / scaleDifference);

        setVisibleWidth(width / zoomForWhichBothWidthAndHeightCanFit);
        setVisibleHeight(width / aspectRatio / zoomForWhichBothWidthAndHeightCanFit);
        console.log("xy %d %d", x / scaleDifference, y / scaleDifference);
        console.log("wh %d %d", width / zoomForWhichBothWidthAndHeightCanFit, width / aspectRatio / zoomForWhichBothWidthAndHeightCanFit);
    }

    return (
        <div className="w-full h-full">
            <svg height="100%" width="100%" ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}>
                <g transform={`rotate(${rotateAngle}, ${width/2}, ${height/2})translate(${(x + (visibleWidth - RADIUS*2)/2)*scale}, ${(y + Math.max(0, visibleHeight - RADIUS*2)/2)*scale})scale(${scale})`}>
                    {children}
                </g>
            </svg>
            <ParentResizeListener onResize={onSvgResize} />
        </div>
    )
}
