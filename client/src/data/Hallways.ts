
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
        y2: 17.04,
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
        y1: 35.97,
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
]
