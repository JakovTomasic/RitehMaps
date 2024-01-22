import { MouseEventHandler } from "react";

export default function Button( {text, enabled, onClick}: Prop ){

    const buttonStyle = enabled ?
        "py-[0.5rem] px-[1rem] bg-transparent text-cyan-500 font-semibold border \
            border-cyan-600 rounded hover:bg-cyan-500 hover:text-white \
            hover:border-transparent transition ease-in duration-200 \
            transform hover:-translate-y-1 active:translate-y-0" :
        "py-[0.45rem] px-[0.95rem] bg-zinc-500 text-white font-semibold border border-[0.15rem] \
            border-zinc-700 rounded"

    return(
        <>
            <div className="mx-2">
                <button onClick={enabled ? onClick : () => {}} className={buttonStyle} disabled={!enabled}>
                    {text}
                </button>
            </div>
        </>
    );
}

type Prop = {
    text: string;
    enabled: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}