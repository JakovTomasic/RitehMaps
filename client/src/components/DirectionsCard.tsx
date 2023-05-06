import Image from "next/image";

export default function DirectionsCard( {currentText, nextText, currentDirection, nextDirection}: Prop ){


    return(
        <>
            <div className="mb-8">
                <div className="py-7 px-5 mx-4 rounded-2xl bg-cyan-500 rounded-bl-none">
                    <div className="grid grid-cols-6 items-center">
                        <div className="col-span-2 pl-4 max-[300px]:w-14">
                            <Image src={currentDirection} width='48' height='48' alt="arrow" />
                        </div>
                        <div className="col-span-4">
                            <p className="font-medium text-md min-[300px]:text-xl text-white">{currentText}</p>
                        </div>
                    </div>
                </div>
                <div className="pb-3 pt-3 px-5 ml-4 rounded-2xl bg-cyan-700 shadow-md rounded-t-none w-2/3">
                    <div className="grid grid-cols-6 items-center">
                        <div className="col-span-2 max-[300px]:w-8">
                            <Image src={nextDirection} width='48' height='48' alt="arrow" />
                        </div>
                        <div className="col-span-4">
                            <p className="font-medium text-sm min-[300px]:text-lg text-white">{nextText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

type Prop = {
    currentText: string;
    nextText: string;
    currentDirection: string;
    nextDirection: string;
}