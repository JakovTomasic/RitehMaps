
enum NodeType {
    CLASSROOM, STUDENT_ROOM, OFFICE,
    DOOR, STAIRS_UP, STAIRS_DOWN,
    MEN_TOILET, WOMEN_TOILET,
    NAVIGATION_MIDNODE,
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
    // Main building, floor 0
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

    // Main building, floor 1 - left
    {
        nodeId: "f1_left_stairs_up",
        names: [],
        submapId: 2,
        x: 29.36,
        y: 42.59,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f1_left_stairs_down",
        names: [],
        submapId: 2,
        x: 31.66,
        y: 42.57,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "f1_right_stairs_up",
        names: [],
        submapId: 2,
        x: 70.65,
        y: 42.59,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f1_right_stairs_down",
        names: [],
        submapId: 2,
        x: 68.35,
        y: 42.59,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "edulab",
        names: ["edulab"],
        submapId: 2,
        x: 17.53,
        y: 59.71,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "main_f1_left_men_toilet",
        names: [],
        submapId: 2,
        x: 25.41,
        y: 60.62,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "main_f1_left_women_toilet",
        names: [],
        submapId: 2,
        x: 36.73,
        y: 43.6,
        type: NodeType.WOMEN_TOILET,
    },
    {
        nodeId: "1-49",
        names: ["1-49"],
        submapId: 2,
        x: 9.4,
        y: 70.87,
        type: NodeType.OFFICE,
    },

    // Main building, floor 1 - right
    {
        nodeId: "U2",
        names: ["U2"],
        submapId: 2,
        x: 62.96,
        y: 30.57,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "main_f1_right_infrontofU4",
        names: [],
        submapId: 2,
        x: 91.13,
        y: 65.62,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "U4",
        names: ["U4"],
        submapId: 2,
        x: 92.94,
        y: 64.57,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "1-23",
        names: ["1-23"],
        submapId: 2,
        x: 84.77,
        y: 70.78,
        type: NodeType.OFFICE,
    },
]
