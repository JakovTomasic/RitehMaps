
export type Edge = {
    nodeId1: string;
    nodeId2: string;
}

export const edges: Edge[] = [
    // Main building, floor 0
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "h_main_f0_left",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "h_main_f0_right",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "main_entrance",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "p1",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "p2",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "cantine",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "library_left_foor",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "library_right_foor",
    },
    {
        nodeId1: "h_main_f0_right",
        nodeId2: "0-17",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_left_stairs_up",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_right_stairs_up",
    },

    // Main building, floor 0 - floor 1
    {
        nodeId1: "f0_left_stairs_up",
        nodeId2: "f1_left_stairs_down",
    },
    {
        nodeId1: "f0_right_stairs_up",
        nodeId2: "f1_right_stairs_down",
    },


    // Main building, floor 1 - left
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "h_main_f1_left_other",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "f1_left_stairs_down",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "f1_left_stairs_up",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "edulab",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "main_f1_left_men_toilet",
    },
    {
        nodeId1: "h_main_f1_left_other",
        nodeId2: "main_f1_left_women_toilet",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-49",
    },

    // Main building, floor 1 - right
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "h_main_f1_right_other",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "f1_right_stairs_down",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "f1_right_stairs_up",
    },
    {
        nodeId1: "h_main_f1_right_other",
        nodeId2: "U2",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "main_f1_right_infrontofU4",
    },
    {
        nodeId1: "main_f1_right_infrontofU4",
        nodeId2: "U4",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "1-23",
    },
]
