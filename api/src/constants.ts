import { AllMapsData, LongtermStorage } from "./data/ServerData";

export const ALL_DATA_ENTRY_ID = 1;
export const DEFAULT_PASSWORD = "";

export const EMPTY_DATA: AllMapsData = {
    nodes: [],
    edges: [],
    hallways: [],
    submaps: [],
    professors: [],
}

export const EMPTY_LONG_TERM_STORAGE_DATA: LongtermStorage = {
    mapData: EMPTY_DATA,
    password: DEFAULT_PASSWORD,
}
