import React from "react";
import PinIcon from "./PinIcon";
import DotsIcon from "./DotsIcon";
import Search from "./Search";
import ChangeArrowsIcon from "./ChangeArrowsIcon";
import Link from "next/link";

const data = {
	startNodeId: 0,
	endNodeId: 1
}

function SearchForm() {
  return (

    <div className="flex items-center w-96">
      
        <form className="mx-auto bg-white p-2 w-full">

          {/*div that contains sideDecoration (pins and dots, change arrows) and search inputs*/}
          <div className="flex items-center h-full w-full justify-center" >

            <div className="w-1px h-full flex flex-col items-center justify-center px-2 flex-grow-1 pt-2">    
              <PinIcon color="start" />
              <DotsIcon/>
              <PinIcon color="destination" />
            </div>


            <div className="flex flex-col items-center w-64">
              
              <div className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Where are you now?</label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                      <Search/>
                    </label> 
                  </div>

              </div>

                <div className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Where do you want to go?</label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                      <Search/>
                    </label> 
                  </div>

                </div>

            </div>

              <div className="w-1px items-center justify-center pl-1 pt-1">    
              <ChangeArrowsIcon/>
              </div>

          </div>
          
          <div className="py-3">
            <Link 
                href={{
                  pathname: "/navigation",
                  query: data 
                }}
            >
              <button className="mx-auto py-2 px-4 rounded-md flex items-center justify-center
                      bg-cyan-600 hover:bg-cyan-700 transition duration-300
                      text-white text-sm font-bold" 
                  type="submit">
              Go
              </button>
            </Link>
          </div>

        </form>
     
    </div>

  );
}

export default SearchForm;
