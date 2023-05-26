import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { nodes, Node } from "../../data/Nodes";
import { professors, ProfessorData } from "../../data/ProfessorData";

export class RoomSearchImpl implements RoomSearch {

    constructor() {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
    }

    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        const nodeSuggestions : SearchNodeSuggestion[] = nodes.flatMap((node: Node) => {
            const { names } = node;
            const destinationFilter = null;
            return names.map((name) => new SearchNodeSuggestion(name, destinationFilter));
        });

        const professorSuggestions: SearchNodeSuggestion[] = professors.flatMap((professor: ProfessorData) => {
            const { name, room } = professor;
            const formattedName = `${name} (${room})`;
            const destinationFilter = null;
            return new SearchNodeSuggestion(formattedName, destinationFilter);
        });

        const unsortedSuggestions: SearchNodeSuggestion[] = nodeSuggestions.concat(professorSuggestions);


        const filteredSuggestions: SearchNodeSuggestion[] = unsortedSuggestions.filter((suggestion) =>
            suggestion.roomName.toLowerCase().includes(searchedText.toLowerCase())
        );

        const alphabeticallySortedSuggestions: SearchNodeSuggestion[] = filteredSuggestions.sort((a, b) =>
            a.roomName.localeCompare(b.roomName)
        );

        return alphabeticallySortedSuggestions;
    }

    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[] {
        const allwaysVisibleMockDestination = new SearchNodeSuggestion("Mock, remove me", null);
        let result = this.sortedSuggestionsForStart(searchedText);
        result.push(allwaysVisibleMockDestination);
        return result;
    }

    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined {
        return undefined;
    }
}
