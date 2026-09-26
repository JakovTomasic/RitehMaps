
/** Someone who can be looked up by name instead of by the room they sit in. */
export type PersonLocation = {
    name: string,
    /** Room label as the person's record spells it, not a node id. */
    room: string,
}

export class SearchNodeSuggestion {
    nodeId: string;
    /** The whole line shown in the search box: a room name, or "Professor Name (room)". */
    roomName: string;
    /** Set only when roomName names a person, so screens can lay the two parts out themselves. */
    person?: PersonLocation;

    constructor(nodeId: string, roomName: string, person?: PersonLocation) {
        this.nodeId = nodeId;
        this.roomName = roomName;
        this.person = person;
    }
}
