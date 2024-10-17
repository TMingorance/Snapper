import { FaceSnapComponent } from "../face-snap/face-snap.component";
import { SnapType } from "./snap-type.type";

export class FaceSnap{

    id: string;
    location?: string;

    constructor (public title: string, 
                public description: string, 
                public createdAt: Date, 
                public snaps: number, 
                public pictureUrl: string){
        this.id = crypto.randomUUID().substring(0, 8);
    }

    withLocation(location: string): FaceSnap {
        this.location = location;
        return this;
    }

    incrementSnaps():void{
        this.snaps ++;
        //possibly some other action
    }

    decrementSnaps():void{
        this.snaps --;
        //possibly some other action
    }

    handleSnapUnsnapAction(snapType: SnapType): void{
        if (snapType === 'snap'){
            this.incrementSnaps();
        }
        else if (snapType === 'unsnap'){
            this.decrementSnaps();
        }
    }
    
}