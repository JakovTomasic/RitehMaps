
export enum NodeType {
    CLASSROOM, STUDENT_ROOM, OFFICE,
    DOOR, STAIRS_UP, STAIRS_DOWN, PASSAGE,
    MEN_TOILET, WOMEN_TOILET,
    NAVIGATION_MIDNODE,
}

export type Node = {
    nodeId: string;
    names: string[];
    submapId: number;
    x: number;
    y: number;
    type: NodeType;
}

export type Edge = {
    nodeId1: string;
    nodeId2: string;
}

export type Hallway = {
    id: string;
    submapId: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export type SubMap = {
    id: number;
    caption: string;
    // content: string;
    // width: number;
    // height: number;
    // north_angle: number;
}

export type ProfessorData = {
  name: string;
  phoneNumber: string;
  internalPhoneNumber: string;
  email: string;
  room: string;
  entity: string;
};

export type AllMapsData = {
    nodes: Node[],
    edges: Edge[],
    hallways: Hallway[],
    professors: ProfessorData[],
    submaps: SubMap[],
}


export type ChangeDataRequest = {
    password: string,
    data: AllMapsData,
};




