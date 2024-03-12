import { MouseEventHandler } from "react";

export default function Button( {zoomImage, onClick}: Prop ){


    return(   
        <button onClick={onClick} className="bg-cyan-100 opacity-80 rounded-md">
            <img src={zoomImage} width='48' height='48' alt="expand" />
        </button>
    );
}

type Prop = {
    zoomImage: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}