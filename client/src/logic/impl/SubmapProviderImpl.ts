import { SubmapProvider } from "../interfaces/SubmapProvider";
import { Submap } from "../../types/Submap";
import { submaps } from "../../data/submaps";
import { SubMap } from "../../data/ServerData";

export class SubmapProviderImpl implements SubmapProvider{

    private submapServerData: SubMap[]

    constructor(submapServerData: SubMap[]) {
        this.submapServerData = submapServerData;
    }

    getSubmap(submapId: number): Submap {

        let serverData = this.submapServerData.find(s => s.id === submapId)!;

        let retSubmap: Submap;
        submaps.forEach((submap) => {
            if(submap.id == submapId) {
                retSubmap = {
                    ...submap,
                    caption: serverData.caption
                }
            }
        })
        
        return retSubmap!
    }

}