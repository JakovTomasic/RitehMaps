
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


    // Main building, floor 1 - floor 2
    {
        nodeId1: "f1_left_stairs_up",
        nodeId2: "f2_left_stairs_down",
    },
    {
        nodeId1: "f1_right_stairs_up",
        nodeId2: "f2_right_stairs_down",
    },


    // Main building, floor 2 - left
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "h_main_f2_left_pathtolab",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "h_main_f2_left_other",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "f2_left_stairs_down",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "f2_left_stairs_up",
    },
    {
        nodeId1: "h_main_f2_left_pathtolab",
        nodeId2: "main_f2_left_lab_passage",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "main_f2_left_men_toilet",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "main_f2_left_women_toilet",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "2-35",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "U10",
    },
    {
        nodeId1: "h_main_f2_left_pathtolab",
        nodeId2: "U8",
    },

    // Main building, floor 2 - right
    {
        nodeId1: "h_main_f2_right_main",
        nodeId2: "h_main_f2_right_pathtolab_1",
    },
    {
        nodeId1: "h_main_f2_right_pathtolab_1",
        nodeId2: "h_main_f2_right_pathtolab_2",
    },
    {
        nodeId1: "h_main_f2_right_pathtolab_2",
        nodeId2: "h_main_f2_right_pathtolab_3",
    },
    {
        nodeId1: "h_main_f2_right_main",
        nodeId2: "f2_right_stairs_down",
    },
    {
        nodeId1: "h_main_f2_right_main",
        nodeId2: "f2_right_stairs_up",
    },
    {
        nodeId2: "h_main_f2_right_pathtolab_3",
        nodeId1: "main_f2_right_lab_passage",
    },
    {
        nodeId1: "h_main_f2_right_pathtolab_3",
        nodeId2: "L13",
    },
    {
        nodeId1: "h_main_f2_right_main",
        nodeId2: "main_f2_right_infrontofU7",
    },
    {
        nodeId2: "main_f2_right_infrontofU7",
        nodeId1: "U7",
    },


    // Main building, floor 2 - floor 3
    {
        nodeId1: "f2_left_stairs_up",
        nodeId2: "f3_left_stairs_down",
    },
    {
        nodeId1: "f2_right_stairs_up",
        nodeId2: "f3_right_stairs_down",
    },


    // Main building, floor 3 - hallways
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "h_main_f3_left_main_to_center",
    },
    {
        nodeId1: "h_main_f3_left_main_to_center",
        nodeId2: "h_main_f3_center",
    },
    {
        nodeId1: "h_main_f3_center",
        nodeId2: "h_main_f3_right_main_to_center",
    },
    {
        nodeId1: "h_main_f3_right_main_to_center",
        nodeId2: "h_main_f3_right_main",
    },
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "h_main_f3_right_pathtolab_1",
    },
    {
        nodeId1: "h_main_f3_right_pathtolab_1",
        nodeId2: "h_main_f3_right_pathtolab_2",
    },
    {
        nodeId1: "h_main_f3_right_pathtolab_2",
        nodeId2: "h_main_f3_right_pathtolab_3",
    },
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "h_main_f3_right_offices_1",
    },
    {
        nodeId1: "h_main_f3_right_offices_1",
        nodeId2: "h_main_f3_right_offices_2",
    },

    // Main building, floor 3 - left
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "f3_left_stairs_down",
    },
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "U13",
    },
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "main_f3_left_men_toilet",
    },
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "main_f3_left_infrontofP3",
    },
    {
        nodeId1: "main_f3_left_infrontofP3",
        nodeId2: "P3",
    },
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "U12",
    },
    {
        nodeId1: "h_main_f3_left_main",
        nodeId2: "U14",
    },

    // Main building, floor 3 - center
    {
        nodeId1: "h_main_f3_center",
        nodeId2: "3-08",
    },
    {
        nodeId1: "h_main_f3_center",
        nodeId2: "U16",
    },
    {
        nodeId1: "h_main_f3_center",
        nodeId2: "U17",
    },

    // Main building, floor 3 - right
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "f3_right_stairs_down",
    },
    {
        nodeId1: "h_main_f3_right_pathtolab_3",
        nodeId2: "f3_right_stairs_down_to_lab",
    },
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "main_f3_right_men_toilet",
    },
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "3-28",
    },
    {
        nodeId1: "h_main_f3_right_main",
        nodeId2: "main_f3_right_infrontofP4",
    },
    {
        nodeId1: "main_f3_right_infrontofP4",
        nodeId2: "P4",
    },
    {
        nodeId1: "h_main_f3_right_offices_2",
        nodeId2: "3-34",
    },
    {
        nodeId1: "h_main_f3_right_offices_2",
        nodeId2: "3-35",
    },
    {
        nodeId1: "h_main_f3_right_offices_2",
        nodeId2: "3-36",
    },
]
