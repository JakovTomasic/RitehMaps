import { AllMapsData, Edge, Hallway, Node, ProfessorData, SubMap } from './ServerData';
import { v4 as uuidv4 } from "uuid";

export type AllMapsDataWithUuids = {
    nodes: { uuid: string, v: Node }[],
    edges: { uuid: string, v: Edge }[],
    hallways: { uuid: string, v: Hallway }[],
    professors: { uuid: string, v: ProfessorData }[],
    submaps: SubMap[],
}

export function addUuids(data: AllMapsData): AllMapsDataWithUuids {
    return {
        nodes: data.nodes.map(v => ({ uuid: uuidv4(), v: v })),
        edges: data.edges.map(v => ({ uuid: uuidv4(), v: v })),
        hallways: data.hallways.map(v => ({ uuid: uuidv4(), v: v })),
        professors: data.professors.map(v => ({ uuid: uuidv4(), v: v })),
        submaps: data.submaps,
    };
}

export function removeUuids(data: AllMapsDataWithUuids): AllMapsData {
    return {
        nodes: data.nodes.map(v => v.v),
        edges: data.edges.map(v => v.v),
        hallways: data.hallways.map(v => v.v),
        professors: data.professors.map(v => v.v),
        submaps: data.submaps,
    };
}
