import React, { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';
import { round } from '../utils/Math';
import { CentroidScale } from '../types/navigation/CentroidScale';
import { MapDrawElement } from '../types/map_draw_elements/MapDrawElement';
import { MapDot } from '../types/map_draw_elements/MapDot';
import { MapPathLine } from '../types/map_draw_elements/MapPathLine';

type Prop = {
    layoutImage: string;
    width: number;
    height: number;
    centroidCrop: CentroidScale;
    rotateAngle: number;
    drawElements: MapDrawElement[];
    enableDrawNodes?: boolean;
    enableZoom?: boolean;
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
            console.log(`ABSOLUTE x: ${clickedX},\nABSOLUTE y: ${clickedY},`);
            console.log(`width: ${width},\nheight: ${height},`);

            svg.append("circle")
            .attr("cx", clickedX)
            .attr("cy", clickedY)
            .attr("r", dotRadiusRelative)
            .attr("fill","#41C7F7")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1.5)

        })
    }

    private coordinatesOverlap(x1, x2, y1, y2): boolean{
        return ((round(x1, 2) != round(x2, 2)) || (round(y1, 2) != round(y2, 2)))
    }

    private drawElements(){

        const svg = d3.select(this.mapRef)

        this.props.drawElements.forEach((element, index) => {

            if(element instanceof MapDot){
                svg.append("circle")
                .attr("cx", `${element.dot.x}%`)
                .attr("cy", `${element.dot.y}%`)
                .attr("r", `${element.radius}%`)
                .attr("fill", element.color)
                .attr("stroke-opacity", element.opacity)
            }

            if(element instanceof MapPathLine){

                var checkCoords = this.coordinatesOverlap(element.line.dot1.x, element.line.dot2.x, 
                    element.line.dot1.y, element.line.dot2.y)
                
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
                    .style("fill", "#06B6D4")

                    svg.append("line")
                    .attr("x1", `${element.line.dot1.x}%`)
                    .attr("y1", `${element.line.dot1.y}%`)
                    .attr("x2", `${element.line.dot2.x}%`)
                    .attr("y2", `${element.line.dot2.y}%`)
                    .style("stroke", element.color)
                    .style("stroke-width", `${element.width}%`)
                    .attr("marker-start", "url(#triangle)")
                }
            }
        })

    }


    componentDidMount() {

        this.drawMap()
        if (this.props.enableDrawNodes == true)
            this.drawNodesOnClick()
        this.drawElements()
    }

    componentDidUpdate(prevProps: Readonly<Prop>) {

        if(prevProps.layoutImage != this.props.layoutImage){
            d3.selectAll("image").remove().exit()
            this.drawMap()
        }
        
        d3.selectAll("circle").remove().exit()
        d3.selectAll("line").remove().exit()
        d3.selectAll("marker").remove().exit()
        this.drawElements()
    }

    render() {

        return(
            <ZoomableSVG width={this.props.width} height={this.props.height} 
                centroidCrop={this.props.centroidCrop} rotateAngle={this.props.rotateAngle} 
                enableZoom={this.props.enableZoom}
            >
                <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>
                    
                </svg>
            </ZoomableSVG>
        )
    }

}