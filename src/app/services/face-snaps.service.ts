import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { map, Observable, take, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    constructor (private httpClient: HttpClient){}

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

    getFaceSnaps(): Observable<FaceSnap[]>{
        return this.httpClient.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }

    findFaceSnap(id: string): Observable<FaceSnap>{
        return this.httpClient.get<FaceSnap>('http://localhost:3000/facesnaps/' + id);
    }

    //**Updates the faceSnap in a way that immediately updates the snap count in DB. Not great as the whole component flashes,
    //**and maybe it should not try to refresh at every click on snap, but instead, just show the snap count with the user's +1
    
    SnapActionOnFaceSnap(id: string, snapType: SnapType): Observable<FaceSnap>{
        return this.findFaceSnap(id).pipe(
            map((faceSnap: FaceSnap) => {
                let createdFaceSnap = new FaceSnap(
                    faceSnap.title, faceSnap.description, faceSnap.createdAt, faceSnap.snaps, faceSnap.pictureUrl).withLocation(faceSnap.location);
                createdFaceSnap.id = faceSnap.id;
                createdFaceSnap.handleSnapUnsnapAction(snapType); 
                return createdFaceSnap;}),
            switchMap((updatedFaceSnap: FaceSnap) => 
                this.httpClient.put<FaceSnap>('http://localhost:3000/facesnaps/' + id, updatedFaceSnap))
        );
    }


    //** fetches all the faceSnaps in the db to make sure the new registered faceSnap has a unique ID (bad practice, it's for training)
    registerNewFaceSnap(newFaceSnap: FaceSnap): Observable<FaceSnap>{
        return this.httpClient.get<FaceSnap[]>("http://localhost:3000/facesnaps").pipe(
            map(faceSnapList => {
                while (!faceSnapList.every((value: FaceSnap, index: number, array: FaceSnap[]) => value.id !== newFaceSnap.id)){
                    newFaceSnap.id = crypto.randomUUID().substring(0, 8);
                }
                return newFaceSnap;
            }),
            switchMap(() => this.httpClient.post<FaceSnap>("http://localhost:3000/facesnaps", newFaceSnap))
        );

    }

    CreateNewFaceSnap(title: string, description: string, pictureUrl: string, location: string): Observable<FaceSnap>{
        const newFaceSnap = new FaceSnap(title, description, new Date(), 0, pictureUrl).withLocation(location);
        return this.registerNewFaceSnap(newFaceSnap);
    }

    /*
    AddFaceSnapFromForm(formValue: {title: string, description: string, pictureUrl: string, location?: string}){
        const newFaceSnap: FaceSnap = {
            ...formValue,
            createdAt: new Date(),
            snaps: 0,
            id: crypto.randomUUID().substring(0, 8)
        }
        this.registerNewFaceSnap(newFaceSnap);
    }*/
    
}