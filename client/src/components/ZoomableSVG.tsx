import React, { useRef, useState, useEffect } from 'react';
import { NavigationStep } from '../types/navigation/NavigationStep';
import * as d3 from 'd3';
import { MapCropperImpl } from '../logic/impl/MapCropperImpl';

type Prop = {
    children: any
    width: number
    height: number
    navStep?: NavigationStep
    enableZoom?: boolean
}


export default function ZoomableSVG( { children, width, height, navStep, enableZoom }: Prop ){


    const svgRef = useRef()
    const [scale, setScale] = useState(1)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)


    if(enableZoom == true){

        useEffect(() => {
            const zoom = d3.zoom().on("zoom", (event) => {
                const { x, y, k } = event.transform
                setScale(k)
                setX(x)
                setY(y)
            })

            d3.select(svgRef.current).call(zoom)
        }, [])
        
    }
    else{
        const mapCropper = new MapCropperImpl()
        const centroidCrop = mapCropper.crop(navStep, width, height)

        width = centroidCrop.scaledWidth
        height = centroidCrop.scaledHeight

        useEffect(() => {
            setX(centroidCrop.translateX)
            setY(centroidCrop.translateY)
            setScale(centroidCrop.stepScale)
        }, [centroidCrop])
    }

    return (
        <svg ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}>
            <g transform={`translate(${x},${y})scale(${scale})`}>{children}</g>
        </svg>
    )
}
