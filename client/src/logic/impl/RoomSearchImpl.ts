import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { nodes, Node } from "../../data/Nodes";
import { ProfessorData } from "../../data/ProfessorData";
import { NodesContainer } from "../interfaces/NodesContainer";
import { diacriticToAsciiLetters, stringEquals } from "../../utils/Strings";
import { specialSearchResults } from "../../data/SpecialSearchResults";

export class RoomSearchImpl implements RoomSearch {

    private nodesContainer: NodesContainer;
    private professors: ProfessorData[];

    constructor(nodesContainer: NodesContainer, professors: ProfessorData[]) {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
        this.sortedSuggestionsForStart = this.sortedSuggestionsForStart.bind(this);
        this.findRoomByNodeId = this.findRoomByNodeId.bind(this);
        
        this.nodesContainer = nodesContainer;
        this.professors = professors;
    }

    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        const unsortedSuggestions: SearchNodeSuggestion[] = this.allNodeSuggestions()
                .filter(node => this.nodesContainer.contains(node.nodeId));
        const filteredSuggestions: SearchNodeSuggestion[] = unsortedSuggestions.filter((suggestion) => 
            this.searchIncludes(searchedText, suggestion.roomName)
        );
        const alphabeticallySortedSuggestions: SearchNodeSuggestion[] = filteredSuggestions.sort((a, b) =>
            a.roomName.localeCompare(b.roomName)
        );

        return alphabeticallySortedSuggestions;
    }

    sortedSuggestionsForDestination(searchedText: string): SearchNodeSuggestion[] {

        const matchingSpecialSearchResults = specialSearchResults
            .filter(result => this.searchIncludes(searchedText, result.name))
            .map(result => new SearchNodeSuggestion(result.id, result.name));

        return this.sortedSuggestionsForStart(searchedText).concat(matchingSpecialSearchResults);
    }

    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined {

        return undefined;
    }

    findRoomByNodeId(nodeId: string): SearchNodeSuggestion | undefined {
        const listOfSuggestions: SearchNodeSuggestion[] = this.allNodeSuggestions();
        const foundSuggestion = listOfSuggestions.find((suggestion) => stringEquals(suggestion.nodeId, nodeId));

        return foundSuggestion;  
    }

    findNodeId(nodeNameOrId: string): string | undefined {
        for (const node of nodes) {
            if (stringEquals(node.nodeId, nodeNameOrId)) {
                return node.nodeId;
            }
            for (const name of node.names) {
                if (stringEquals(name, nodeNameOrId)) {
                    return node.nodeId;
                }
            }
        }
        return undefined;
    }
    
    private searchIncludes(searchedText: string, nodeName: string): boolean {
        const conformedNodeName = diacriticToAsciiLetters(nodeName).toLowerCase();
        const conformedSearchText = diacriticToAsciiLetters(searchedText).toLowerCase();
        return conformedNodeName.includes(conformedSearchText);
    }

    private allNodeSuggestions(): SearchNodeSuggestion[] {
        const nodeSuggestions : SearchNodeSuggestion[] = nodes.flatMap((node: Node) =>
            node.names.map((name) => new SearchNodeSuggestion(node.nodeId, name))
        );
        const professorSuggestions: SearchNodeSuggestion[] = this.professors.flatMap((professor: ProfessorData) => {
            const roomId = this.findNodeId(professor.room);
            if (roomId != undefined) {
                const formattedName = `${professor.name} (${professor.room})`;
                return new SearchNodeSuggestion(roomId, formattedName);
            } else {
                console.error(`ERROR: professor office not found: ${professor.room} for ${professor.name}`);
                return [];
            }
        });

        return nodeSuggestions.concat(professorSuggestions);
    }
}
