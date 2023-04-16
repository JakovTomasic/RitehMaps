import React from "react";

function SearchIcon() {
  return (

    <svg
      className="absolute h-8 w-8 text-black top-1/2 transform -translate-y-1/2 right-0 p-1"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </svg>
    
  );
}

export default SearchIcon;
