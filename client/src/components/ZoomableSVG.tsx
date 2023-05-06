import React, { Component, useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function ZoomableSVG( { children } ){

    const svgRef = useRef()
    const [scale, setScale] = useState(1)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        const zoom = d3.zoom().on("zoom", (event) => {
            const { x, y, k } = event.transform
            setScale(k)
            setX(x)
            setY(y)
        })

        d3.select(svgRef.current).call(zoom)
    }, [])


    return (
        <svg ref={svgRef} width="100%" height="100%">
            <g transform={`translate(${x},${y})scale(${scale})`}>{children}</g>
        </svg>
    )
}
