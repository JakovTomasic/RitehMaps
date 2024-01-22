import React, { useRef, useState, useEffect } from 'react';
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


export default function ZoomableSVG( { children, width, height, centroidCrop, rotateAngle, enableZoom }: Prop ){


    const svgRef = useRef()
    const [scale, setScale] = useState(1)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    if(!enableZoom){
        d3.select(svgRef.current).on(".zoom", null)
        width = centroidCrop.scaledWidth
        height = centroidCrop.scaledHeight
    }

    useEffect(() => {
        setScale(1)
        setX(0)
        setY(0)
    }, [enableZoom])

    useEffect(() => {
        if(enableZoom){          
            const zoom = d3.zoom().on("zoom", (event) => {
                const { x, y, k } = event.transform
                const rotatedPoint = rotatePointClockwise({x: x, y: y}, rotateAngle, {x: width/2, y: height/2})
                setScale(k)
                setX(rotatedPoint.x)
                setY(rotatedPoint.y)
            })

            d3.select(svgRef.current).call(zoom)           
        }
        else{
            setX(centroidCrop.translateX)
            setY(centroidCrop.translateY)
            setScale(centroidCrop.stepScale)        
        }
    }, [centroidCrop, enableZoom])
    
    return (
        <svg height="100%" width="100%" ref={svgRef} viewBox={`0, 0, ${width}, ${height}`}>
            <g transform={`rotate(${rotateAngle}, ${width/2}, ${height/2})translate(${x}, ${y})scale(${scale})`}>
                {children}
            </g>
        </svg>
    )
}
