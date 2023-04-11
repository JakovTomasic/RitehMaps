import { SearchRoomSuggestion } from "../../types/SearchRoomSuggestion";

export interface RoomSearch {
    searchRoomsOrdered(text: string): SearchRoomSuggestion[]
    findRoomWithQrCode(qrCodeValue: string): SearchRoomSuggestion | undefined
}
