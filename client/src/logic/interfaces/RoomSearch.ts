import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";

export interface RoomSearch {
    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[]
    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[]
    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined
    /**
     * The suggestion an id stands for, or undefined when the map data doesn't know the id.
     *
     * One id can have several names - a room, its aliases, and everyone who sits in it - so
     * `preferredName` says which one was searched by. It arrives from shareable urls, so it is
     * only ever matched against the map data and the data's own copy is what comes back:
     * a link can't relabel a room into something it isn't. An unmatched name falls back to the
     * room's first name rather than being shown.
     */
    findSuggestionById(id: string, preferredName?: string): SearchNodeSuggestion | undefined
}
