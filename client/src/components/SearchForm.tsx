import React, { useState, useEffect } from "react";
import PinIcon from "./PinIcon";
import DotsIcon from "./DotsIcon";
import ChangeArrowsIcon from "./ChangeArrowsIcon";
import Search from "./Search";
import { RoomSearch } from "../logic/interfaces/RoomSearch";
import GoShareButtons from "./GoShareButtons";
import { useRouter } from "next/router";

type Prop = {
  roomSearcher: RoomSearch;
}

type SearchInputs = {
  startNodeId: string,
  startText: string,
  destinationNodeId: string,
  destinationText: string,
}

function SearchForm({ roomSearcher }: Prop) {
  const router = useRouter();
  const [searchInputs, setSearchInputs] = useState<SearchInputs>({
    startNodeId: undefined,
    startText: "",
    destinationNodeId: undefined,
    destinationText: "",
  });
  const [showShareDiv, setShowShareDiv] = useState(false);

  useEffect(() => {
    if(router.isReady){
      
      const data = router.query;
      setSearchInputs({
        startNodeId: data.startNodeId as string,
        destinationNodeId: data.endNodeId as string,
        startText: data.startText as string,
        destinationText: data.destinationText as string,
      });
    }
  }, [router.isReady]);

  const handleShare = () => {
    setShowShareDiv(!showShareDiv);
  };

  return (

    <div className="flex items-center w-96">
      
        <form className="mx-auto bg-white p-2 w-full">

          {/*div that contains sideDecoration (pins and dots, change arrows) and search inputs*/}
          <div className="flex items-center h-full w-full justify-center" >

            <div className="w-1px h-full flex flex-col items-center justify-center px-2 flex-grow-1 pt-3">    
              <PinIcon color="start" />
              <DotsIcon/>
              <PinIcon color="destination" />
            </div>


            <div className="flex flex-col items-center w-64">
              
              <div className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Where are you now?
                  </label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                      <Search 
                        roomSearcher={roomSearcher.sortedSuggestionsForStart}
                        onSelection={(selectedNode) => {
                          setSearchInputs((prevInputs: SearchInputs) => {
                            return {
                              ...prevInputs,
                              startNodeId: selectedNode?.nodeId,
                              startText: selectedNode?.roomName
                            }
                          });
                        }}
                        initialInputValue= {searchInputs.startText != null ? searchInputs.startText : ""}
                        placeholder={"entrance"}
                      />
                    </label> 
                  </div>

              </div>

                <div className="mb-4 py-1 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Where do you want to go?
                  </label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                    <Search 
                      roomSearcher={roomSearcher.sortedSuggestionsForDestination}
                      onSelection={(selectedNode) => {
                        setSearchInputs((prevInputs: SearchInputs) => {
                          return {
                            ...prevInputs,
                            destinationNodeId: selectedNode?.nodeId,
                            destinationText: selectedNode?.roomName
                          }
                        });
                      }}
                      initialInputValue= {searchInputs.destinationText != null ? searchInputs.destinationText : ""}
                      placeholder={"Search"}
                    />
                    </label> 
                  </div>

                </div>

            </div>

              <div className="w-1px items-center justify-center pl-1 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchInputs((prevInputs: SearchInputs) => {
                      return {
                        startNodeId: prevInputs.destinationNodeId,
                        startText: prevInputs.destinationText,
                        destinationNodeId: prevInputs.startNodeId,
                        destinationText: prevInputs.startText,
                      }
                    });
                  }}
                >
                  <ChangeArrowsIcon/>
                </button>
              </div>

          </div>
          
          <div className="flex relative py-3 items-center justify-center z-0">
            <GoShareButtons 
                startNodeId={searchInputs.startNodeId} 
                destinationNodeId={searchInputs.destinationNodeId}
                startText={searchInputs.startText} 
                destinationText={searchInputs.destinationText}
                handleShare ={handleShare}
                showShareDiv={showShareDiv} 
            />
          </div>

        </form>
     
    </div>

  );
}

export default SearchForm;

