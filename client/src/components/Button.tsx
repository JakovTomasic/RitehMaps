import { MouseEventHandler } from "react";

export default function Button( {text, enabled, onClick, variant = "primary"}: Prop ){

    const variantStyle = variant === "secondary"
        ? "bg-white text-cyan-700 border-cyan-300 hover:bg-cyan-50"
        : variant === "ghost"
        ? "bg-transparent text-zinc-500 border-transparent hover:bg-zinc-100 hover:text-zinc-700"
        : "bg-cyan-500 text-white border-cyan-600 hover:bg-cyan-600 hover:border-transparent";

    const buttonStyle = enabled ?
        `py-[0.55rem] px-[1.15rem] font-semibold border rounded-lg \
            transition ease-in duration-200 \
            transform hover:-translate-y-0.5 active:translate-y-0 ${variantStyle}` :
        "py-[0.55rem] px-[1.15rem] bg-zinc-100 text-zinc-400 font-semibold border \
            border-zinc-200 rounded-lg cursor-not-allowed"

    return(
        <>
            <div className="mx-1">
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
    variant?: "primary" | "secondary" | "ghost";
}