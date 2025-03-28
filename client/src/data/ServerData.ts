import { z } from "zod";

export enum NodeType {
    CLASSROOM,
    STUDENT_ROOM,
    OFFICE,
    DOOR,
    STAIRS_UP,
    STAIRS_DOWN,
    PASSAGE,
    MEN_TOILET,
    WOMEN_TOILET,
    NAVIGATION_MIDNODE,
};


export const NodeSchema = z.object({
    nodeId: z.string(),
    names: z.array(z.string()),
    submapId: z.number(),
    x: z.number(),
    y: z.number(),
    type: z.nativeEnum(NodeType)
});
export type Node = z.infer<typeof NodeSchema>;


export const EdgeSchema = z.object({
    nodeId1: z.string(),
    nodeId2: z.string(),
});
export type Edge = z.infer<typeof EdgeSchema>;


export const HallwaySchema = z.object({
    id: z.string(),
    submapId: z.number(),
    x1: z.number(),
    y1: z.number(),
    x2: z.number(),
    y2: z.number(),
});
export type Hallway = z.infer<typeof HallwaySchema>;


export const SubMapSchema = z.object({
    id: z.number(),
    caption: z.string(),
    // content: z.string(),
    // width: z.number(),
    // height: z.number(),
    // north_angle: z.number(),
});
export type SubMap = z.infer<typeof SubMapSchema>;


export const ProfessorDataSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    internalPhoneNumber: z.string(),
    email: z.string(),
    room: z.string(),
    entity: z.string(),
});
export type ProfessorData = z.infer<typeof ProfessorDataSchema>;


export const AllMapsDataSchema = z.object({
    nodes: z.array(NodeSchema),
    edges: z.array(EdgeSchema),
    hallways: z.array(HallwaySchema),
    professors: z.array(ProfessorDataSchema),
    submaps: z.array(SubMapSchema),
});
export type AllMapsData = z.infer<typeof AllMapsDataSchema>;


export const ServerChangeDataRequestSchema = z.object({
    password: z.string(),
    data: AllMapsDataSchema,
});
export type ServerChangeDataRequest = z.infer<typeof ServerChangeDataRequestSchema>;

export const ServerChangePasswordRequestSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
});
export type ServerChangePasswordRequest = z.infer<typeof ServerChangePasswordRequestSchema>;
