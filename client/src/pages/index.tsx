import Navbar from "../components/Navbar";
import SearchForm, { SearchInputs } from "../components/SearchForm";
import { AllMapsData } from "../data/ServerData";
import { NodesContainerImpl } from "../logic/impl/NodesContainerImpl";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";
import { RoomSearch } from "../logic/interfaces/RoomSearch";
import { useSearchParams } from "../utils/React";

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
  const params = resolveMissingTexts(parseParams(searchParams), roomSearch);

  return (

    <div className="fixed h-full w-full bg-gray-50 flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
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
 * A url can carry a node id without the room name shown in the input.
 * In such case, a name is looked up so the form still fills in.
 */
function resolveMissingTexts(searchInputs: SearchInputs, roomSearch: RoomSearch): SearchInputs {
    return {
      ...searchInputs,
      startText: searchInputs.startText ?? roomNameOf(searchInputs.startNodeId, roomSearch),
      destinationText: searchInputs.destinationText ?? roomNameOf(searchInputs.destinationNodeId, roomSearch),
    };
}

function roomNameOf(nodeId: string | undefined, roomSearch: RoomSearch): string | undefined {
    return nodeId != undefined ? roomSearch.findRoomByNodeId(nodeId)?.roomName : undefined;
}