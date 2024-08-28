import { FaceSnapComponent } from "../face-snap/face-snap.component";

export class FaceSnap{

    location?: string;

    constructor (public title: string, 
                public description: string, 
                public createdAt: Date, 
                public snaps: number, 
                public pictureUrl: string){}
    
}