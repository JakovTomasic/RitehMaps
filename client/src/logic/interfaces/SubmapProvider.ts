import { Submap } from "../../types/Submap";

export interface SubmapProvider {
    getSubmapImage(submapId: number): Submap
}
