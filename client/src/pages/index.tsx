import { useState } from "react";
import HCIGoButtons from "../components/HCIGoButtons";
import Navbar from "../components/Navbar";
import { allGraphData } from "../data/AllGraphData";
import { NodesContainerImpl } from "../logic/impl/NodesContainerImpl";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";
import { Link } from "wouter";
import { createNavigationLink } from "./navigation";


// TODO: remove this file after HCI testing

const practice = [
  {
    label: "Floors",
    path: "/navigation-floor-by-floor",
    start: "main_entrance",
    destination: "p1",
    destinationText: "P1",
  },
  {
    label: "Steps",
    path: "/navigation-step-by-step",
    start: "p1",
    destination: "I8",
    destinationText: "I8",
  },
  {
    label: "Steps Forward",
    path: "/navigation-step-by-step-forward",
    start: "I8",
    destination: "0-30",
    destinationText: "0-30",
  },
  {
    label: "Compass",
    path: "/navigation-compass",
    start: "0-30",
    destination: "main_entrance",
    destinationText: "Glavni ulaz",
  },
];

const destinations = [
  {
    start: "main_entrance",
    destination: "1-19",
    destinationText: "1-19",
  },
  {
    start: "1-19",
    destination: "L14",
    destinationText: "L14",
  },
  {
    start: "L14",
    destination: "1-116",
    destinationText: "1-116",
  },
  {
    start: "1-116",
    destination: "2-102",
    destinationText: "2-102",
  },
  {
    start: "2-102",
    destination: "U9",
    destinationText: "U9",
  },
  {
    start: "U9",
    destination: "3-06",
    destinationText: "3-06",
  },
  {
    start: "3-06",
    destination: "1-65",
    destinationText: "1-65",
  },
  {
    start: "1-65",
    destination: "canteen",
    destinationText: "Menza",
  },
];

type SearchInputs = {
  startNodeId: string,
  startText: string,
  destinationNodeId: string,
  destinationText: string,
}

export default function Home() {
  const nodesContainer = new NodesContainerImpl(allGraphData.nodes);
  const roomSearch = new RoomSearchImpl(nodesContainer);

  const [searchInputs, setSearchInputs] = useState<SearchInputs>({
    startNodeId: undefined,
    startText: "",
    destinationNodeId: undefined,
    destinationText: "",
  });

  const enabledButtonStyle: string =
    "mx-2 p-3 rounded-md flex items-center justify-center mr-1" +
    " bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-100" +
    " text-white text-sm font-bold";

  return (

    <div className="fixed h-full w-full bg-red flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">

        <div className="flex w-fit items-center justify-center mb-24">
          {/* {practice.map((prac, index) =>
            <Link
            key={index}
            href={{
              pathname: prac.path,
              query: {
                startNodeId: prac.start,
                endNodeId: prac.destination,
                destinationName: prac.destinationText,
              },
            }}
            style={{display: 'contents'}}
            >
            <button className={enabledButtonStyle} type="button">
              { `Practice ${prac.label}` }
            </button>
            </Link>
          )} */}
          <Link href={createNavigationLink("main_entrance", "1-19", "fin 1-19")}>
            <button className={enabledButtonStyle} type="button">
              { `Practice` }
            </button>
          </Link>
        </div>
        <div className="flex w-fit items-center justify-center mb-5">
          {destinations.slice(0, 4).map((dest, index) =>
            <button className={enabledButtonStyle} onClick={() => {
              setSearchInputs({
                  startNodeId: dest.start,
                  startText: dest.start,
                  destinationNodeId: dest.destination,
                  destinationText: dest.destinationText,
              });
            }}>
              { `Cilj ${index + 1}` }
            </button>
          )}
        </div>
        <div className="flex w-fit items-center justify-center mb-8">
          {destinations.slice(4, 8).map((dest, index) =>
            <button className={enabledButtonStyle} onClick={() => {
              setSearchInputs({
                  startNodeId: dest.start,
                  startText: dest.start,
                  destinationNodeId: dest.destination,
                  destinationText: dest.destinationText,
              });
            }}>
              { `Cilj ${index + 5}` }
            </button>
          )}
        </div>
        <div className="py-3 items-center justify-center z-0">
          <HCIGoButtons
              startNodeId={searchInputs.startNodeId} 
              destinationNodeId={searchInputs.destinationNodeId}
              startText={searchInputs.startText} 
              destinationText={searchInputs.destinationText}
              clickable={searchInputs.destinationNodeId != undefined}
              defaultStartNodeId={""}
          />
        </div>
      </div>

    </div>

  );
}
