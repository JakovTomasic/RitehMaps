import { SearchNodeSuggestion } from "../../types/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";

import { rooms } from "../../rooms";

export class RoomSearchImpl implements RoomSearch {


    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        // Mapping data into SearchNodeSuggestion type objects
       const unsortedSuggestions : SearchNodeSuggestion[] = rooms.flatMap((room) => {
            const { names } = room;
            const destinationFilter = null;
            return names.map((name) => new SearchNodeSuggestion(name, destinationFilter));
        });

        const filteredSuggestions: SearchNodeSuggestion[] = unsortedSuggestions.filter((suggestion) =>
            suggestion.roomName.toLowerCase().startsWith(searchedText.toLowerCase()) || suggestion.roomName.toLowerCase().includes(searchedText.toLowerCase())
        );

        const alphabeticallySortedSuggestions: SearchNodeSuggestion[] = filteredSuggestions.sort((a, b) =>
            a.roomName.localeCompare(b.roomName)
        );

        return alphabeticallySortedSuggestions;
    }

    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[] {
        return [];
    }

    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined {
               return undefined;
    }
}
