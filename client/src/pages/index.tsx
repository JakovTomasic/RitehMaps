import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import {getProfessorData} from "../scripts/ProfessorDataScraper";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Navbar />

      <div className="flex flex-col justify-center items-center">
        <SearchForm />
      </div>

    </div>

  );
}
