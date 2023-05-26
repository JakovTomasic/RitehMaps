import Image from "next/image";
import logo from "/public/images/logo.png";
import PrettyButton from "./PrettyButton";

const Navbar = () => {
  return (

    <nav className="bg-gray-400 fixed top-0 w-full py-2 px-5">

        <div className="flex justify-between">

          <div className="flex items-center">
            {/*Button that leads to settings*/}
            <a href="/" className="font-bold text-white text-xl">
           <PrettyButton/>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <a href="/" className="flex items-center font-bold text-l  text-white hover:text-gray-200">
                <Image src={logo} alt="logo" width={50} className="mr-1" />
                Riteh maps
            </a>
          </div>

          <div className="flex items-center">
            <a href="#" className="px-3 py-1 text-white hover:text-gray-200">
                Map
            </a>
          </div>

        </div>

    </nav>

  );
};

export default Navbar;
