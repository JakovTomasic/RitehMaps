import { type } from "os";
import React, { useState, useEffect, useRef } from "react";

type Prop = {
  // This function will be called on initialization
  onResize: (width: number, height: number) => void;
}

export default function ParentResizeListener( { onResize }: Prop ) {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
  
    // useRef allows us to "store" the div in a constant, 
    // and to access it via observedDiv.current
    const observedDiv = useRef(null);
  
    useEffect(() => {
      if (!observedDiv.current) {
        // we do not initialize the observer unless the ref has
        // been assigned
        return;
      }
  
      // we also instantiate the resizeObserver and we pass
      // the event handler to the constructor
      const resizeObserver = new ResizeObserver(() => {
        if(observedDiv.current.offsetWidth !== width) {
          setWidth(observedDiv.current.offsetWidth); 
        }
        if(observedDiv.current.offsetHeight !== height) {
          setHeight(observedDiv.current.offsetHeight);
        }
        onResize(observedDiv.current.offsetWidth, observedDiv.current.offsetHeight);
      });
      
      onResize(observedDiv.current.offsetWidth, observedDiv.current.offsetHeight);

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain observedDiv.current will contain
      // the div we want to observe
      resizeObserver.observe(observedDiv.current);
  
  
      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect();
      }
    },
    // only update the effect if the ref element changed
    [observedDiv.current])
  
    return (
      <div className="w-full h-full" ref={observedDiv}>
       {/* <p>Block width: {width}, height: {height} </p> */}
      </div>
    )
}
