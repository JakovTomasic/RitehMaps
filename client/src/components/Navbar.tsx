import { Link } from "wouter";
import { MAP_PATH } from "../pages/map";
import logo from "/public/images/logo.png";
import { useTranslations } from "../i18n";

const Navbar = () => {
  const t = useTranslations();

  return (

    <nav className="bg-white fixed top-0 w-full py-2.5 px-5 shadow-sm z-20">

        <div className="flex items-center justify-between">

          <a href="/" className="flex items-center font-bold text-lg text-gray-800 hover:text-cyan-700 transition">
              <img src={logo} alt="logo" width={42} className="mr-2" />
              Riteh maps
          </a>

          <Link href={MAP_PATH}>
            <button className="px-3 py-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-800 hover:bg-cyan-50 rounded-md transition">
                {t.navbar.map}
            </button>
          </Link>

        </div>

    </nav>

  );
};

export default Navbar;
