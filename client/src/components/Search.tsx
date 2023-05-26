import React, { useState } from "react";

function Search() {

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([
    "canteen",
    "I5",
    "I7",
    "P1",
    "P2",
    "wc"
  ]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleDropdownOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  const filteredOptions = dropdownOptions.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (

    <div className="relative">
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-600"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
      />
      {showDropdown && (

        <div className="absolute z-10 w-full bg-white rounded-b-md shadow-lg">
          {filteredOptions.map((option) => (

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
