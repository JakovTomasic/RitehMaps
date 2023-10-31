

export function normalizeForComparison(s: string) {
    return s.toLocaleLowerCase().split(" ").join("");
}

export function stringEquals(s1: string, s2: string) {
    return normalizeForComparison(s1) === normalizeForComparison(s2);
}