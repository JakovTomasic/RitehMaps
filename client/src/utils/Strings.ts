

export function normalizeForComparison(s: string) {
    return s.toLocaleLowerCase().split(" ").join("");
}

export function stringEquals(s1: string, s2: string) {
    return normalizeForComparison(s1) === normalizeForComparison(s2);
}

export function replaceSubstring(text: string, replaceSubstring: string, withString: string): string {
    return text.split(replaceSubstring).join(withString);
}

export function diacriticToAsciiLetters(text: string): string {
    const pairsMap = new Map([
        ["Š", "S"],
        ["š", "s"],
        ["Č", "C"],
        ["č", "c"],
        ["Ć", "C"],
        ["ć", "c"],
        ["Đ", "D"],
        ["đ", "d"],
        ["Ž", "Z"],
        ["ž", "z"],
    ]);
    let modifiedText = text;
    for (const pair of pairsMap) {
        modifiedText = replaceSubstring(modifiedText, pair[0], pair[1]);
    }
    return modifiedText;
}

export function stringEqualsIgnoreLocaleAndCase(s1: string, s2: string) {
    const conformedS1 = diacriticToAsciiLetters(s1).toLowerCase();
    const conformedS2 = diacriticToAsciiLetters(s2).toLowerCase();
    return conformedS1 === conformedS2;
}
