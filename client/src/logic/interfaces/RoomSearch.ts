import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";

export interface RoomSearch {
    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[]
    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[]
    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined
    findRoomByNodeId(nodeId: string): SearchNodeSuggestion | undefined
}
