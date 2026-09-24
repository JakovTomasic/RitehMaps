import { useState } from "react";
import AboutDialog from "../components/AboutDialog";
import LanguageToggle from "../components/LanguageToggle";
import Navbar from "../components/Navbar";
import SearchForm, { SearchInputs } from "../components/SearchForm";
import { useTranslations } from "../i18n";
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
  const t = useTranslations();
  const nodesContainer = new NodesContainerImpl(props.allMapData.nodes);
  const roomSearch = new RoomSearchImpl(nodesContainer, props.allMapData.professors, props.allMapData.nodes, t);

  const searchParams = useSearchParams();
  const params = resolveTexts(parseParams(searchParams), roomSearch);

  const visibleViewport = useVisibleViewport();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (

    /*
      The page fills what is visible rather than the whole window, so the form re-centers into
      the strip above the soft keyboard instead of being buried under it. Once the keyboard
      leaves too little room for the form, this is also the element that scrolls.
    */
    <div
      className="fixed left-0 w-full bg-gray-50 flex flex-col items-center overflow-y-auto"
      style={{ height: visibleViewport.height, top: visibleViewport.offsetTop }}
    >
      <Navbar />

      {/* The padding clears the navbar (about 55px), which this page draws behind. */}
      <div className="w-full shrink-0 flex justify-end px-3 pt-16">
        <LanguageToggle />
      </div>

      <div className="flex flex-col w-full flex-1 items-center justify-center pt-4">
        <SearchForm roomSearcher={roomSearch} initialSearchInputs={params} />
      </div>

      {/*
        In the flow rather than pinned, so once the soft keyboard leaves too little room it is
        pushed out of the visible strip and stays reachable by scrolling - the form keeps the space.
      */}
      <button
        className="self-start shrink-0 mb-1 ml-2 px-2 py-1 text-sm text-gray-400 underline
                   transition hover:text-gray-600"
        onClick={() => setAboutOpen(true)}
        type="button"
      >
        {t.home.about}
      </button>

      { aboutOpen && <AboutDialog close={() => setAboutOpen(false)} /> }

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