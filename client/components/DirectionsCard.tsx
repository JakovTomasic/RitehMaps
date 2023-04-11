import Image from "next/image";
import up_right from "../images/up-right.png"

export default function DirectionsCard( {text} ){

    return(
        <>
            <div className="border-gray-300 border-b-2 py-7 px-5 mb-5">
                <div className="grid grid-cols-6 gap-3 items-center">
                    <div className="col-span-2 pl-4">
                        <Image src={up_right} alt="arrow" />
                    </div>
                    <div className="col-span-4">
                        {/*<p className="text-gray-700 font-bold"> Make Global Connections </p>*/}
                        <p className="text-gray-500">{text.value}</p>
                    </div>
                </div>
            </div>
        </>
    );
}