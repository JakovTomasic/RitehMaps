
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
        nodeId2: "h_main_f0_middle_to_i8",
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
        nodeId2: "canteen",
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
        nodeId1: "h_main_f0_right",
        nodeId2: "0-16",
    },
    {
        nodeId1: "h_main_f0_right",
        nodeId2: "0-15",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_left_stairs_up",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_right_stairs_up",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_left_men_toilet",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_left_women_toilet",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "f0_right_men_toilet",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "h_main_f0_middle_to_student_room",
    },
    {
        nodeId1: "h_main_f0_middle_to_student_room",
        nodeId2: "student_room",
    },
    {
        nodeId1: "h_main_f0_middle_to_i8",
        nodeId2: "I8",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-72",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-71",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-70",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-68",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-66",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-64",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "left_corridor_bunch_of_rooms",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-55",
    },
    {
        nodeId1: "0-55",
        nodeId2: "0-60",
    },
    {
        nodeId1: "0-55",
        nodeId2: "0-61",
    },
    {
        nodeId1: "0-55",
        nodeId2: "0-62",
    },
    {
        nodeId1: "0-55",
        nodeId2: "0-63",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-30",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-07",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-11",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-13",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-21",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-20",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "0-14",
    },
    {
        nodeId1: "h_main_f0_main",
        nodeId2: "library_midnode_1",
    },
    {
        nodeId1: "library_midnode_1",
        nodeId2: "library_midnode_2",
    },
    {
        nodeId1: "library_midnode_2",
        nodeId2: "library_midnode_3",
    },
    {
        nodeId1: "library_midnode_3",
        nodeId2: "0-27",
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
        nodeId2: "h_main_f1_left_offices",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "h_main_f1_left_edulab_1",
    },
    {
        nodeId1: "h_main_f1_left_edulab_1",
        nodeId2: "h_main_f1_left_edulab_2",
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
    {
        nodeId1: "h_main_f1_left_offices",
        nodeId2: "1-48",
    },
    {
        nodeId1: "h_main_f1_left_offices",
        nodeId2: "1-48b",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-48a",
    },
    {
        nodeId1: "h_main_f1_left_edulab_2",
        nodeId2: "1-40",
    },
    {
        nodeId1: "h_main_f1_left_edulab_2",
        nodeId2: "edulab_helpnode_for_1-41",
    },
    {
        nodeId1: "edulab_helpnode_for_1-41",
        nodeId2: "1-41",
    },
    {
        nodeId1: "h_main_f1_left_edulab_1",
        nodeId2: "i5",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-51",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-53",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-55",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-57",
    },
    {
        nodeId1: "h_main_f1_left_main",
        nodeId2: "1-58",
    },
    {
        nodeId1: "h_main_f1_left_other",
        nodeId2: "1-65",
    },
    {
        nodeId1: "h_main_f1_left_other",
        nodeId2: "I3",
    },
    {
        nodeId1: "h_main_f1_left_other",
        nodeId2: "i1_i2_nav_node",
    },
    {
        nodeId1: "i1_i2_nav_node",
        nodeId2: "I1",
    },
    {
        nodeId1: "i1_i2_nav_node",
        nodeId2: "I2",
    },
    {
        nodeId1: "h_main_f1_left_other",
        nodeId2: "1-64a",
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
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "f1_right_men_toilet",
    },
    {
        nodeId1: "h_main_f1_right_other",
        nodeId2: "f1_right_women_toilet",
    },
    {
        nodeId1: "h_main_f1_right_other",
        nodeId2: "U3",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "1-18",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "1-19",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "1-25",
    },
    {
        nodeId1: "1-25",
        nodeId2: "1-26",
    },
    {
        nodeId1: "1-25",
        nodeId2: "1-27",
    },
    {
        nodeId1: "1-25",
        nodeId2: "1-28",
    },
    {
        nodeId1: "1-25",
        nodeId2: "1-29",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "1-32",
    },
    {
        nodeId1: "h_main_f1_right_main",
        nodeId2: "f1_right_labos_midnode",
    },
    {
        nodeId1: "f1_right_labos_midnode",
        nodeId2: "L3",
    },
    {
        nodeId1: "f1_right_labos_midnode",
        nodeId2: "L4",
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
        nodeId2: "2-31",
    },
    {
        nodeId1: "2-31",
        nodeId2: "2-32",
    },
    {
        nodeId1: "2-31",
        nodeId2: "2-33",
    },
    {
        nodeId1: "2-31",
        nodeId2: "2-34",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "2-35",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "2-36",
    },
    {
        nodeId1: "h_main_f2_left_main",
        nodeId2: "2-37",
    },
    {
        nodeId1: "2-37",
        nodeId2: "2-38",
    },
    {
        nodeId1: "2-37",
        nodeId2: "2-39",
    },
    {
        nodeId1: "2-37",
        nodeId2: "2-40",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "2-46",
    },
    {
        nodeId1: "h_main_f2_left_pathtolab",
        nodeId2: "U8",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "U9",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "U10",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "U11",
    },
    {
        nodeId1: "h_main_f2_left_other",
        nodeId2: "I7",
    },
    {
        nodeId1: "h_main_f2_left_pathtolab",
        nodeId2: "L10",
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
    {
        nodeId1: "h_main_f2_right_main",
        nodeId2: "f2_right_men_toilet",
    },
    {
        nodeId1: "h_main_f2_right_pathtolab_1",
        nodeId2: "f2_right_women_toilet",
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









    // Lab building floor 0 - floor 1
    {
        nodeId1: "lab_f0_down_stairs_up",
        nodeId2: "lab_f1_right_middle_stairs_down",
    },


    // Lab building floor 0
    {
        nodeId1: "h_lab_f0_down_main",
        nodeId2: "lab_f0_down_stairs_up",
    },
    {
        nodeId1: "h_lab_f0_down_main",
        nodeId2: "1-117a",
    },
    {
        nodeId1: "h_lab_f0_down_main",
        nodeId2: "1-102",
    },
    {
        nodeId1: "h_lab_f0_down_main",
        nodeId2: "1-104",
    },



    // Main building floor 2 - lab building floor 1
    {
        nodeId1: "lab_f1_left_pathtomainbuilding",
        nodeId2: "main_f2_left_lab_passage",
    },
    {
        nodeId1: "lab_f1_right_passage_to_main_building",
        nodeId2: "main_f2_right_lab_passage",
    },
    {
        nodeId1: "f3_right_stairs_down_to_lab",
        nodeId2: "lab_f1_right_stairs_up",
    },



    // Lab building, floor 1
    {
        nodeId1: "lab_f1_left_pathtomainbuilding",
        nodeId2: "h_lab_f1_left_next_to_mainpath",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "h_lab_f1_left_next_to_mainpath",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "lab_f1_right_navnode_1",
    },
    {
        nodeId1: "lab_f1_right_navnode_1",
        nodeId2: "lab_f1_right_navnode_2",
    },
    {
        nodeId1: "lab_f1_right_navnode_2",
        nodeId2: "h_lab_f1_right_passage_1",
    },
    {
        nodeId1: "h_lab_f1_right_passage_1",
        nodeId2: "h_lab_f1_right_passage_2",
    },
    {
        nodeId1: "h_lab_f1_right_passage_2",
        nodeId2: "lab_f1_right_passage_to_main_building",
    },
    {
        nodeId1: "h_lab_f1_right_passage_2",
        nodeId2: "lab_f1_right_stairs_up",
    },
    {
        nodeId1: "lab_f1_right_stairs_up",
        nodeId2: "lab_f1_right_navnode_2",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "lab_f1_right_middle_stairs_down",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "2-102",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "2-104",
    },
    {
        nodeId1: "h_lab_f1_right_main",
        nodeId2: "2-119",
    },
]
