import CompassIcon from "./CompassIcon";
import { useTranslations } from "../i18n";

type Prop = {
    enabled: boolean,
    /** False on anything without a compass - a desktop, mostly. */
    available: boolean,
    /** True while we are still waiting to find out whether this device has a compass. */
    checking: boolean,
    onClick: () => void,
}

export default function CompassToggleButton({ enabled, available, checking, onClick }: Prop) {

    const t = useTranslations();

    const style = !available ? "bg-gray-100 border-gray-200 text-gray-400"
        : enabled ? "bg-cyan-600 border-cyan-600 text-white"
        : "bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-700";

    const label = !available ? t.compass.unavailable
        : enabled ? t.compass.turnOff
        : t.compass.turnOn;

    return (
        // Deliberately not a `disabled` button: a disabled one swallows the tap, and then a user
        // on a desktop is left poking at a greyed out icon without ever being told why it does
        // nothing. This one still fires, and the navigation screen answers with the reason.
        <button
            onClick={onClick}
            aria-pressed={enabled}
            aria-disabled={!available}
            aria-label={label}
            title={label}
            className={`flex items-center justify-center border rounded-full p-1.5 transition ${style} ${checking ? "opacity-60" : ""}`}
        >
            <CompassIcon className="h-7 w-7" />
        </button>
    );
}
