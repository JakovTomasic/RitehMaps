
export type Room = {
    nodeId: string;
    names: string[];
    submapId: number;
    x: number;
    y: number;
    type?: string;
}

export const rooms: Room[] = [
    {
        nodeId: "aaa",
        names: ["aa", "bb"],
        submapId: 1,
        x: 25,
        y: 25,
    },
    {
        nodeId: "bbb",
        names: ["AA", "BB"],
        submapId: 1,
        x: 50,
        y: 25,
    },
    {
        nodeId: "ccc",
        names: ["cc"],
        submapId: 1,
        x: 50,
        y: 50,
    }
]
