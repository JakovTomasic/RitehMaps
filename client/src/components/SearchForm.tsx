import { useState } from "react";
import PinIcon from "./PinIcon";
import DotsIcon from "./DotsIcon";
import ChangeArrowsIcon from "./ChangeArrowsIcon";
import Search from "./Search";
import { RoomSearch } from "../logic/interfaces/RoomSearch";
import GoShareButtons from "./GoShareButtons";
import NearestToiletButtons from "./NearestToiletButtons";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";
import { isSpecialSearchResultId, specialSearchResultName } from "../data/SpecialSearchResults";
import { useTranslations } from "../i18n";

const DEFAULT_START_ID: string = "main_entrance";
/**
 * The name that node carries in the map data. Not translated, and not the same thing as the
 * placeholder: this one goes into a field as a picked room, so it has to be a name the search
 * can find again.
 */
const DEFAULT_START_NAME: string = "entrance";


type Prop = {
  roomSearcher: RoomSearch;
  initialSearchInputs: SearchInputs;
}

export type SearchInputs = {
  startNodeId: string | undefined,
  startText: string | undefined,
  destinationNodeId: string | undefined,
  destinationText: string | undefined,
}

function SearchForm({ roomSearcher, initialSearchInputs }: Prop) {
  const t = useTranslations();
  const [searchInputs, setSearchInputs] = useState<SearchInputs>(initialSearchInputs);
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false);
  /**
   * Bumped to remount the destination field. It only picks up a new text when the text it was given
   * changes, so picking the same shortcut twice (after typing over it) would otherwise leave the
   * typed text sitting next to the shortcut's id.
   */
  const [destinationFieldGeneration, setDestinationFieldGeneration] = useState(0);

  function selectDestination(destination: SearchNodeSuggestion | null) {
    setSearchInputs((prevInputs: SearchInputs) => {
      return {
        ...prevInputs,
        destinationNodeId: destination?.nodeId,
        destinationText: destination?.roomName,
      }
    });
  }

  const swapDisabled = isSpecialSearchResultId(searchInputs.destinationNodeId);

  // A room keeps the name the map data gives it, whatever language the ui is in, but "nearest
  // toilet" and friends are named by the app - so that one is read again rather than kept, and
  // switching language on this screen doesn't leave the old language sitting in the field.
  const destinationText = specialSearchResultName(searchInputs.destinationNodeId, t)
    ?? searchInputs.destinationText;

  return (

    <div className="flex items-center w-full max-w-96 px-4">

        <form className="mx-auto bg-white p-5 w-full rounded-2xl shadow-md border border-gray-100">

          {/*div that contains sideDecoration (pins and dots, change arrows) and search inputs*/}
          <div className="flex items-center h-full w-full justify-center" >

            <div className="w-1px h-full flex flex-col items-center justify-center px-2 flex-grow-1 pt-3">    
              <PinIcon color="start" />
              <DotsIcon/>
              <PinIcon color="destination" />
            </div>


            <div className="flex flex-col items-center w-full min-w-0">
              
              <div className="mb-4 py-1 w-full">
                  <label className="block text-gray-600 text-sm font-semibold mb-1.5">
                    {t.search.startLabel}
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
                        placeholder={t.search.startPlaceholder}
                      />
                    </label> 
                  </div>

              </div>

                <div className="py-1 w-full">
                  <label className="block text-gray-600 text-sm font-semibold mb-1.5">
                    {t.search.destinationLabel}
                  </label>

                  <div className="flex items-center">
                    <label className="relative right-0 text-gray-500 focus-within:text-gray-700 w-full">
                    <Search
                      key={destinationFieldGeneration}
                      roomSearcher={roomSearcher.sortedSuggestionsForDestination}
                      onSelection={selectDestination}
                      onDropdownVisibilityChange={visible => setSearchDropdownVisible(visible)}
                      initialInputValue={destinationText ?? ""}
                      placeholder={t.search.destinationPlaceholder}
                    />
                    </label>
                  </div>

                </div>

            </div>

              <div className="w-1px items-center justify-center pl-1 pt-3">
                {/*
                  "Nearest toilet" and similar mean "whichever is closest to the start", so they
                  can't become the start themselves - the swap is off while one is the destination.
                */}
                <button
                  type="button"
                  aria-label={t.search.swap}
                  disabled={swapDisabled}
                  className={swapDisabled ? "opacity-40 cursor-not-allowed" : ""}
                  onClick={() => {
                    if (!searchDropdownVisible) {
                      setSearchInputs((prevInputs: SearchInputs) => {
                        let nextDestinationId: string;
                        let nextDestinationText: string | undefined;
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

          {/*
            Hangs off the destination field rather than standing on its own: the paddings are the
            widths of the pin and swap columns, so it lines up with the inputs.
          */}
          <div className="pl-10 pr-7">
            <NearestToiletButtons
              selectedDestinationId={searchInputs.destinationNodeId}
              enabled={!searchDropdownVisible}
              onPick={(destination) => {
                selectDestination(destination);
                setDestinationFieldGeneration((generation) => generation + 1);
              }}
            />
          </div>

          <div className="flex relative mt-3 pt-4 border-t border-gray-100 items-center justify-center z-0">
            <GoShareButtons
                startNodeId={searchInputs.startNodeId}
                destinationNodeId={searchInputs.destinationNodeId}
                startText={searchInputs.startText}
                destinationText={destinationText}
                clickable={searchInputs.destinationNodeId != undefined && !searchDropdownVisible}
                defaultStartNodeId={DEFAULT_START_ID}
            />
          </div>

        </form>
     
    </div>

  );
}

export default SearchForm;
