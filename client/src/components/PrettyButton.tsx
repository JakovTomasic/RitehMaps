import React, { useState } from 'react';
import rotatingButton from "../images/rotatingButton.png";
import Image from "next/image";

export default function PrettyButton() {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (

    <button
      className={`flex items-center justify-center w-10 h-10 rounded-full 
      bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 transform ${isHovering ? 'rotate-45' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        <Image
          src={rotatingButton}
          alt="Button image"
          className="w-full h-full object-cover"
        />
    </button>
    
  );
}
