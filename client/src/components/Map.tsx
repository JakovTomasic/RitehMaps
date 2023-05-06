import React, { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';

type Prop = {
    layoutImage: string
    enableDrawNodes?: boolean
}


export default class Map extends Component<Prop>{

    mapRef!: SVGSVGElement

    private drawMap(){

        const svgElement = d3.select(this.mapRef)
        .attr("viewBox", [0, 0, 100, 50])
        .append("image")
        .attr("xlink:href", this.props.layoutImage)
        .attr("width", "100%")
        .attr("height", "100%")  
    }

    private drawNodesOnClick(){

        const svg = d3.select(this.mapRef)
        svg.on("click", function(event) {

            console.log(d3.pointer(event))

            svg.append("circle")
            .attr("cx", d3.pointer(event)[0])
            .attr("cy", d3.pointer(event)[1])
            .attr("r", 0.7)
            .attr("fill","#41C7F7")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1.5)

        })
    }

    private connectNodes( {x1, y1, x2, y2} ){

        const svg = d3.select(this.mapRef)

        svg.append("circle")
        .attr("cx", x1)
        .attr("cy", y1)
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", "0%")
        .attr("cy", "0%")
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", "0%")
        .attr("cy", "100%")
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", "100%")
        .attr("cy", "0%")
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", "100%")
        .attr("cy", "100%")
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", x2)
        .attr("cy", y2)
        .attr("r", 0.7)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 1.5)
        .classed("animate-pulse", true)

        svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .style("stroke", "#41C7F7")
        .style("stroke-width", 0.3)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.6)

    }


    componentDidMount() {

        this.drawMap()
        if (typeof this.props.enableDrawNodes !== 'undefined')
            this.drawNodesOnClick()
        this.connectNodes({x1: 50, y1: 20, x2: 60, y2: 30})
    }

    render() {
    
        return(
            <>
                <div className="w-full h-full border">
                    <ZoomableSVG>
                        <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>
                            
                        </svg>
                    </ZoomableSVG>
                </div>
            </>
        )
    }

}