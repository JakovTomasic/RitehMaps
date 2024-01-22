import { SubmapProvider } from "../interfaces/SubmapProvider";
import { Submap } from "../../types/Submap";
import { submaps } from "../../data/submaps";

export class SubmapProviderImpl implements SubmapProvider{

    getSubmap(submapId: number): Submap {

        var retSubmap: Submap
        submaps.forEach((submap) => {
            if(submap.id == submapId)
                retSubmap = submap
        })
        
        return retSubmap
    }

}