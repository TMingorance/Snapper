import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    private faceSnaps: FaceSnap[] = [
        new FaceSnap("Archibald",
        "Il est archi chauve !",
        new Date (),
        0,
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'),
  
        new FaceSnap("Me",
        "C'est moi !",
        new Date (),
        100,
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg').withLocation("À la mer"),
  
        new FaceSnap("You",
        "C'est toi !",
        new Date (),
        200,
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg')
      ];

    getFaceSnaps(): FaceSnap[]{
        return [...this.faceSnaps];
    }

    findFaceSnap(id: string): FaceSnap{
        const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === id)
        if (!foundFaceSnap){
            throw new Error("FaceSnap with id: " + id + " was not found");
        }
        return foundFaceSnap;
    }

    SnapActionOnFaceSnap(id: string, snapType: SnapType){
        this.findFaceSnap(id).handleSnapUnsnapAction(snapType);
    }
    
}