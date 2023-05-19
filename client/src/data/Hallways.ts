
export type Hallway = {
    id: string;
    submapId: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const hallways: Hallway[] = [
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
]
