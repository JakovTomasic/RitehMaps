type Prop = {
    text: string,
    /** Amber for something the user can fix, red for something they are doing wrong right now. */
    tone: "warning" | "error",
}

/** Full width strip under the header, for a message that goes away by itself. */
export default function Banner({ text, tone }: Prop) {

    const style = tone === "error"
        ? "bg-red-50 text-red-700 border-red-100"
        : "bg-amber-50 text-amber-800 border-amber-100";

    return (
        <div className={`text-sm font-medium text-center py-2 px-4 border-b ${style}`}>
            { text }
        </div>
    );
}
