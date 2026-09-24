import Navbar from "../components/Navbar";
import SearchForm, { SearchInputs } from "../components/SearchForm";
import { AllMapsData } from "../data/ServerData";
import { NodesContainerImpl } from "../logic/impl/NodesContainerImpl";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";
import { RoomSearch } from "../logic/interfaces/RoomSearch";
import { useSearchParams } from "../utils/React";
import { useVisibleViewport } from "../utils/SoftKeyboard";

export const SEARCH_PATH = "/";
const START_NODE_ID_PARAM_KEY = "startId";
const START_NODE_TEXT_PARAM_KEY = "startText";
const END_NODE_ID_PARAM_KEY = "endId";
const END_NODE_TEXT_PARAM_KEY = "endText";

/** The search form keeps no state between visits - the url is what carries its values around. */
export function createHomeUrl(searchInputs?: SearchInputs): string {
    let object: Record<string, string> = {};
    addParamIfNotEmpty(object, START_NODE_ID_PARAM_KEY, searchInputs?.startNodeId);
    addParamIfNotEmpty(object, START_NODE_TEXT_PARAM_KEY, searchInputs?.startText);
    addParamIfNotEmpty(object, END_NODE_ID_PARAM_KEY, searchInputs?.destinationNodeId);
    addParamIfNotEmpty(object, END_NODE_TEXT_PARAM_KEY, searchInputs?.destinationText);
    const params = new URLSearchParams(object).toString()
    return `${SEARCH_PATH}?${params}`;
}

function addParamIfNotEmpty(object: Record<string, string>, key: string, value?: string) {
    if (value != undefined && value.length > 0) {
      object[key] = value;
    }
}

type Props = {
  allMapData: AllMapsData,
}

export default function Home(props: Props) {
  const nodesContainer = new NodesContainerImpl(props.allMapData.nodes);
  const roomSearch = new RoomSearchImpl(nodesContainer, props.allMapData.professors, props.allMapData.nodes);

  const searchParams = useSearchParams();
  const params = resolveTexts(parseParams(searchParams), roomSearch);

  const visibleViewport = useVisibleViewport();

  return (

    /*
      The page fills what is visible rather than the whole window, so the form re-centers into
      the strip above the soft keyboard instead of being buried under it. Once the keyboard
      leaves too little room for the form, this is also the element that scrolls
      (`my-auto` instead of `items-center` - auto margins center without clipping the overflow).
    */
    <div
      className="fixed left-0 w-full bg-gray-50 flex justify-center overflow-y-auto"
      style={{ height: visibleViewport.height, top: visibleViewport.offsetTop }}
    >
      <Navbar />

      <div className="flex flex-col justify-center items-center my-auto py-4">
        <SearchForm roomSearcher={roomSearch} initialSearchInputs={params} />
      </div>

    </div>

  );
}

function parseParams(searchParams: URLSearchParams): SearchInputs {
    return {
      startNodeId: searchParams.get(START_NODE_ID_PARAM_KEY) ?? undefined,
      startText: searchParams.get(START_NODE_TEXT_PARAM_KEY) ?? undefined,
      destinationNodeId: searchParams.get(END_NODE_ID_PARAM_KEY) ?? undefined,
      destinationText: searchParams.get(END_NODE_TEXT_PARAM_KEY) ?? undefined,
    };
}

/**
 * A url carries an id plus the name it was searched by, and the name is never taken at face value:
 * the id is looked up and the map data's own spelling fills the input, so a shared link shows the
 * room it actually leads to. A url with no id is left alone - that text selects nothing, it is just
 * what someone typed into the box.
 * This fixes security concerns where someone could inject any string as the destination name in the url.
 */
function resolveTexts(searchInputs: SearchInputs, roomSearch: RoomSearch): SearchInputs {
    return {
      ...searchInputs,
      startText: nameOf(searchInputs.startNodeId, searchInputs.startText, roomSearch),
      destinationText: nameOf(searchInputs.destinationNodeId, searchInputs.destinationText, roomSearch),
    };
}

function nameOf(nodeId: string | undefined, name: string | undefined, roomSearch: RoomSearch): string | undefined {
    return nodeId != undefined ? roomSearch.findSuggestionById(nodeId, name)?.roomName : name;
}