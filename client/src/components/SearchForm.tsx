import React from "react";
import PinIcon from "./PinIcon";
import DotsIcon from "./DotsIcon";
import Select from "./Search";
import ChangeArrowsIcon from "./ChangeArrowsIcon";

function SearchForm() {
  return (

    <div className="flex items-center w-96">
      
        <form id="searchForm" className="mx-auto bg-white p-2 w-full">

          {/*div that contains sideDecoration (pins and dots, change arrows) and search inputs*/}
          <div className="flex items-center h-full w-full justify-center" >

            <div id="sideDecorationDiv" className="w-1px h-full flex flex-col items-center justify-center px-2 flex-grow-1 pt-2">    
              <PinIcon color="start" />
              <DotsIcon/>
              <PinIcon color="destination" />
            </div>


            <div id="searchInputsDiv" className="flex flex-col items-center w-64">
              
              <div id="searchDiv" className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Where are you now?</label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                      <Select/>
                      {/*<SearchIcon  />*/}
                    </label> 
                  </div>

                </div>

                <div id="searchDiv" className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Where do you want to go?</label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                      <Select/>
                      {/*<SearchIcon  />*/}
                    </label> 
                  </div>

                </div>

              </div>

              <div id="sideDecorationDiv" className="w-1px items-center justify-center pl-1 pt-1">    
              <ChangeArrowsIcon/>
              </div>

            </div>
          
          {/*div that contains button*/}
          <div id="buttonDiv" className="py-3">
            <button className="mx-auto bg-cyan-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-300 flex items-center justify-center" type="submit">Go</button>
          </div>

        </form>
     
    </div>

  );
}

export default SearchForm;
