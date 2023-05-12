import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import { RoomSearchImpl } from "../logic/impl/RoomSearchImpl";

export default function Home() {
  const roomSearch = new RoomSearchImpl();
  
  return (

    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <SearchForm roomSearcher={roomSearch} />
      </div>

    </div>

  );
}
