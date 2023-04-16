import prizemlje_gl from "../images/prizemlje_gl.svg";
import * as d3 from "d3";
import React, { useRef, useState, useEffect } from "react";



function ZoomableSVG({ children, width, height }) {

    const svgRef = useRef();
    const [k, setK] = useState(1);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    useEffect(() => {
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setK(k);
        setX(x);
        setY(y);
      });
      d3.select(svgRef.current).call(zoom)
    }, []);
    return (
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${x},${y})scale(${k})`}>{children}</g>
      </svg>
    );
  }



function DrawMap() {
    
    const mapRef = useRef()
    let nodes = []

    useEffect(() => {

        //Adding image to svg element
        const svgElement = d3.select(mapRef.current)
        .append("image")
        .attr("xlink:href", prizemlje_gl.src)
        .attr("width", 450)
        .attr("height", 300)  

        //Adding nodes on click event
        const svg = d3.select(mapRef.current)
        svg.on("click", function(event) {

            console.log(d3.pointer(event))

            nodes.push(d3.pointer(event))

            svg.append("circle")
            .attr("cx", d3.pointer(event)[0])
            .attr("cy", d3.pointer(event)[1])
            .attr("r", 1.5)
            .attr("fill","blue")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1.5)

            //connecting two nodes
            if(nodes.length > 1){

                svg.append("line")
                .attr("x1", nodes[0][0])
                .attr("y1", nodes[0][1])
                .attr("x2", nodes[1][0])
                .attr("y2", nodes[1][1])
                .style("stroke", "#41C7F7")
                .style("stroke-width", 0.5)
                .attr("stroke-linecap", "round")
                .attr("stroke-opacity", 0.6)
            }
        })
        
        

      }, [])
    
      

    return (
        <>
            <div className="overflow-hidden whitespace-no-wrap h-full w-full border">
                <div className="inline-block">
                    <ZoomableSVG width={400} height={300}>
                        <svg ref={mapRef} width={700} height={300}>
                            
                        </svg>
                    </ZoomableSVG>
                </div>
            </div>
        </>
    );
    

}

export default DrawMap;