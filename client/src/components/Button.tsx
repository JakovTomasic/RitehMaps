import { MouseEventHandler } from "react";

export default function Button( {text, onClick}: Prop ){

    return(
        <>
            <div className="mx-2">
                <button onClick={onClick} className="py-2 px-4 bg-transparent text-cyan-500 font-semibold border 
                border-cyan-600 rounded hover:bg-cyan-500 hover:text-white 
                hover:border-transparent transition ease-in duration-200 
                transform hover:-translate-y-1 active:translate-y-0">
                    {text}
                </button>
            </div>
        </>
    );
}

type Prop = {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}