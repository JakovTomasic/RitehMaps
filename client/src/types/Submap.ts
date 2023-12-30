
export class Submap{
    id: number;
    caption: string;
    path: string;
    width: number;
    height: number;
    north_angle: number;

    constructor(id: number, caption: string, path: string, width: number, height: number, north_angle: number){
        this.id = id;
        this.caption = caption;
        this.path = path;
        this.width = width;
        this.height = height;
        this.north_angle = north_angle;
    }
}