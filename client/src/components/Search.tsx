import React, { useState, useRef, useEffect } from "react";
import { SearchNodeSuggestion } from "../types/SearchNodeSuggestion";

type Prop = {
  roomSearcher: (searchedText: string) => SearchNodeSuggestion[];
}

function Search({ roomSearcher }: Prop) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const searchRef = useRef(null);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const sortedSuggestions = roomSearcher(inputValue);
    
    setDropdownOptions(sortedSuggestions.map((suggestion) => suggestion.roomName));

    setShowDropdown(true);
  };

  const handleDropdownOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Function to handle clicks outside the search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        className="w-full px-3 py-2 border 
                  border-gray-300 rounded-md focus:outline-none focus:border-cyan-600"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
      />

      {showDropdown && dropdownOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white rounded-b-md shadow-lg">
          {dropdownOptions.map((option) => (
            <div
              key={option}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
