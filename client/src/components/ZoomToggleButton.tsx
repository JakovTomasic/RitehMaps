import { MouseEventHandler } from "react";
import { useTranslations } from "../i18n";

export default function Button( {zoomImage, onClick}: Prop ){

    const t = useTranslations();

    return(
        <button onClick={onClick} className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-full p-1.5 transition">
            <img src={zoomImage} width='28' height='28' alt={t.navigation.zoom} />
        </button>
    );
}

type Prop = {
    zoomImage: string;
    onClick?: MouseEventHandler<HTMLButtonElement>
}