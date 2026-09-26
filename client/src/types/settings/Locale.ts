/**
 * Every language the ui is translated into.
 */
export const LOCALES = ["en", "hr"] as const;

export type Locale = typeof LOCALES[number];

/** What a browser asking for a language the app doesn't have falls back to. */
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
    return (LOCALES as readonly string[]).includes(value);
}
