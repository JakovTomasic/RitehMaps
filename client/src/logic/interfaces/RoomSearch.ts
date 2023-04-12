import { SearchNodeSuggestion } from "../../types/SearchNodeSuggestion";

export interface RoomSearch {
    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[]
    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[]
    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined
}
