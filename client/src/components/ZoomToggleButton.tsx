import { MouseEventHandler } from "react";

export default function Button( {zoomImage, onClick}: Prop ){


    return(
        <button onClick={onClick} className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-full p-1.5 transition">
            <img src={zoomImage} width='28' height='28' alt="expand" />
        </button>
    );
}

type Prop = {
    zoomImage: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}