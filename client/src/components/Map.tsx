import React, { Component } from 'react';
import * as d3 from 'd3';
import ZoomableSVG from './ZoomableSVG';
import { NavigationStep } from '../types/navigation/NavigationStep';

type Prop = {
    layoutImage: string
    enableDrawNodes?: boolean
    width: number
    height: number
    navStep: NavigationStep
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

    private connectNodes(){

        const svg = d3.select(this.mapRef)

        this.props.navStep.nodes.map((node) => {

            svg.append("circle")
            .attr("cx", node.xCoordinate)
            .attr("cy", node.yCoordinate)
            .attr("r", dotRadiusRelative)
            .attr("fill","#41C7F7")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 150)

        })

        svg.append("line")
        .attr("x1", this.props.navStep.nodes[0].xCoordinate)
        .attr("y1", this.props.navStep.nodes[0].yCoordinate)
        .attr("x2", this.props.navStep.nodes[1].xCoordinate)
        .attr("y2", this.props.navStep.nodes[1].yCoordinate)
        .style("stroke", "#41C7F7")
        .style("stroke-width", lineStrokeWidthRelative)
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.6)
                      
    }


    componentDidMount() {

        this.drawMap()
        if (typeof this.props.enableDrawNodes !== 'undefined')
            this.drawNodesOnClick()
        this.connectNodes()
    }

    componentDidUpdate(prevProps: Readonly<Prop>) {

        if(prevProps.layoutImage != this.props.layoutImage){
            d3.selectAll("image").remove().exit()
            this.drawMap()
            d3.selectAll("circle").remove().exit()
            d3.selectAll("line").remove().exit()
            this.connectNodes()
        }
        else{
            d3.selectAll("line").remove().exit()
            this.connectNodes()
        }
    }


    render() {
    
        return(
            <div>
                <div className="w-full h-full border max-w-3xl mx-auto" style={{aspectRatio: this.props.width / this.props.height}}>
                    <ZoomableSVG>
                        <svg ref={(mapRef: SVGSVGElement) => this.mapRef = mapRef}>
                            
                        </svg>
                    </ZoomableSVG>
                </div>
            </div>
        )
    }

}