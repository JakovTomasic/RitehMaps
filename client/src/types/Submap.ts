
export class Submap{
    id: number;
    caption: string;
    path: string;
    width: number;
    height: number;

    constructor(id: number, caption: string, path: string, width: number, height: number){
        this.id = id;
        this.caption = caption;
        this.path = path;
        this.width = width;
        this.height = height;
    }
}