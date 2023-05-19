
enum NodeType {
    CLASSROOM, STUDENT_ROOM, DOOR, STAIRS_UP, STAIRS_DOWN, OFFICE
}

export type Node = {
    nodeId: string;
    names: string[];
    submapId: number;
    x: number;
    y: number;
    type: NodeType;
}

export const nodes: Node[] = [
    {
        nodeId: "main_entrance",
        names: ["entrance"],
        submapId: 1,
        x: 45.76,
        y: 91.17,
        type: NodeType.DOOR,
    },
    {
        nodeId: "p2",
        names: ["p2"],
        submapId: 1,
        x: 42.19,
        y: 50.73,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "p1",
        names: ["p1"],
        submapId: 1,
        x: 55.35,
        y: 50.67,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "cantine",
        names: ["cantine"],
        submapId: 1,
        x: 18.15,
        y: 55.49,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "library_left_foor",
        names: ["library"],
        submapId: 1,
        x: 79.22,
        y: 55.63,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "library_right_foor",
        names: ["computer library"],
        submapId: 1,
        x: 82.59,
        y: 55.59,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "0-17",
        names: ["0-17"],
        submapId: 1,
        x: 95.4,
        y: 28.88,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "f0_left_stairs_up",
        names: [],
        submapId: 1,
        x: 29.86,
        y: 38.32,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f0_right_stairs_up",
        names: [],
        submapId: 1,
        x: 70.9,
        y: 38.33,
        type: NodeType.STAIRS_UP,
    },
]
