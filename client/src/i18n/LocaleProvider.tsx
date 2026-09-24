import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Locale } from "../types/settings/Locale";
import { LocaleContext, translations } from "./index";
import { detectLocale, readStoredLocale, storeLocale } from "./localePreference";

/**
 * Holds the language the whole app reads in. Wrapped around everything in `main.tsx`, so switching
 * it re-renders every screen at once - nothing keeps a translated string across a change.
 */
export default function LocaleProvider({ children }: { children: ReactNode }) {

    // Whatever was chosen on an earlier visit wins over the browser's own languages.
    const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? detectLocale());

    // What screen readers pronounce the page in, and what the browser offers to translate from.
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const setLocale = useCallback((chosen: Locale) => {
        setLocaleState(chosen);
        storeLocale(chosen);
    }, []);

    const value = useMemo(
        () => ({ locale: locale, setLocale: setLocale, t: translations[locale] }),
        [locale, setLocale],
    );

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
