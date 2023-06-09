import React, { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';
import { NavigationStep } from '../types/navigation/NavigationStep';
import { round } from '../utils/Math';
import { CentroidScale } from '../types/navigation/CentroidScale';

type Prop = {
    layoutImage: string
    enableDrawNodes?: boolean
    width: number
    height: number
    navStep: NavigationStep
    centroidCrop: CentroidScale
    enableZoom?: boolean
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

        const width = this.props.width;
        const height = this.props.height;

        const svg = d3.select(this.mapRef)
        svg.on("click", function(event) {

            const clickedX = d3.pointer(event)[0];
            const clickedY = d3.pointer(event)[1];

            const relativeX = round(clickedX / width * 100, 2);
            const relativeY = round(clickedY / height * 100, 2);

            console.log(`x: ${relativeX},\ny: ${relativeY},`);

            svg.append("circle")
            .attr("cx", clickedX)
            .attr("cy", clickedY)
            .attr("r", dotRadiusRelative)
            .attr("fill","#41C7F7")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1.5)

        })
    }

    private checkCoordinates(x1, x2, y1, y2): boolean{
        return ((round(x1, 2) != round(x2, 2)) || (round(y1, 2) != round(y2, 2)))
    }

    private connectNodes(){

        var prevNodeX
        var prevNodeY

        const svg = d3.select(this.mapRef)
        this.props.navStep?.nodes.forEach((node, index) => {

            svg.append("circle")
            .attr("cx", `${node.xCoordinate}%`)
            .attr("cy", `${node.yCoordinate}%`)
            .attr("r", dotRadiusRelative)
            .attr("fill","#41C7F7")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 150)

            if(index > 0){

                var checkCoords = this.checkCoordinates(prevNodeX, node.xCoordinate, prevNodeY, node.yCoordinate)

                if(checkCoords){
                    svg.append("marker")
                    .attr("id", "triangle")
                    .attr("refX", -10)
                    .attr("refY", 6)
                    .attr("markerWidth", 30)
                    .attr("markerHeight", 30)
                    .attr("markerUnits","userSpaceOnUse")
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M 0 0 12 6 0 12 3 6")
                    .style("fill", "#06B6D4");

                    svg.append("line")
                    .attr("x1", `${prevNodeX}%`)
                    .attr("y1", `${prevNodeY}%`)
                    .attr("x2", `${node.xCoordinate}%`)
                    .attr("y2", `${node.yCoordinate}%`)
                    .style("stroke", "#41C7F7")
                    .style("stroke-width", lineStrokeWidthRelative)
                    .attr("stroke-linecap", "round")
                    .attr("stroke-opacity", 0.6)
                    .attr("marker-start", "url(#triangle)")
                }
            }

            prevNodeX = node.xCoordinate
            prevNodeY = node.yCoordinate
        })
    }


    componentDidMount() {

        this.drawMap()
        if (this.props.enableDrawNodes == true)
            this.drawNodesOnClick()
        this.connectNodes()
    }

    componentDidUpdate(prevProps: Readonly<Prop>) {

        if(prevProps.layoutImage != this.props.layoutImage){
            d3.selectAll("image").remove().exit()
            this.drawMap()
        }
        
        d3.selectAll("circle").remove().exit()
        d3.selectAll("line").remove().exit()
        d3.selectAll("marker").remove().exit()
        this.connectNodes()
    }

    render() {

        return(
            <ZoomableSVG width={this.props.width} height={this.props.height} 
                centroidCrop={this.props.centroidCrop} enableZoom={this.props.enableZoom}>
                <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>
                    
                </svg>
            </ZoomableSVG>
        )
    }

}