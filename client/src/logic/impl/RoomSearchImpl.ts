import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { nodes, Node } from "../../data/Nodes";
import { professors, ProfessorData } from "../../data/ProfessorData";
import { MapNodeFilterById } from "../../types/roomsearch/MapNodeFilterById";
import { NodesContainer } from "../interfaces/NodesContainer";
import { stringEquals } from "../../utils/Strings";

export class RoomSearchImpl implements RoomSearch {

    private nodesContainer: NodesContainer;

    constructor(nodesContainer: NodesContainer) {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
        this.sortedSuggestionsForStart = this.sortedSuggestionsForStart.bind(this);
        this.findRoomByNodeId = this.findRoomByNodeId.bind(this);
        
        this.nodesContainer = nodesContainer;
    }

    sortedSuggestionsForStart(searchedText: string): SearchNodeSuggestion[] {
        
        const unsortedSuggestions: SearchNodeSuggestion[] = this.allNodeSuggestions()
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
    
    private allNodeSuggestions(): SearchNodeSuggestion[] {
        const nodeSuggestions : SearchNodeSuggestion[] = nodes.flatMap((node: Node) => {
            const destinationFilter = new MapNodeFilterById(node.nodeId);
            return node.names.map((name) => new SearchNodeSuggestion(node.nodeId, name, destinationFilter));
        });
        const professorSuggestions: SearchNodeSuggestion[] = professors.flatMap((professor: ProfessorData) => {
            const roomId = this.findNodeId(professor.room);
            if (roomId != undefined) {
                const formattedName = `${professor.name} (${professor.room})`;
                const destinationFilter = new MapNodeFilterById(roomId);
                return new SearchNodeSuggestion(roomId, formattedName, destinationFilter);
            } else {
                console.error(`ERROR: professor office not found: ${professor.room} for ${professor.name}`);
                return null;
            }
        }).filter(item => item != null);

        return nodeSuggestions.concat(professorSuggestions);
    }
}
