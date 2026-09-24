import { Translations } from "../../i18n/en";
import { MapNodeFilter } from "./MapNodeFilter";

export type SpecialSearchResult = {
    id: string;
    /**
     * Picks the name out of a language rather than holding one: unlike a room, this entry is the
     * app's own invention, so it is both shown and typed in whatever language the user reads.
     */
    name: (t: Translations) => string;
    mapNodeFilter: MapNodeFilter;
}
