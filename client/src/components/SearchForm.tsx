import { useState } from "react";
import PinIcon from "./PinIcon";
import DotsIcon from "./DotsIcon";
import ChangeArrowsIcon from "./ChangeArrowsIcon";
import Search from "./Search";
import { RoomSearch } from "../logic/interfaces/RoomSearch";
import GoShareButtons from "./GoShareButtons";

const DEFAULT_START_ID: string = "main_entrance";
const DEFAULT_START_NAME: string = "entrance";


type Prop = {
  roomSearcher: RoomSearch;
  initialSearchInputs: SearchInputs;
}

export type SearchInputs = {
  startNodeId: string,
  startText: string,
  destinationNodeId: string,
  destinationText: string,
}

function SearchForm({ roomSearcher, initialSearchInputs }: Prop) {
  const [searchInputs, setSearchInputs] = useState<SearchInputs>(initialSearchInputs);
  const [showShareDiv, setShowShareDiv] = useState(false);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);

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
                        onDropdownVisibilityChange={visible => setSearchDropdownVisible(visible)}
                        initialInputValue={searchInputs.startText ?? ""}
                        placeholder={DEFAULT_START_NAME}
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
                      onDropdownVisibilityChange={visible => setSearchDropdownVisible(visible)}
                      initialInputValue={searchInputs.destinationText ?? ""}
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
                    if (!searchDropdownVisible) {
                      setSearchInputs((prevInputs: SearchInputs) => {
                        let nextDestinationId: string;
                        let nextDestinationText: string;
                        if (prevInputs.startNodeId === undefined) {
                          nextDestinationId = DEFAULT_START_ID;
                          nextDestinationText = DEFAULT_START_NAME;
                        } else {
                          nextDestinationId = prevInputs.startNodeId;
                          nextDestinationText = prevInputs.startText;
                        }

                        return {
                          startNodeId: prevInputs.destinationNodeId,
                          startText: prevInputs.destinationText,
                          destinationNodeId: nextDestinationId,
                          destinationText: nextDestinationText,
                        }
                      });
                    }
                  }}
                >
                  <ChangeArrowsIcon/>
                </button>
              </div>

          </div>
          
          {/* <div className="flex relative py-3 items-center justify-center z-0">
            <HCIGoButtons 
                startNodeId={searchInputs.startNodeId} 
                destinationNodeId={searchInputs.destinationNodeId}
                startText={searchInputs.startText} 
                destinationText={searchInputs.destinationText}
                clickable={searchInputs.destinationNodeId != undefined && !searchDropdownVisible}
                defaultStartNodeId={DEFAULT_START_ID}
            />
          </div> */}

          <div className="flex relative py-3 items-center justify-center z-0">
            <GoShareButtons 
                startNodeId={searchInputs.startNodeId} 
                destinationNodeId={searchInputs.destinationNodeId}
                startText={searchInputs.startText} 
                destinationText={searchInputs.destinationText}
                handleShare ={handleShare}
                showShareDiv={showShareDiv}
                clickable={searchInputs.destinationNodeId != undefined && !searchDropdownVisible}
                defaultStartNodeId={DEFAULT_START_ID}
            />
          </div>

        </form>
     
    </div>

  );
}

export default SearchForm;
