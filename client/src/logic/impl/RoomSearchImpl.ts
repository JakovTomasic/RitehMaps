import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { nodes, Node } from "../../data/Nodes";
import { professors, ProfessorData } from "../../data/ProfessorData";
import { MapNodeFilterById } from "../../types/roomsearch/MapNodeFilterById";
import { NodesContainer } from "../interfaces/NodesContainer";

export class RoomSearchImpl implements RoomSearch {

    private nodesContainer: NodesContainer;

    constructor(nodesContainer: NodesContainer) {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
        this.sortedSuggestionsForStart = this.sortedSuggestionsForStart.bind(this);
        
        this.nodesContainer = nodesContainer;
    }

    private mapToList (): SearchNodeSuggestion[] {
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

        return nodeSuggestions.concat(professorSuggestions);
    }

    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        const unsortedSuggestions: SearchNodeSuggestion[] =  this.mapToList()
                .filter(node => this.nodesContainer.contains(node.nodeId));
        const filteredSuggestions: SearchNodeSuggestion[] = unsortedSuggestions.filter((suggestion) =>
            suggestion.roomName.toLowerCase().includes(searchedText.toLowerCase())
        )
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

    findRoomByNodeId(nodeId: string): SearchNodeSuggestion | undefined {
        const listOfSuggestions: SearchNodeSuggestion[] =  this.mapToList();
        const foundSuggestion = listOfSuggestions.find((suggestion) => suggestion.nodeId === nodeId);

        return foundSuggestion;  
    }
}
