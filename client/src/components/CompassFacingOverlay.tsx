type Prop = {
    /**
     * True while compass mode is on but no heading has arrived yet - see CompassControl.
     * The user is asked for the tap that gets some browsers running again.
     */
    waitingForHeading: boolean,
}

/**
 * Sits over the middle of the map in compass mode and explains what the map is doing:
 * up the screen is the way the user is facing.
 */
export default function CompassFacingOverlay({ waitingForHeading }: Prop) {
    return (
        <div className="absolute w-full h-full flex flex-col items-center pointer-events-none z-10">
            <img className="h-16 opacity-70" src="/images/arrow_up.png"></img>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500
                bg-white/80 rounded-full px-2 py-0.5">
                You are facing this way
            </span>
            { waitingForHeading &&
                <span className="mt-1 text-[11px] font-semibold text-gray-600
                    bg-white/80 rounded-full px-2 py-0.5">
                    Tap the map to start the compass
                </span>
            }
        </div>
    );
}
