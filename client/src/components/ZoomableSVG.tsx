import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { CentroidScale } from '../types/navigation/CentroidScale';

type Prop = {
    children: any
    width: number
    height: number
    centroidCrop: CentroidScale
    enableZoom?: boolean
}


export default function ZoomableSVG( { children, width, height, centroidCrop, enableZoom }: Prop ){


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

        width = centroidCrop.scaledWidth
        height = centroidCrop.scaledHeight

        useEffect(() => {
            setX(centroidCrop.translateX)
            setY(centroidCrop.translateY)
            setScale(centroidCrop.stepScale)
        }, [centroidCrop])
    }

    return (
        <svg height="100%" width="100%" ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}>
            <g transform={`translate(${x},${y})scale(${scale})`}>{children}</g>
        </svg>
    )
}
