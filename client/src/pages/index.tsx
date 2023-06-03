import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import { allGraphData } from "../data/AllGraphData";
import { NodesContainerImpl } from "../logic/impl/NodesContainerImpl";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";

export default function Home() {
  const nodesContainer = new NodesContainerImpl(allGraphData.nodes);
  const roomSearch = new RoomSearchImpl(nodesContainer);
  
  return (

    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <SearchForm roomSearcher={roomSearch} />
      </div>

    </div>

  );
}
