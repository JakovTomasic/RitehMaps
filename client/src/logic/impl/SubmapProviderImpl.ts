import { SubmapProvider } from "../interfaces/SubmapProvider";
import { Submap } from "../../types/Submap";
import { submaps } from "../../json_data/submaps";

export class SubmapProviderImpl implements SubmapProvider{

    getSubmapImage(submapId: number): Submap {
        return submaps[submapId]
    }

}