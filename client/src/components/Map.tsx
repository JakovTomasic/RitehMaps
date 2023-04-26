import React, { Component, useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';


export default class Map extends Component{

    mapRef!: SVGSVGElement

    private ZoomableSVG( { children, width, height } ){

        const svgRef = useRef()
        const [k, setK] = useState(1)
        const [x, setX] = useState(0)
        const [y, setY] = useState(0)

        useEffect(() => {
            const zoom = d3.zoom().on("zoom", (event) => {
                const { x, y, k } = event.transform
                setK(k)
                setX(x)
                setY(y)
            })

            d3.select(svgRef.current).call(zoom)
        }, [])


        return (
            <svg ref={svgRef} width={width} height={height}>
                <g transform={`translate(${x},${y})scale(${k})`}>{children}</g>
            </svg>
        )
    }

    private drawMap(){

        const svgElement = d3.select(this.mapRef)
        .append("image")
        .attr("xlink:href", "/submaps/main_floor_0.svg")
        .attr("width", 450)
        .attr("height", 300)  

    }


    private drawNodesOnClick(){

        const svg = d3.select(this.mapRef)
        svg.on("click", function(event) {

            console.log(d3.pointer(event))

            svg.append("circle")
            .attr("cx", d3.pointer(event)[0])
            .attr("cy", d3.pointer(event)[1])
            .attr("r", 1.5)
            .attr("fill","blue")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1.5)

        })
    }

    private connectNodes( {x1, y1, x2, y2} ){

        const svg = d3.select(this.mapRef)

        svg.append("circle")
        .attr("cx", x1)
        .attr("cy", y1)
        .attr("r", 1.5)
        .attr("fill","blue")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)

        svg.append("circle")
        .attr("cx", x2)
        .attr("cy", y2)
        .attr("r", 1.5)
        .attr("fill","blue")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)

        svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .style("stroke", "#41C7F7")
        .style("stroke-width", 0.5)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.6)

    }


    componentDidMount() {
        
        this.drawMap()
        this.drawNodesOnClick()
        this.connectNodes({x1: 170, y1: 165, x2: 212, y2: 165})
    }

    render() {

        return(
            <>
                <div className="overflow-hidden whitespace-no-wrap h-full w-full border">
                    <div className="inline-block">
                        <this.ZoomableSVG width={400} height={300}>
                            <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef} width={700} height={300}>
                                
                            </svg>
                        </this.ZoomableSVG>
                    </div>
                </div>
            </>
        )
    }

}