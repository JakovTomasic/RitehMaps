import { translations, useLocale } from "../i18n";
import { LOCALES } from "../types/settings/Locale";

/**
 * The "EN | HR" switch. Every option is written in its own language rather than the one on screen,
 * so someone who can't read the current one can still find their way out of it.
 */
export default function LanguageToggle() {

    const { locale, setLocale } = useLocale();

    return (
        <div
            role="group"
            aria-label={translations[locale].languageSwitcherLabel}
            className="flex gap-0.5 p-0.5 bg-white border border-gray-200 rounded-full shadow-sm"
        >
            { LOCALES.map(option =>
                <button
                    key={option}
                    type="button"
                    lang={option}
                    aria-pressed={option === locale}
                    onClick={() => setLocale(option)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full transition
                        ${option === locale
                            ? "bg-cyan-600 text-white"
                            : "text-gray-500 hover:text-gray-700"}`}
                >
                    { translations[option].languageName }
                </button>
            )}
        </div>
    );
}
