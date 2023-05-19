
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
]
