import Navbar from "../components/Navbar";
import SearchForm, { SearchInputs } from "../components/SearchForm";
import { AllMapsData } from "../data/ServerData";
import { NodesContainerImpl } from "../logic/impl/NodesContainerImpl";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";
import { useSearchParams } from "../utils/React";

export const SEARCH_PATH = "/";
const START_NODE_ID_PARAM_KEY = "startId";
const START_NODE_TEXT_PARAM_KEY = "startText";
const END_NODE_ID_PARAM_KEY = "endId";
const END_NODE_TEXT_PARAM_KEY = "endText";

export function createHomeUrl(startId?: string, startText?: string, endId?: string, endText?: string): string {
    let object: Record<string, string> = {};
    if (startId != undefined && startId.length > 0) {
      object[START_NODE_ID_PARAM_KEY] = startId;
    }
    if (startText != undefined && startText.length > 0) {
      object[START_NODE_TEXT_PARAM_KEY] = startText;
    }
    if (endId != undefined && endId.length > 0) {
      object[END_NODE_ID_PARAM_KEY] = endId;
    }
    if (endText != undefined && endText.length > 0) {
      object[END_NODE_TEXT_PARAM_KEY] = endText;
    }
    const params = new URLSearchParams(object).toString()
    return `${SEARCH_PATH}?${params}`;
}

type Props = {
  allMapData: AllMapsData,
}

export default function Home(props: Props) {
  const nodesContainer = new NodesContainerImpl(props.allMapData.nodes);
  const roomSearch = new RoomSearchImpl(nodesContainer, props.allMapData.professors, props.allMapData.nodes);

  const searchParams = useSearchParams();
  const params = parseParams(searchParams);

  return (

    <div className="fixed h-full w-full bg-white flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <SearchForm roomSearcher={roomSearch} initialSearchInputs={params} />
      </div>

    </div>

  );
}

function parseParams(searchParams: URLSearchParams): SearchInputs {
    return {
      startNodeId: searchParams.get(START_NODE_ID_PARAM_KEY)!!,
      startText: searchParams.get(START_NODE_TEXT_PARAM_KEY)!!,
      destinationNodeId: searchParams.get(END_NODE_ID_PARAM_KEY)!!,
      destinationText: searchParams.get(END_NODE_TEXT_PARAM_KEY)!!,
    };
}