import React, { useState, useRef, useEffect } from "react";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";
import { useRouter } from "next/router";
import { RoomSearch } from "../logic/interfaces/RoomSearch";

type Prop = {
  roomSearcher: RoomSearch;
  onSelection: (selectedId: string) => void;
  flag: number; //start or destination search
}

function Search({ roomSearcher, onSelection, flag }: Prop) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<SearchNodeSuggestion[]>([]);
  const searchRef = useRef(null);


  useEffect(() => {
    if(router.isReady){
      
      const data = router.query;
      if(flag==0) {
        if(data.startNodeId as string != null) {
          const foundSuggestion = roomSearcher.findRoomByNodeId(data.startNodeId as string);
          setInputValue(foundSuggestion.roomName);
        }
      }
      if(flag==1) {
        if(data.endNodeId as string != null) {
          setInputValue(roomSearcher.findRoomByNodeId(data.endNodeId as string).roomName);
        }
      }
    }
  }, [router.isReady]);
  
  const handleInputChange =  (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    
    if (inputValue === "") {
      setDropdownOptions([]);
      setShowDropdown(false); 
    } else {
      const sortedSuggestions = roomSearcher.sortedSuggestionsForStart(inputValue);
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
                  border-gray-300 rounded-md 
                  focus:outline-none focus:border-cyan-600"
        placeholder={flag==0 ? "entrance" : "Search"}

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
