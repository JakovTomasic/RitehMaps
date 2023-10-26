
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
    // Main building, floor 0 - center
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
        nodeId: "student_room",
        names: ["Student room"],
        submapId: 1,
        x: 37.17,
        y: 26.06,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "0-72",
        names: ["0-72"],
        submapId: 1,
        x: 39.76,
        y: 72.85,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "I8",
        names: ["I8"],
        submapId: 1,
        x: 63.21,
        y: 26.05,
        type: NodeType.OFFICE,
    },


    // Main building, floor 0 - left
    {
        nodeId: "0-71",
        names: ["0-71"],
        submapId: 1,
        x: 35.15,
        y: 69,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-70",
        names: ["0-70"],
        submapId: 1,
        x: 31.38,
        y: 69.03,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-68",
        names: ["0-68"],
        submapId: 1,
        x: 27.21,
        y: 68.93,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-66",
        names: ["0-66"],
        submapId: 1,
        x: 23.69,
        y: 69.12,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-64",
        names: ["0-64"],
        submapId: 1,
        x: 19.71,
        y: 68.98,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-55",
        names: ["0-55"],
        submapId: 1,
        x: 10.1,
        y: 68.82,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "0-60",
        names: ["0-60"],
        submapId: 1,
        x: 4.42,
        y: 70.16,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-61",
        names: ["0-61"],
        submapId: 1,
        x: 6.39,
        y: 73.38,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-62",
        names: ["0-62"],
        submapId: 1,
        x: 9.98,
        y: 73.38,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-63",
        names: ["0-63"],
        submapId: 1,
        x: 11.71,
        y: 70.23,
        type: NodeType.OFFICE,
    },
    // TODO: add all of these rooms properly,
    {
        nodeId: "left_corridor_bunch_of_rooms",
        names: ["0-58", "0-56", "0-51", "0-52", "0-53", "0-54", "0-55"],
        submapId: 1,
        x: 10.01,
        y: 53.38,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "cantine",
        names: ["cantine"],
        submapId: 1,
        x: 18.15,
        y: 55.49,
        type: NodeType.STUDENT_ROOM,
    },


    // Main building, floor 0 - right
    {
        nodeId: "library_left_foor",
        names: ["library", "0-23"],
        submapId: 1,
        x: 79.22,
        y: 55.63,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "library_right_foor",
        names: ["computer library", "0-22"],
        submapId: 1,
        x: 82.59,
        y: 55.59,
        type: NodeType.STUDENT_ROOM,
    },
    {
        nodeId: "0-30",
        names: ["0-30"],
        submapId: 1,
        x: 64.81,
        y: 56.06,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-07",
        names: ["0-07"],
        submapId: 1,
        x: 65.65,
        y: 66.81,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-11",
        names: ["0-11"],
        submapId: 1,
        x: 84.92,
        y: 66.99,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-13",
        names: ["0-13"],
        submapId: 1,
        x: 87.82,
        y: 66.65,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-21",
        names: ["0-21"],
        submapId: 1,
        x: 85.98,
        y: 56.09,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-20",
        names: ["0-20"],
        submapId: 1,
        x: 91.2,
        y: 56.41,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-14",
        names: ["0-14"],
        submapId: 1,
        x: 97.56,
        y: 66.91,
        type: NodeType.OFFICE,
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
        nodeId: "0-16",
        names: ["0-16"],
        submapId: 1,
        x: 95.42,
        y: 39.24,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "0-15",
        names: ["0-15"],
        submapId: 1,
        x: 95.52,
        y: 50.83,
        type: NodeType.OFFICE,
    },
    {
        nodeId: "library_midnode_1",
        names: [],
        submapId: 1,
        x: 79.22,
        y: 24.11,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "library_midnode_2",
        names: [],
        submapId: 1,
        x: 86.87,
        y: 24.11,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "library_midnode_3",
        names: [],
        submapId: 1,
        x: 86.87,
        y: 31.54,
        type: NodeType.NAVIGATION_MIDNODE,
    },
    {
        nodeId: "0-27",
        names: ["0-27"],
        submapId: 1,
        x: 89.37,
        y: 31.54,
        type: NodeType.OFFICE,
    },


    // Main building, floor 0 - stairs
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
    {
        nodeId: "f0_left_men_toilet",
        names: [],
        submapId: 1,
        x: 25.96,
        y: 55.3,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "f0_left_women_toilet",
        names: [],
        submapId: 1,
        x: 35.94,
        y: 55.27,
        type: NodeType.WOMEN_TOILET,
    },
    {
        nodeId: "f0_right_men_toilet",
        names: [],
        submapId: 1,
        x: 74.78,
        y: 55.3,
        type: NodeType.MEN_TOILET,
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
    {
        nodeId: "f1_right_men_toilet",
        names: [],
        submapId: 2,
        x: 74.59,
        y: 59.35,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "f1_right_women_toilet",
        names: [],
        submapId: 2,
        x: 63.15,
        y: 43.68,
        type: NodeType.WOMEN_TOILET,
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
        x: 69.82,
        y: 55.99,
        type: NodeType.STAIRS_UP,
    },
    {
        nodeId: "f2_right_stairs_down",
        names: [],
        submapId: 3,
        x: 67.54,
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
    {
        nodeId: "f2_right_men_toilet",
        names: [],
        submapId: 3,
        x: 73.75,
        y: 68.83,
        type: NodeType.MEN_TOILET,
    },
    {
        nodeId: "f2_right_women_toilet",
        names: [],
        submapId: 3,
        x: 62.33,
        y: 56.84,
        type: NodeType.WOMEN_TOILET,
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
