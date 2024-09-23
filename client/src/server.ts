import { z } from "zod";

// TODO: change
export const API_URL = "http://localhost:3000/api";

export const ProfessorDataSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    internalPhoneNumber: z.string(),
    email: z.string(),
    room: z.string(),
    entity: z.string(),
});

export const ProfessorDataArraySchema = z.array(ProfessorDataSchema);



export const SaveAllDataSchema = z.object({
    arr: z.array(ProfessorDataSchema),
});

export type SaveAllData = z.infer<typeof SaveAllDataSchema>;

