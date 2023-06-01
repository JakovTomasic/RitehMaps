import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { nodes, Node } from "../../data/Nodes";
import { professors, ProfessorData } from "../../data/ProfessorData";
import { MapNodeFilterById } from "../../types/roomsearch/MapNodeFilterById";

export class RoomSearchImpl implements RoomSearch {

    constructor() {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
    }

    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        const nodeSuggestions : SearchNodeSuggestion[] = nodes.flatMap((node: Node) => {
            const { names } = node;
            const destinationFilter = new MapNodeFilterById(node.nodeId);
            return names.map((name) => new SearchNodeSuggestion(node.nodeId, name, destinationFilter));
        });

        const professorSuggestions: SearchNodeSuggestion[] = professors.flatMap((professor: ProfessorData) => {
            const { name, room } = professor;
            const formattedName = `${name} (${room})`;
            const destinationFilter = new MapNodeFilterById(room);
            return new SearchNodeSuggestion(room, formattedName, destinationFilter);
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
        return this.sortedSuggestionsForStart(searchedText);
    }

    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined {
        return undefined;
    }
}
