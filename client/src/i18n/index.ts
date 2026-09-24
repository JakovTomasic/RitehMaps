import { createContext, useContext } from "react";
import { Locale } from "../types/settings/Locale";
import { en, Translations } from "./en";
import { hr } from "./hr";

/** Every language, keyed by its locale - a `Record` so a new locale can't be left without one. */
export const translations: Record<Locale, Translations> = {
    en: en,
    hr: hr,
};

export type LocaleContextValue = {
    locale: Locale,
    /** Only for the user choosing one themselves: the choice is what gets remembered. */
    setLocale: (locale: Locale) => void,
    t: Translations,
}

/** Filled in by `LocaleProvider`, which is the only thing that should ever touch it directly. */
export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
    const value = useContext(LocaleContext);
    if (value == null) {
        throw new Error("useLocale() used outside of a LocaleProvider");
    }
    return value;
}

/** The strings for the language in use - what almost everything needs. */
export function useTranslations(): Translations {
    return useLocale().t;
}
