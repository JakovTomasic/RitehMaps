import { SearchNodeSuggestion } from "../../types/roomsearch/SearchNodeSuggestion";
import { RoomSearch } from "../interfaces/RoomSearch";
import { NodesContainer } from "../interfaces/NodesContainer";
import { diacriticToAsciiLetters, stringEquals } from "../../utils/Strings";
import { specialSearchResults } from "../../data/SpecialSearchResults";
import { Node, ProfessorData } from "../../data/ServerData";
import { Translations } from "../../i18n/en";

export class RoomSearchImpl implements RoomSearch {

    private nodesContainer: NodesContainer;
    private professors: ProfessorData[];
    private nodes: Node[];
    /**
     * Room and professor names come from the map data and are shown as they were written. Only the
     * special searches (`specialSuggestions`) are the app's own, so only those need a language.
     */
    private translations: Translations;
    /**
     * Built once per instance: pairing every professor with their office is a scan of all nodes per
     * professor, which is tens of ms on the real data - too much to redo on every keystroke.
     */
    private cachedNodeSuggestions: SearchNodeSuggestion[] | null = null;

    constructor(nodesContainer: NodesContainer, professors: ProfessorData[], nodes: Node[], translations: Translations) {
        // A fix for calling a function from another function (https://stackoverflow.com/a/57028664)
        this.sortedSuggestionsForDestination = this.sortedSuggestionsForDestination.bind(this);
        this.sortedSuggestionsForStart = this.sortedSuggestionsForStart.bind(this);
        this.findSuggestionById = this.findSuggestionById.bind(this);
        
        this.nodesContainer = nodesContainer;
        this.professors = professors;
        this.nodes = nodes;
        this.translations = translations;
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

        const matchingSpecialSearchResults = this.specialSuggestions()
            .filter(suggestion => this.searchIncludes(searchedText, suggestion.roomName));

        return this.sortedSuggestionsForStart(searchedText).concat(matchingSpecialSearchResults);
    }

    findRoomWithQrCode(qrCodeValue: string): SearchNodeSuggestion | undefined {

        return undefined;
    }

    findSuggestionById(id: string, preferredName?: string): SearchNodeSuggestion | undefined {
        const candidates: SearchNodeSuggestion[] = this.allSuggestions()
            .filter((suggestion) => stringEquals(suggestion.nodeId, id));

        if (candidates.length === 0) {
            return undefined;
        }
        if (preferredName != undefined) {
            const preferred = candidates.find((suggestion) => stringEquals(suggestion.roomName, preferredName));
            if (preferred != undefined) {
                return preferred;
            }
        }
        // The room itself: node names come before the people sitting in them, and a room can hold
        // several of those, so there is no one person to fall back to.
        return candidates[0];
    }

    findNodeId(nodeNameOrId: string): string | undefined {
        for (const node of this.nodes) {
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
        if (this.cachedNodeSuggestions != null) {
            return this.cachedNodeSuggestions;
        }

        const nodeSuggestions : SearchNodeSuggestion[] = this.nodes.flatMap((node: Node) =>
            node.names.map((name) => new SearchNodeSuggestion(node.nodeId, name))
        );
        const professorSuggestions: SearchNodeSuggestion[] = this.professors.flatMap((professor: ProfessorData) => {
            const roomId = this.findNodeId(professor.room);
            if (roomId != undefined) {
                const formattedName = `${professor.name} (${professor.room})`;
                return new SearchNodeSuggestion(roomId, formattedName, {
                    name: professor.name,
                    room: professor.room,
                });
            } else {
                console.error(`ERROR: professor office not found: ${professor.room} for ${professor.name}`);
                return [];
            }
        });

        this.cachedNodeSuggestions = nodeSuggestions.concat(professorSuggestions);
        return this.cachedNodeSuggestions;
    }

    /** Everything an id can stand for: rooms, the people in them, and the special searches. */
    private allSuggestions(): SearchNodeSuggestion[] {
        return this.allNodeSuggestions().concat(this.specialSuggestions());
    }

    private specialSuggestions(): SearchNodeSuggestion[] {
        return specialSearchResults.map(result => new SearchNodeSuggestion(result.id, result.name(this.translations)));
    }
}
