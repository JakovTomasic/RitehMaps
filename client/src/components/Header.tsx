import Image from "next/image";
import Link from "next/link";

export default function Header( {text, backPath}: Prop ){

    return(
        <>
            <div className="flex flex-row align-middle my-6 mx-3 font-mono">
                <Link href={backPath}><Image src='/images/back_arrow.png' width='32' height='32' alt="arrow" /></Link>
                <h1 className="text-xl ml-2">{text}</h1>
            </div>
        </>
    );
}

type Prop = {
    text: string;
    backPath: string;
}