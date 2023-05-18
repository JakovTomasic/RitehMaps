
export type Edge = {
    nodeId1: string;
    nodeId2: string;
}

export const edges: Edge[] = [
    {
        nodeId1: "aaa",
        nodeId2: "bbb",
    },
    {
        nodeId1: "bbb",
        nodeId2: "ccc",
    },
    {
        nodeId1: "h1",
        nodeId2: "aaa",
    },
    {
        nodeId1: "bbb",
        nodeId2: "h1",
    },
]
