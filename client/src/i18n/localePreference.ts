import { DEFAULT_LOCALE, isLocale, Locale, LOCALES } from "../types/settings/Locale";

/**
 * Only the language the user picked by hand is stored, and it is stored for nothing else.
 * Claude: That makes it a preference the user explicitly asked for, which the ePrivacy directive
 * (art. 5(3)) exempts from consent - so this needs no cookie banner. A language merely guessed
 * from the browser is deliberately never written down: guessing is not the user asking for anything.
 */
const STORAGE_KEY = "rithemaps.locale";

export function readStoredLocale(): Locale | null {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored != null && isLocale(stored) ? stored : null;
    } catch {
        // Some browsers throw on localStorage itself (private mode, storage turned off).
        return null;
    }
}

export function storeLocale(locale: Locale) {
    try {
        window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // A browser that won't store it still gets the language for the rest of this visit.
    }
}

/** The first of the browser's languages the app has, region ignored - "hr-BA" is still croatian. */
export function detectLocale(): Locale {
    const requested = navigator.languages?.length > 0 ? navigator.languages : [navigator.language];
    for (const language of requested) {
        const withoutRegion = language.toLowerCase().split("-")[0];
        const match = LOCALES.find(locale => locale === withoutRegion);
        if (match != undefined) {
            return match;
        }
    }
    return DEFAULT_LOCALE;
}
