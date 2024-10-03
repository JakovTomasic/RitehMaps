const NORTH_ANGLE = 40;

export type HardcodedSubMap = {
    id: number;
    path: string;
    width: number;
    height: number;
    north_angle: number;
}

// TODO: somehow get this from the server...?
export const submaps: HardcodedSubMap[] = [
    {
        "id": 1,
        "path": "/submaps/main_floor_0.svg",
        "width": 2809.2,
        "height": 847.27997,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 2,
        "path": "/submaps/main_floor_1.svg",
        "width": 2851.4399,
        "height": 875.59998,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 3,
        "path": "/submaps/main_floor_2.svg",
        "width": 2742.04,
        "height": 1092.48,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 4,
        "path": "/submaps/main_floor_3.svg",
        "width": 2952.5999,
        "height": 1335.9199,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 101,
        "path": "/submaps/lab_floor_0.svg",
        "width": 2760.1599,
        "height": 1083.36,
        "north_angle": NORTH_ANGLE
    },
    {
        "id": 102,
        "path": "/submaps/lab_floor_1.svg",
        "width": 2721.6802,
        "height": 800.23999,
        "north_angle": NORTH_ANGLE
    }
];