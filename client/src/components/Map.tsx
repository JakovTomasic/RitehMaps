import React, { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';
import { GraphImpl } from '../logic/impl/GraphImpl';
import { Graph } from '../logic/interfaces/Graph';
import { MapNode } from '../types/graph/MapNode';

type Prop = {
    layoutImage: string
    enableDrawNodes?: boolean
    width: number
    height: number
}

const dotRadiusRelative: String = "0.5%"
const lineStrokeWidthRelative: String = "0.1%"

export default class Map extends Component<Prop>{

    mapRef!: SVGSVGElement

    private drawMap(){

        const svgElement = d3.select(this.mapRef)
        .attr("viewBox", [0, 0, this.props.width, this.props.height])
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
            .attr("r", dotRadiusRelative)
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
        .attr("r", dotRadiusRelative)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 150)
        .classed("animate-pulse", true)

        // svg.append("circle")
        // .attr("cx", "0%")
        // .attr("cy", "0%")
        // .attr("r", dotRadiusRelative)
        // .attr("fill","#41C7F7")
        // .attr("stroke-opacity", 1)
        // .attr("stroke-width", 150)
        // .classed("animate-pulse", true)

        // svg.append("circle")
        // .attr("cx", "0%")
        // .attr("cy", "100%")
        // .attr("r", dotRadiusRelative)
        // .attr("fill","#41C7F7")
        // .attr("stroke-opacity", 1)
        // .attr("stroke-width", 150)
        // .classed("animate-pulse", true)

        // svg.append("circle")
        // .attr("cx", "100%")
        // .attr("cy", "0%")
        // .attr("r", dotRadiusRelative)
        // .attr("fill","#41C7F7")
        // .attr("stroke-opacity", 1)
        // .attr("stroke-width", 150)
        // .classed("animate-pulse", true)

        // svg.append("circle")
        // .attr("cx", "50%")
        // .attr("cy", "50%")
        // .attr("r", dotRadiusRelative)
        // .attr("fill","#41C7F7")
        // .attr("stroke-opacity", 1)
        // .attr("stroke-width", 150)
        // .classed("animate-pulse", true)

        // svg.append("circle")
        // .attr("cx", "100%")
        // .attr("cy", "100%")
        // .attr("r", dotRadiusRelative)
        // .attr("fill","#41C7F7")
        // .attr("stroke-opacity", 1)
        // .attr("stroke-width", 150)
        // .classed("animate-pulse", true)

        svg.append("circle")
        .attr("cx", x2)
        .attr("cy", y2)
        .attr("r", dotRadiusRelative)
        .attr("fill","#41C7F7")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 150)
        .classed("animate-pulse", true)

        svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .style("stroke", "#41C7F7")
        .style("stroke-width", lineStrokeWidthRelative)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.6)

    }


    componentDidMount() {

        this.drawMap()
        if (typeof this.props.enableDrawNodes !== 'undefined')
            this.drawNodesOnClick()
        
        let startNode = "aaa";
        let graph = new GraphImpl();
        this.recursiveWholeGraph(startNode, graph, new Set())
    }

    // TODO: this is just for testing. Remove this or extract it as a testing tool.
    recursiveWholeGraph(currentNodeId: string, graph: Graph, visited: Set<string>) {
        let currentNode: MapNode = graph.getNode(currentNodeId);
        graph.getNeighbours(currentNodeId).forEach(element => {
            if (!visited.has(element.neighbour.id)) {
                visited.add(element.neighbour.id)

                let neighbourNode = graph.getNode(element.neighbour.id)

                this.connectNodes({
                    x1: `${currentNode.xCoordinate}%`,
                    y1: `${currentNode.yCoordinate}%`,
                    x2: `${neighbourNode.xCoordinate}%`,
                    y2: `${neighbourNode.yCoordinate}%`,
                })

                this.recursiveWholeGraph(element.neighbour.id, graph, visited)
            }
        });
    }

    render() {
    
        return(
            <div>
                {/* TODO: remove red background */}
                <div className="w-full h-full border bg-red-600" style={{aspectRatio: this.props.width / this.props.height}}>
                    <ZoomableSVG>
                        <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>
                            
                        </svg>
                    </ZoomableSVG>
                </div>
            </div>
        )
    }

}