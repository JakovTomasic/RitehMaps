import Image from "next/image";
import up_right from "../images/up-right.png";
import up from "../images/up.png";
import up_left from "../images/up-left.png";

export default function DirectionsCard( {text} ){

    return(
        <>
            <div className="mb-8">
                <div className="py-7 px-5 mx-4 rounded-2xl bg-blue-600 rounded-bl-none">
                    <div className="grid grid-cols-6 items-center">
                        <div className="col-span-2 pl-4 max-[300px]:w-14">
                            <Image src={up_right} alt="arrow" />
                        </div>
                        <div className="col-span-4">
                            <p className="font-medium text-md min-[300px]:text-xl text-white">{text.current}</p>
                        </div>
                    </div>
                </div>
                <div className="pb-3 pt-3 px-5 ml-4 rounded-2xl bg-blue-800 shadow-md rounded-t-none w-2/3">
                    <div className="grid grid-cols-6 items-center">
                        <div className="col-span-2 max-[300px]:w-8">
                            <Image src={up} alt="arrow" />
                        </div>
                        <div className="col-span-4">
                            <p className="font-medium text-sm min-[300px]:text-lg text-white">{text.next}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}