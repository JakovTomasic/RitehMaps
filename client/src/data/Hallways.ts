
export type Hallway = {
    id: string;
    submapId: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const hallways: Hallway[] = [
    // Main building, floor 0
    {
        id: "h_main_f0_main",
        submapId: 1,
        x1: 9.64,
        y1: 61.6,
        x2: 98.76,
        y2: 61.6,
    },
    {
        id: "h_main_f0_left",
        submapId: 1,
        x1: 9.62,
        y1: 17.95,
        x2: 9.62,
        y2: 65.1,
    },
    {
        id: "h_main_f0_right",
        submapId: 1,
        x1: 94.12,
        y1: 24,
        x2: 94.12,
        y2: 65.47,
    },
    {
        id: "h_main_f0_middle_to_student_room",
        submapId: 1,
        x1: 39,
        y1: 71.43,
        x2: 39,
        y2: 23.99,
    },
    {
        id: "h_main_f0_middle_to_i8",
        submapId: 1,
        x1: 61.78,
        y1: 67.14,
        x2: 61.78,
        y2: 23.25,
    },

    // Main building, floor 1
    {
        id: "h_main_f1_left_main",
        submapId: 2,
        x1: 7.75,
        y1: 65.62,
        x2: 35.98,
        y2: 65.62,
    },
    {
        id: "h_main_f1_left_other",
        submapId: 2,
        x1: 34.61,
        y1: 69.08,
        x2: 34.61,
        y2: 18,
    },
    {
        id: "h_main_f1_left_offices",
        submapId: 2,
        x1: 8.9,
        y1: 29.68,
        x2: 8.9,
        y2: 67.77,
    },
    {
        id: "h_main_f1_left_edulab_1",
        submapId: 2,
        x1: 17.53,
        y1: 34.84,
        x2: 17.53,
        y2: 68.75,
    },
    {
        id: "h_main_f1_left_edulab_2",
        submapId: 2,
        x1: 16.4,
        y1: 36.46,
        x2: 23.54,
        y2: 36.46,
    },
    {
        id: "h_main_f1_right_main",
        submapId: 2,
        x1: 64.24,
        y1: 65.62,
        x2: 92.49,
        y2: 65.62,
    },
    {
        id: "h_main_f1_right_other",
        submapId: 2,
        x1: 65.16,
        y1: 91.4,
        x2: 65.16,
        y2: 16.62,
    },

    // Main building, floor 2
    {
        id: "h_main_f2_left_main",
        submapId: 3,
        x1: 7.66,
        y1: 73.64,
        x2: 35.36,
        y2: 73.64,
    },
    {
        id: "h_main_f2_left_pathtolab",
        submapId: 3,
        x1: 8.87,
        y1: 4.1,
        x2: 8.87,
        y2: 75.83,
    },
    {
        id: "h_main_f2_left_other",
        submapId: 3,
        x1: 34.03,
        y1: 46.71,
        x2: 34.03,
        y2: 93.33,
    },
    {
        id: "h_main_f2_right_main",
        submapId: 3,
        x1: 63.19,
        y1: 73.64,
        x2: 91.54,
        y2: 73.64,
    },
    {
        id: "h_main_f2_right_pathtolab_1",
        submapId: 3,
        x1: 64.46,
        y1: 76.53,
        x2: 64.46,
        y2: 40.85,
    },
    {
        id: "h_main_f2_right_pathtolab_2",
        submapId: 3,
        x1: 62.69,
        y1: 44.1,
        x2: 69.21,
        y2: 44.1,
    },
    {
        id: "h_main_f2_right_pathtolab_3",
        submapId: 3,
        x1: 68.14,
        y1: 2.08,
        x2: 68.14,
        y2: 48.58,
    },

    // Main building, floor 3
    {
        id: "h_main_f3_left_main",
        submapId: 4,
        x1: 10.99,
        y1: 76.2,
        x2: 39.41,
        y2: 76.2,
    },
    {
        id: "h_main_f3_left_main_to_center",
        submapId: 4,
        x1: 38.12,
        y1: 70.32,
        x2: 38.12,
        y2: 83.25,
    },
    {
        id: "h_main_f3_center",
        submapId: 4,
        x1: 36.33,
        y1: 81.78,
        x2: 62.39,
        y2: 81.78,
    },
    {
        id: "h_main_f3_right_main_to_center",
        submapId: 4,
        x1: 60.94,
        y1: 70.32,
        x2: 60.94,
        y2: 83.17,
    },
    {
        id: "h_main_f3_right_main",
        submapId: 4,
        x1: 59.4,
        y1: 76.75,
        x2: 88.05,
        y2: 76.75,
    },
    {
        id: "h_main_f3_right_offices_1",
        submapId: 4,
        x1: 86.94,
        y1: 74.2,
        x2: 86.94,
        y2: 83.88,
    },
    {
        id: "h_main_f3_right_offices_2",
        submapId: 4,
        x1: 86.08,
        y1: 82.96,
        x2: 98.38,
        y2: 82.96,
    },
    {
        id: "h_main_f3_right_pathtolab_1",
        submapId: 4,
        x1: 64.69,
        y1: 50.25,
        x2: 64.69,
        y2: 79.04,
    },
    {
        id: "h_main_f3_right_pathtolab_2",
        submapId: 4,
        x1: 62.86,
        y1: 52.49,
        x2: 69.48,
        y2: 52.49,
    },
    {
        id: "h_main_f3_right_pathtolab_3",
        submapId: 4,
        x1: 68.18,
        y1: 0.92,
        x2: 68.18,
        y2: 55.01,
    },




    // Lab building, floor 0
    {
        id: "h_lab_f0_down_main",
        submapId: 101,
        x1: 16.4,
        y1: 74.91,
        x2: 81.51,
        y2: 74.91,
    },
    {
        id: "h_lab_f0_left_horizontal",
        submapId: 101,
        x1: 5.66,
        y1: 69.29,
        x2: 21.92,
        y2: 69.29,
    },
    {
        id: "h_lab_f0_left_vertical",
        submapId: 101,
        x1: 17.75,
        y1: 45.26,
        x2: 17.75,
        y2: 77.79,
    },
    {
        id: "h_lab_f0_under_stairs",
        submapId: 101,
        x1: 16.77,
        y1: 48.56,
        x2: 27.3,
        y2: 48.56,
    },





    // Lab building, floor 1
    {
        id: "h_lab_f1_left_next_to_mainpath",
        submapId: 102,
        x1: 37.53,
        y1: 93.48,
        x2: 37.53,
        y2: 46.2,
    },
    {
        id: "h_lab_f1_right_main",
        submapId: 102,
        x1: 36.67,
        y1: 78.73,
        x2: 85.02,
        y2: 78.73,
    },
    {
        id: "h_lab_f1_right_passage_1",
        submapId: 102,
        x1: 85.95,
        y1: 77.93,
        x2: 90.12,
        y2: 77.93,
    },
    {
        id: "h_lab_f1_right_passage_2",
        submapId: 102,
        x1: 88.82,
        y1: 76.05,
        x2: 88.82,
        y2: 94.06,
    },
]
