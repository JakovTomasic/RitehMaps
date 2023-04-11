import arrow from "../images/arrow.png";
import Image from "next/image";
import Link from "next/link";

export default function Header( {text} ){

    return(
        <>
            <div className="flex flex-row align-middle my-6 mx-3 font-mono">
                <Link href="/"><Image src={arrow} alt="arrow" /></Link>
                <h1 className="text-xl ml-2">{text.value}</h1>
            </div>
        </>
    );
}