
enum NodeType {
    CLASSROOM, STUDENT_ROOM, OFFICE,
    DOOR, STAIRS_UP, STAIRS_DOWN, PASSAGE,
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








    // Main building, floor 2 - left
    {
        nodeId: "f2_left_stairs_up",
        names: [],
        submapId: 3,
        x: 28.75,
        y: 55.98,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f2_left_stairs_down",
        names: [],
        submapId: 3,
        x: 31.05,
        y: 55.99,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "2-35",
        names: ["2-35"],
        submapId: 3,
        x: 18.59,
        y: 77.58,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "main_f2_left_men_toilet",
        names: [],
        submapId: 3,
        x: 24.82,
        y: 68.81,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "main_f2_left_women_toilet",
        names: [],
        submapId: 3,
        x: 36.1,
        y: 56.82,
        type: NodeType.WOMEN_TOILET,
    },
    {
        nodeId: "U10",
        names: ["U10"],
        submapId: 3,
        x: 35.84,
        y: 90.68,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "U8",
        names: ["U8"],
        submapId: 3,
        x: 7.12,
        y: 47.85,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "main_f2_left_lab_passage",
        names: [],
        submapId: 3,
        x: 8.87,
        y: 3.7,
        type: NodeType.PASSAGE,
    },

    // Main building, floor 2 - right
    {
        nodeId: "f2_right_stairs_up",
        names: [],
        submapId: 3,
        x: 67.54,
        y: 55.99,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f2_right_stairs_down",
        names: [],
        submapId: 3,
        x: 69.82,
        y: 55.99,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "L13",
        names: ["L13"],
        submapId: 3,
        x: 69.39,
        y: 6.42,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "main_f2_right_infrontofU7",
        names: [],
        submapId: 3,
        x: 90.35,
        y: 73.64,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "U7",
        names: ["U7"],
        submapId: 3,
        x: 92,
        y: 72.84,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "main_f2_right_lab_passage",
        names: [],
        submapId: 3,
        x: 68.14,
        y: 2.64,
        type: NodeType.PASSAGE,
    },









    // Main building, floor 3 - left
    {
        nodeId: "f3_left_stairs_down",
        names: [],
        submapId: 4,
        x: 31.02,
        y: 61.18,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "U13",
        names: ["U13"],
        submapId: 4,
        x: 22.58,
        y: 79.5,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "main_f3_left_men_toilet",
        names: [],
        submapId: 4,
        x: 25.06,
        y: 71.4,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "main_f3_left_infrontofP3",
        names: [],
        submapId: 4,
        x: 12.64,
        y: 76.2,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "P3",
        names: ["P3"],
        submapId: 4,
        x: 10.96,
        y: 76.67,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "U12",
        names: ["U12"],
        submapId: 4,
        x: 12.64,
        y: 79.47,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "U14",
        names: ["U14"],
        submapId: 4,
        x: 26.1,
        y: 79.48,
        type: NodeType.CLASSROOM,
    },

    // Main building, floor 3 - center
    {
        nodeId: "3-08",
        names: ["3-08"],
        submapId: 4,
        x: 44.24,
        y: 80.15,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "U16",
        names: ["U16"],
        submapId: 4,
        x: 44.24,
        y: 83.49,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "U17",
        names: ["U17"],
        submapId: 4,
        x: 51.14,
        y: 83.52,
        type: NodeType.CLASSROOM,
    },

    // Main building, floor 3 - right
    {
        nodeId: "f3_right_stairs_down",
        names: [],
        submapId: 4,
        x: 67.72,
        y: 61.18,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "f3_right_stairs_down_to_lab",
        names: [],
        submapId: 4,
        x: 72.8,
        y: 4.7,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "main_f3_right_men_toilet",
        names: [],
        submapId: 4,
        x: 73.87,
        y: 72.52,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "3-28",
        names: ["3-28"],
        submapId: 4,
        x: 75.9,
        y: 79.48,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "main_f3_right_infrontofP4",
        names: [],
        submapId: 4,
        x: 86.94,
        y: 76.75,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "P4",
        names: ["P4"],
        submapId: 4,
        x: 88.18,
        y: 76.01,
        type: NodeType.CLASSROOM,
    },
    {
        nodeId: "3-34",
        names: ["3-34"],
        submapId: 4,
        x: 88.44,
        y: 84.92,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "3-35",
        names: ["3-35"],
        submapId: 4,
        x: 90.39,
        y: 84.92,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "3-36",
        names: ["3-36"],
        submapId: 4,
        x: 95.75,
        y: 82.96,
        type: NodeType.OFFICE,
    },













    // Lab building, floor 0
    {
        nodeId: "lab_f0_down_stairs_up",
        names: [],
        submapId: 101,
        x: 56.55,
        y: 85.7,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "1-117a",
        names: ["1-117a"],
        submapId: 101,
        x: 72.18,
        y: 78.73,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "1-102",
        names: ["1-102"],
        submapId: 101,
        x: 18.61,
        y: 78.74,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "1-104",
        names: ["1-104"],
        submapId: 101,
        x: 26.79,
        y: 78.73,
        type: NodeType.OFFICE,
    },













    // Lab building, floor 1
    {
        nodeId: "lab_f1_left_pathtomainbuilding",
        names: [],
        submapId: 102,
        x: 37.53,
        y: 93.48,
        type: NodeType.PASSAGE,
    },
    {
        nodeId: "lab_f1_right_navnode_1",
        names: [],
        submapId: 102,
        x: 83.74,
        y: 78.73,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "lab_f1_right_navnode_2",
        names: [],
        submapId: 102,
        x: 85.95,
        y: 77.93,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "lab_f1_right_passage_to_main_building",
        names: [],
        submapId: 102,
        x: 88.82,
        y: 94.06,
        type: NodeType.PASSAGE,
    },
    {
        nodeId: "lab_f1_right_stairs_up",
        names: [],
        submapId: 102,
        x: 92.51,
        y: 77.45,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "lab_f1_right_middle_stairs_down",
        names: [],
        submapId: 102,
        x: 63.8,
        y: 90.15,
        type: NodeType.STAIRS_DOWN,
    },
    {
        nodeId: "2-102",
        names: ["2-102"],
        submapId: 102,
        x: 44.48,
        y: 82.88,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "2-104",
        names: ["2-104"],
        submapId: 102,
        x: 48.75,
        y: 82.96,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "2-119",
        names: ["2-119"],
        submapId: 102,
        x: 79.08,
        y: 82.78,
        type: NodeType.OFFICE,
    },
]
