import React, { useState, useRef, useEffect } from "react";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";

type Prop = {
  roomSearcher: (searchedText: string) => SearchNodeSuggestion[];
  onSelection: (selectedNode: SearchNodeSuggestion | null) => void;
  onDropdownVisibilityChange: (isDropdownVisible) => void;
  initialInputValue: string;
  placeholder: string;
}

function Search({ roomSearcher, onSelection, onDropdownVisibilityChange, initialInputValue, placeholder }: Prop) {

  const [inputValue, setInputValue] = useState(initialInputValue);
  const [showDropdown, internalSetShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<SearchNodeSuggestion[]>([]);
  const searchRef = useRef(null);
  
  function setShowDropdown(show: boolean) {
    internalSetShowDropdown(show);
    onDropdownVisibilityChange(show);
  }

  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    onSelection(null);
    
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
    onSelection(option)
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (showDropdown && searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);

        if (inputValue != null) {
          const suggestions = roomSearcher(inputValue);
          if (suggestions.length == 1) {
            const autoSelectedNode = suggestions[0];
            onSelection(autoSelectedNode);
            setInputValue(autoSelectedNode.roomName);
          } else {
            setInputValue("");
          }
        }
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, [inputValue]);
  

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        className="w-full px-3 py-2 border 
                  border-gray-300 rounded-md 
                  focus:outline-none focus:border-cyan-600"
        placeholder={placeholder}
        value={inputValue} 
        onChange={handleInputChange}
      />

      {showDropdown && dropdownOptions.length > 0 && (
        <div className="absolute z-10 w-full max-h-48 overflow-y-auto
                       bg-white rounded-b-md shadow-lg">
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
