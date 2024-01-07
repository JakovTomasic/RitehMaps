import { Submap } from "../../types/Submap";

export interface SubmapProvider {
    getSubmap(submapId: number): Submap
}
