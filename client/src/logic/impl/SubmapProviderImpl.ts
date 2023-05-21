import { SubmapProvider } from "../interfaces/SubmapProvider";
import { Submap } from "../../types/Submap";
import { submaps } from "../../data/submaps";

export class SubmapProviderImpl implements SubmapProvider{

    getSubmapImage(submapId: number): Submap {

        var retSubmap: Submap
        submaps.map((submap) => {
            if(submap.id == submapId)
                retSubmap = submap
        })
        
        return retSubmap
    }

}