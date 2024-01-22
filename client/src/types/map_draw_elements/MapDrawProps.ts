import { Submap } from "../Submap";
import { CentroidScale } from "../navigation/CentroidScale";
import { MapDrawElement } from "./MapDrawElement";

export type MapDrawProps = {
    mapElements: MapDrawElement[];
    submap: Submap;
    centroidCrop: CentroidScale;
}