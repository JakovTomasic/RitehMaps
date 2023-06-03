import React, { useState, useRef, useEffect } from "react";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";

type Prop = {
  roomSearcher: (searchedText: string) => SearchNodeSuggestion[];
  onSelection: (selectedId: string) => void;
}

function Search({ roomSearcher, onSelection }: Prop) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<SearchNodeSuggestion[]>([]);

  const searchRef = useRef(null);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    
    if (inputValue === "") {
      setDropdownOptions([]);
      setShowDropdown(false); 
    } else {
      const sortedSuggestions = roomSearcher(inputValue);
      setDropdownOptions(sortedSuggestions);
      setShowDropdown(true);
    }
  };

  const handleDropdownOptionClick = (option: SearchNodeSuggestion) => {
    setInputValue(option.roomName);
    setShowDropdown(false);
    onSelection(option.nodeId)
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
              key={option.roomName}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownOptionClick(option)}
            >
              {option.roomName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
