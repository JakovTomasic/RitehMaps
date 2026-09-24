import { useState, useRef, useEffect } from "react";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";
import { scrollIntoViewOnceKeyboardOpens } from "../utils/SoftKeyboard";
import ClearIcon from "./ClearIcon";

type Prop = {
  roomSearcher: (searchedText: string) => SearchNodeSuggestion[];
  onSelection: (selectedNode: SearchNodeSuggestion | null) => void;
  onDropdownVisibilityChange: (isDropdownVisible: boolean) => void;
  initialInputValue: string;
  placeholder: string;
}

function Search({ roomSearcher, onSelection, onDropdownVisibilityChange, initialInputValue, placeholder }: Prop) {

  const [inputValue, setInputValue] = useState(initialInputValue);
  const [showDropdown, internalSetShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<SearchNodeSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    
    if (inputValue === "") {
      setDropdownOptions([]);
      setShowDropdown(false);
      onSelection(null);
    } else {
      const sortedSuggestions = roomSearcher(inputValue);
      setDropdownOptions(sortedSuggestions);
      setShowDropdown(true);
    }
  };

  const handleClearClick = () => {
    setInputValue("");
    setDropdownOptions([]);
    setShowDropdown(false);
    onSelection(null);
    inputRef.current?.focus();
  };

  /** Keeps the field (and the room the suggestions drop into) above the phone's soft keyboard. */
  const handleFocus = () => {
    if (searchRef.current != null) {
      scrollIntoViewOnceKeyboardOpens(searchRef.current);
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
            onSelection(null);
            setInputValue("");
          }
        }
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown, inputValue]);
  

  return (
    <div className="relative" ref={searchRef}>
      <input
        ref={inputRef}
        type="text"
        className="w-full pl-3 pr-9 py-2 border
                  border-gray-300 rounded-md
                  focus:outline-none focus:border-cyan-600"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />

      {inputValue !== "" && (
        <button
          type="button"
          aria-label="Clear"
          className="absolute right-0 top-0 h-full px-2.5 flex items-center
                     text-gray-400 hover:text-gray-700"
          onClick={handleClearClick}
        >
          <ClearIcon />
        </button>
      )}

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
