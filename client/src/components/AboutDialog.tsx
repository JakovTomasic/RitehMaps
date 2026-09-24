import { useEffect } from "react";
import { useTranslations } from "../i18n";

const GITHUB_URL = "https://github.com/JakovTomasic/RitehMaps";

/** Everyone who worked on the app, in the order they are credited on the About card. */
const AUTHORS = "Marko Kozlov, Nikolina Rodin, Jakov Tomasić";

type Props = {
    close: () => void,
}

/**
 * The "About" card: who made the app and what it is. Opened from the home screen and closed by
 * the backdrop, the button or Escape - it holds no state, so it can simply be unmounted.
 */
export default function AboutDialog({ close }: Props) {

    const t = useTranslations();

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [close]);

    return (
        // Above the navbar (z-20), and over the whole window rather than the home screen's
        // visible strip, so nothing shows through next to the card.
        <div
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4"
            onClick={close}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="about-dialog-title"
                className="relative max-h-full w-full max-w-sm overflow-y-auto rounded-xl bg-white p-5 shadow-xl"
                // The click that opens the card must not reach the backdrop and close it again.
                onClick={event => event.stopPropagation()}
            >
                <button
                    className="absolute right-3 top-3 rounded-md px-2 py-1 text-xl leading-none text-gray-400
                               transition hover:bg-gray-100 hover:text-gray-600"
                    onClick={close}
                    aria-label={t.about.close}
                    type="button"
                >
                    ×
                </button>

                <h2 id="about-dialog-title" className="pr-8 text-lg font-bold text-gray-800">
                    {t.about.title}
                </h2>

                <p className="mt-3 text-sm text-gray-700">
                    {t.about.subtitle}
                </p>

                <p className="mt-3 text-sm text-gray-700">
                    {t.about.madeBy(AUTHORS)}{" "}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-cyan-700 underline hover:text-cyan-800"
                    >
                        {t.about.github}
                    </a>.
                </p>

                <p className="mt-3 text-xs text-gray-500">
                    {t.about.disclaimer}
                </p>
            </div>
        </div>
    );
}
